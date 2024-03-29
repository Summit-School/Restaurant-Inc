import {
  Attendance,
  InventoryItem,
  MenuItem,
  Order,
  Table,
} from "../../interfaces/operations.interface";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./index.ts";
import { throwError } from "../index.ts";
import { Admin, User } from "../../interfaces/auth.interface";
import * as uuid from "uuid";
import { sendNotification } from "../oneSignal/notifications.api.ts";
import { loginAdmin } from "./auth.api.ts";
import { updateInventory } from "./menu.api.ts";

export function addToInventory(inventory: InventoryItem) {}

/**
 * Gets all orders that are currently pending
 *
 * NOTE: this function is real time and will be called everytime a new order
 *  is added to pending orders
 *
 * @param callBack - called everytime a new order is added to pending orders
 */
export function fetchPendingOrders(callBack: (orders: Order[]) => void) {
  const adminRef = collection(db, "all_tables");
  onSnapshot(adminRef, (res) => {
    const orders = res.docs.map((doc) => doc.data() as Order);
    callBack(orders);
  });
}

/**
 * Get all orders made on the application
 *
 * @param callBack - called everytime a new order is moved from pending to
 */

export function fetchAllOrders(callBack: (orders: Order[]) => void) {
  const adminRef = collection(db, "all_tables");
  onSnapshot(adminRef, (res) => {
    const orders = res.docs.map((doc) => doc.data() as Order);
    callBack(orders);
  });
}

/**
 * Get adds an order for a table
 *
 * @param order - an order that is to be added
 * @param user - the staff to add the order
 */

export async function AddOrderToPending(order: Order, user: User) {
  const tableOrders = await isTableOccupied(order.table.id);

  order = {
    id: uuid.v4(),
    state: "ORDERED",
    service: user,
    timestamp: Date.now(),
    drinks: order.drinks,
    food: order.food,
    table: {
      id: order.table.id,
      number: order.table.number,
      floor: order.table.floor || "",
    },
  };

  const tableOrderRef = doc(db, "all_tables", order.table.id);

  const table: Table = {
    id: order.table.id,
    number: order.table.number,
    floor: order.table.floor || "",
    state: order.state,
    orders: tableOrders,
  };
  table.orders?.push(order);

  console.log(table, "TABLE");
  console.log(order, "ORDERS");

  await setDoc(tableOrderRef, table as Table);
  await sendNotification({
    title: "placed order",
    description: `An order has just been added to table ${order.table.id}`,
  });

  return { message: "successfully placed order" };
}

// export async function AddOrderToTable(order: Order, user: User) {
//   const tableOrders = await isTableOccupied(order.table.id);

//   order.id = uuid.v4();
//   order.state = "ORDERED";
//   order.service = user;
//   order.timestamp = Date.now();

//   const tableOrderRef = doc(db, "all_tables", order.table.id);

//   const table: Table = {
//     id: order.table.id,
//     number: order.table.number,
//     floor: order.table.floor || "",
//     state: order.state,
//     orders: [...tableOrders, order]
//   }

//   console.log(table)

//   await setDoc(tableOrderRef, table as Table);
//   await sendNotification({
//     title: "placed order",
//     description: `An order has just been added to table ${order.table.id}`,
//   });

//   return { message: "successfully placed order" };
// }

/**
 * Get adds an order for a table
 *
 * @param order - an order that is to be added
 * @param user - the staff to add the order
 */

export async function serveOrder(order: Order, user: User) {
  order.state = "SERVED";
  order.kitchen = user;
  let tableOrders = await isTableOccupied(order.table.id);

  if (!tableOrders) {
    const error = new Error();
    error.message = "there are no orders on this table";
    throw error;
  }

  const matchedIndex = tableOrders.findIndex((thisOrder) => {
    return thisOrder.id === order.id;
  });

  if (matchedIndex >= 0) {
    tableOrders[matchedIndex] = order;

    const pendingOrderRef = doc(db, "all_tables", order.table.id);

    await setDoc(pendingOrderRef, {
      ...order.table,
      orders: tableOrders,
    } as Table);
    await updateInventory(order.drinks);
    await sendNotification({
      title: "served order",
      description: `Table ${order.table.id} has just been served`,
    });
  }

  return { message: "successfully served order" };
}

