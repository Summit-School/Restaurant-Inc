import { collection, getFirestore, onSnapshot } from "firebase/firestore"
import { User } from "../../interfaces/auth.interface"


/**
 * gets all staff depending on the type of service they provide
 * 
 * @param type the type of staff to get from the database could be either "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER
 * @param callBack  the callback function called when the staff data is retrieved successfully.
 * 
 */
export const getStaffByType = (type: string, callBack: Function) => {

    switch (type) {
        case "SERVICE":
            onSnapshot(collection(getFirestore(), "service"), (res) => {
                callBack(res.docs.map(doc => doc.data() as User))
            }); return;
        case "CASHIER":
            onSnapshot(collection(getFirestore(), "cashier"), (res) => {
                callBack(res.docs.map(doc => doc.data() as User))
            });
            return;
        case "KITCHEN":
            onSnapshot(collection(getFirestore(), "kitchen"), (res) => {
                callBack(res.docs.map(doc => doc.data() as User))
            });
            return;
        case "COUNTER":
            onSnapshot(collection(getFirestore(), "counter"), (res) => {
                callBack(res.docs.map(doc => doc.data() as User))
            });
            return;

        default:
            const error = new Error();
            error.message = "Unknown type: " + type;
            return;
    }
}








