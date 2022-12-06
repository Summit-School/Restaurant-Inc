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
import { TYPE } from "react-toastify/dist/utils";
/**
 * gets all staff depending on the type of service they provide
 *
 * @param type the type of staff to get from the database could be either "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
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
    case "INVENTORY":
      onSnapshot(collection(getFirestore(), "inventory"), (res) => {
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



export const getStaffById = (
  id: string,
  type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
) => {
  switch (type) {
    case "SERVICE":
      return getDoc(doc(getFirestore(), "service")).then((doc) => {
        return doc.data() as User
      });

    case "CASHIER":
      return getDoc(doc(getFirestore(), "cashier")).then((doc) => {
        return doc.data() as User
      });
    case "KITCHEN":
      return getDoc(doc(getFirestore(), "kitchen")).then((doc) => {
        return doc.data() as User;
      });
    case "COUNTER":
      return getDoc(doc(getFirestore(), "counter")).then((doc) => {
        return doc.data() as User;
      });
    case "INVENTORY":
      return getDoc(doc(getFirestore(), "inventory")).then((doc) => {
        return doc.data() as User;
      });

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
    else {
      const error = new Error()
      error.message = "Password is incorrect"
      throw error;
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
  const possibleInventory = query(
    collection(getFirestore(), "inventory"),
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
  const inventory = (await getDocs(possibleInventory)).docs.map(
    (doc) => ({ ...doc.data(), type: "INVENTORY" } as User)
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
            : inventory.length > 0
              ? inventory[0] :
              null;
  return staff;
}






async function updateStaffInformation(staffInfo: User, type: "SERVICE" | "KITCHEN" | "CASHIER" | "COUNTER" | "INVENTORY") {
  const staff = await getStaffById(staffInfo.id, type);
  if (!staff) {
    const error = new Error();
    error.message = "Sorry but the staff does not exist"
    throw error;
  }
  await setDoc(doc(getFirestore(), type.toLowerCase(), staffInfo.id), staffInfo);
  return staffInfo;

}