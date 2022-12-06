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

export async function markOrderAsPaid(order: Order, user: User) {
  order.state = "PAID";
  order.cashier = user;

  if (!order.id) {
    const error = new Error();
    error.message = " You need to provide an order with an id";
    throw error;
  }

  order.state = "PAID";
  order.cashier = user;

  const pendingOrderRef = doc(db, "all_tables", order.table.id);
  const orderRef = doc(db, "all_orders", order.id);
  await setDoc(pendingOrderRef, { ...order.table, order });
  await setDoc(orderRef, { id: order.id, order });

  await sendNotification({
    title: "order paid",
    description: `Table ${order.table.id}'s order has been paid`,
  });

  return { message: "successfully paid for order" };
}
