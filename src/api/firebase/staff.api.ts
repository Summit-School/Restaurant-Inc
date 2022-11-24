import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Admin, User } from "../../interfaces/auth.interface";
import * as uuid from "uuid";
import OneSignalReact from "react-onesignal";
/**
 * gets all staff depending on the type of service they provide
 *
 * @param type the type of staff to get from the database could be either "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER"
 * @param callBack  the callback function called when the staff data is retrieved successfully.
 *
 */
export const getStaffByType = (
  type: string,
  callBack: (user: User[]) => void
) => {
  switch (type) {
    case "SERVICE":
      onSnapshot(collection(getFirestore(), "service"), (res) => {
        callBack(res.docs.map((doc) => doc.data() as User));
      });
      return;
    case "CASHIER":
      onSnapshot(collection(getFirestore(), "cashier"), (res) => {
        callBack(res.docs.map((doc) => doc.data() as User));
      });
      return;
    case "KITCHEN":
      onSnapshot(collection(getFirestore(), "kitchen"), (res) => {
        callBack(res.docs.map((doc) => doc.data() as User));
      });
      return;
    case "COUNTER":
      onSnapshot(collection(getFirestore(), "counter"), (res) => {
        callBack(res.docs.map((doc) => doc.data() as User));
      });
      return;

    default:
      const error = new Error();
      error.message = "Unknown type: " + type;
      return;
  }
};

export const loginStaff = async (
  phone: string,
  password: string
): Promise<User | null> => {
  const staff = await getStaffInformation(phone);

  if (staff) {
    if (staff.password == password) {
      const id = uuid.v4();
      await setDoc(doc(getFirestore(), "attendance", id), { staff, timestamp: Date.now(), id })
      OneSignalReact.setExternalUserId(staff.id)
      return { phone: staff.phone, password: "", id: staff.id, name: staff.name, type: staff.type };
    }
  }

  return null;
};

async function getStaffInformation(phone: string): Promise<User | null> {
  const possibleService = query(
    collection(getFirestore(), "service"),
    where("phone", "==", phone)
  );
  const possibleCashier = query(
    collection(getFirestore(), "cashier"),
    where("phone", "==", phone)
  );
  const possibleCounter = query(
    collection(getFirestore(), "counter"),
    where("phone", "==", phone)
  );
  const possibleKitchen = query(
    collection(getFirestore(), "kitchen"),
    where("phone", "==", phone)
  );

  const services = (await getDocs(possibleService)).docs.map(
    (doc) => ({ ...doc.data(), type: "SERVICE" } as User)
  );
  const cashier = (await getDocs(possibleCashier)).docs.map(
    (doc) => ({ ...doc.data(), type: "CASHIER" } as User)
  );
  const counter = (await getDocs(possibleCounter)).docs.map(
    (doc) => ({ ...doc.data(), type: "COUNTER" } as User)
  );
  const kitchen = (await getDocs(possibleKitchen)).docs.map(
    (doc) => ({ ...doc.data(), type: "KITCHEN" } as User)
  );

  const staff =
    services.length > 0
      ? services[0]
      : cashier.length > 0
        ? cashier[0]
        : counter.length > 0
          ? counter[0]
          : kitchen.length > 0
            ? kitchen[0]
            : null;
  return staff;
}
