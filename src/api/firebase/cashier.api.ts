import {
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
import { User } from "../../interfaces/auth.interface";
import * as uuid from "uuid";
import { sendNotification } from "../oneSignal/notifications.api.ts";
import { isTableOccupied } from "./admin.api.ts";

export async function markOrderAsPaid(order: Order, user: User) {
  order.state = "PAID";
  order.cashier = user;
  const tableOrders = await isTableOccupied(order.table.id);

  if (!order.id) {
    const error = new Error();
    error.message = " You need to provide an order with an id";
    throw error;
  }

  order.state = "PAID";
  order.cashier = user;

  const orders = tableOrders.filter((o: Order) => o.id != order.id)
  const table: Table = {
    id: order.table.id,
    number: order.table.number,
    floor: order.table.floor || "",
    state: order.state,
    orders: tableOrders,
  }
  const pendingOrderRef = doc(db, "all_tables", order.table.id);
  const orderRef = doc(db, "all_orders", order.id);
  await setDoc(pendingOrderRef, { ...table, orders } as Table);
  await setDoc(orderRef, { id: order.id, ...order });

  await sendNotification({
    title: "order paid",
    description: `Table ${order.table.id}'s order has been paid`,
  });

  return { message: "successfully paid for order" };
}


export async function getPaidOrders(onSuccess: (orders: Order[]) => void) {

  const orderRef = collection(db, "all_orders");
  onSnapshot(orderRef, (res) => {
    onSuccess(res.docs.map((doc) => doc.data() as Order));
  });
}
