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

export async function markOrderAsPaid(order: Order, user: User) {
  order.state = "PAID";
  order.cashier = user;

  const pendingOrderRef = doc(db, "all_tables", order.table.id);

  return setDoc(pendingOrderRef, { id: order.table.id, order });
}
