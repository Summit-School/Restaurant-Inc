import {
  InventoryItem,
  MenuItem,
  Order,
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
  const adminRef = collection(db, "pending_orders");
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
  const adminRef = collection(db, "all_orders");
  onSnapshot(adminRef, (res) => {
    const orders = res.docs.map((doc) => doc.data() as Order);
    callBack(orders);
  });
}

/**
 * Get adds an order for a table
 *
 * @param order - an order that is to be added
 */

export async function AddOrderToPending(order: Order) {
  const tableOrder = await isTableOccupied(order.table.id);
  if (tableOrder) {
    throwError({
      message:
        "Table is already occupied please free table before placing order",
    });
  }
  const pendingOrderRef = doc(db, "pending_orders", order.table.id);

  return setDoc(pendingOrderRef, order);
}

/**
 * verifies if a particular table is occupied
 *
 * @param tableId -  the id of the table in the restautant
 * @returns the order if the table is occupied or null otherwise
 */

export async function isTableOccupied(tableId: string): Promise<Order | null> {
  const tableRef = doc(db, "pending_orders", tableId);
  return getDoc(tableRef).then((res) => {
    return res.data() as Order | null;
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
    throwError({ message: "Table is not occupied" });
  }
  const ordersRef = doc(db, "all_orders", order.table.id);
  const pendingOrderRef = doc(db, "pending_orders", order.table.id);
  await setDoc(ordersRef, order);
  return deleteDoc(pendingOrderRef);
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
