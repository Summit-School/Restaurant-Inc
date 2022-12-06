import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { Admin, Service, User } from "../../interfaces/auth.interface";
import * as uuid from "uuid";

/**
 * Logs into admin account with email address and password
 *
 * @param email The email address of the admin account
 * @param password The password of the admin account
 *
 * @returns {Promise<Admin|null>} - A Promise resolved with the admin user object or null if the email address is not valid
 */

export const loginAdmin = async (
  email: string,
  password: string
): Promise<Admin | null> => {
  const adminRef = doc(getFirestore(), "admin", email.toLowerCase());
  const admin = (await getDoc(adminRef)).data() as Admin;
  if (admin) {
    if (admin.password == password) {
      return { email: admin.email, password: "" };
    }
  }

  return null;
};



/**
 * Creates a staff account
 *
 * @param staff  the staff to be created
 *
 * @param type The type of the account to be created could be "SERVICE"|"CASHIER"|"KITCHEN"|"COUNTER"
 *
 * @returns {Promise<User|null>} - A Promise resolved with the staff user object or null
 *
 */

export async function createStaff(
  staff: User,
  type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
): Promise<User | null> {
  const error = new Error();
  if (!staff.name) {
    error.message = "Please provide a name for the service";
    throw error;
  }
  if (!staff.phone) {
    error.message = "Please provide an phone address for the service";
    throw error;
  }
  if (!staff.password) {
    error.message = "Please provide a password for the service";
    throw error;
  }
  if (!staff.id) {
    staff = { ...staff, id: uuid.v4() };
  }

  console.log(staff);

  switch (type) {
    case "SERVICE":
      await setDoc(doc(getFirestore(), "service", staff.id), staff);
      return staff;
    case "CASHIER":
      await setDoc(doc(getFirestore(), "cashier", staff.id), staff);
      return staff;

    case "KITCHEN":
      await setDoc(doc(getFirestore(), "kitchen", staff.id), staff);
      return staff;
    case "COUNTER":
      await setDoc(doc(getFirestore(), "counter", staff.id), staff);
      return staff;
    default:
      error.message = "Unknown staff type provided: " + type;
      throw error;
  }
}

/**
 *
 * Edits a particular staff's information
 *
 * @param staff The staff that is to be edited
 * @param type The type of the staff that is to be edited could be "SERVICE"| "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
 *
 * @return {Promise<User>} A promise that resolves with the updated staff information
 */

export async function editStaffInfo(
  staff: User,
  type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER"
): Promise<User> {
  const staffExists = await verifyStaffExists(staff, type);
  if (staffExists) {
    await createStaff(staff, type);
    return staff;
  }

  const error = new Error();
  error.message = "The staff with id " + staff.id + " does not exist";
  throw error;
}

/**
 *
 *Verifies if a particular staff exists in the Firestore
 *
 * @param staff The staff that is to be verified
 * @param type The type of the staff that is to be verified could be "SERVICE"| "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
 *
 * @return {Promise<boolean>} A promise that resolves with true if the staff exists in the Firestore else false
 */

export async function verifyStaffExists(
  staff: User,
  type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
): Promise<boolean> {
  switch (type) {
    case "SERVICE":
      const service = (
        await getDoc(doc(getFirestore(), "service", staff.id))
      ).data();
      return !!service;

    case "CASHIER":
      const cashier = (
        await getDoc(doc(getFirestore(), "cashier", staff.id))
      ).data();
      return !!cashier;

    case "COUNTER":
      const counter = (
        await getDoc(doc(getFirestore(), "counter", staff.id))
      ).data();
      return !!counter;

    case "INVENTORY":
      const inventory = (
        await getDoc(doc(getFirestore(), "inventory", staff.id))
      ).data();
      return !!inventory;

    case "KITCHEN":
      const kitchen = (
        await getDoc(doc(getFirestore(), "kitchen", staff.id))
      ).data();
      return !!kitchen;
    default:
      const error = new Error("unknown type " + type);
      error.message = "Unknown staff type provided: " + type;
      throw error;
  }
}

/**
 *
 * Deletes a particular staff's information
 *
 * @param staff The staff that is to be deleted
 * @param type The type of the staff that is to be deleted could be "SERVICE"| "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
 *
 * @return {Promise<{message:string}>} A promise that resolves with a message
 */

export async function deleteStaff(
  staff: User,
  type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
): Promise<{ message: string }> {
  const staffExists = await verifyStaffExists(staff, type);
  if (staffExists) {
    await deleteDoc(doc(getFirestore(), type.toLowerCase(), staff.id));
    return { message: "Deleted successfully" };
  }

  const error = new Error();
  error.message = "The staff with id " + staff.id + " does not exist";
  throw error;
}
