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
import * as  uuid from "uuid";



export async function markOrderAsPaid(order: Order, user: User) {

    if (!order.id) {
        const error = new Error();
        error.message = " You need to provide an order with an id"
        throw error;
    }

    order.state = "PAID";
    order.cashier = user;

    const pendingOrderRef = doc(db, "all_tables", order.table.id);
    const orderRef = doc(db, "all_orders", order.id);
    await setDoc(pendingOrderRef, { id: order.table.id, order });
    await setDoc(orderRef, { id: order.id, order });

    return { message: "successfully paid for order" };
}