/**
 * verifies if a particular table is occupied
 *
 * @param tableId -  the id of the table in the restautant
 * @returns the order if the table is occupied or null otherwise
 */

export async function isTableOccupied(tableId: string): Promise<Order[]> {
  const tableRef = doc(db, "all_tables", tableId);
  return getDoc(tableRef).then((res) => {
    const data = res.data() as Table;
    return data.orders || [];
  });
}

/**
 * Removes an order from the pending orders and frees the table
 *
 * @param order - the order to be removed from the pending orders
 *
 * @returns - A Promise resolved once the document has been successfully deleted from the backend (note that it won't resolve while you're offline).
 */

export async function freeTable(order: Order) {
  const tableOrder = await isTableOccupied(order.table.id);
  if (!tableOrder) {
    return throwError({ message: "Table is not occupied" });
  }
  // const ordersRef = doc(db, "all_orders", order.id);
  const alltablesRef = doc(db, "all_tables", order.table.id);
  // await setDoc(ordersRef, order);
  await setDoc(alltablesRef, { ...order.table });
  await sendNotification({
    title: "Table Freed",
    description: `Table ${order.table.id} has just been freed`,
  });

  return { message: "table freed" };
}

/**
 * changes the state of a pending order
 *
 * @param order - order whose state is to be changed
 * @param newState - the new state of the pending order could be either "ORDERED" | "AVAILABLE" | "SERVED" | "DELIVERED"
 *
 * @returns - A Promise resolved once the pending order has been successfully changed
 */

export async function changeOrderState(order: Order, newState: string) {
  const pendingOrderRef = doc(db, "pending_orders", order.table.id);
  await updateDoc(pendingOrderRef, { state: newState });
  return pendingOrderRef;
}

/**
 * Creates a table to be added to the list of tables in the restaurant
 *
 * @param tableNumber The number of the table to be added
 *
 * @returns {Promise<Table>} - A Promise resolved once the table is added
 */

export async function createTable(
  tableNumber: string,
  floor: string
): Promise<Table> {
  const table: Table = {
    number: tableNumber,
    floor: floor || "",
    id: (floor || "") + tableNumber,
  };
  const tableRef = doc(db, "all_tables", table.id);
  await setDoc(tableRef, table);
  return table;
}

/**
 * Delete a table from the list of tables in the restaurant
 *
 * @param table The table to be deleted
 *
 * @return Returns a Promise resolved once the table has been deleted
 *
 */

export async function deleteTable(table: Table): Promise<void> {
  const tableRef = doc(db, "all_tables", table.id + "");
  await deleteDoc(tableRef);
}

export async function onSnapshotGetAllTables(
  onSuccess: (tables: Table[]) => void
) {
  const tablesRef = collection(db, "all_tables");
  onSnapshot(tablesRef, (res) => {
    onSuccess(res.docs.map((doc) => doc.data() as Table));
  });
}

export async function onSnapshotGetAttendance(
  onSuccess: (attendance: Attendance[]) => void
) {
  const attendanceRef = collection(db, "attendance");
  onSnapshot(attendanceRef, (res) => {
    onSuccess([...res.docs.map((doc) => doc.data() as Attendance)]);
  });
}

export async function changeAdminPassword(
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<Admin> {
  const admin = await loginAdmin(email, oldPassword);

  if (admin) {
    const adminRef = doc(db, "admin", admin.email);
    await setDoc(adminRef, { email: admin.email, password: newPassword });
    return admin;
  }

  const error = new Error();
  error.message = "Can't change admin password ";
  throw error;
}
