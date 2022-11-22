import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Admin, Service, User } from "../../interfaces/auth.interface";

/**
 * Logs into admin account with email address and password
 * 
 * @param email The email address of the admin account
 * @param password The password of the admin account
 * 
 * @returns {Promise<Admin|null>} - A Promise resolved with the admin user object or null if the email address is not valid
 */


export const loginAdmin = async (email: string, password: string): Promise<Admin | null> => {

    const adminRef = doc(getFirestore(), "admin", email.toLowerCase());
    const admin = (await getDoc(adminRef)).data() as Admin;
    if (admin) {
        if (admin.password == password) {
            return { email: admin.email, password: "" };
        }
    }
    return null;


}


/**
 * Create staff account 
 * 
 * @param staff  the staff to be created 
 *   
 * @param type The type of the account to be created could be "SERVICE"|"CASHIER"|"KITCHEN"|"COUNTER"
 * @returns {Promise<User|null>} - A Promise resolved with the service user object or null
 * 
 */

export async function createService(staff: User, type: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER"): Promise<User | null> {
    const error = new Error()
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

    switch (type) {
        case "SERVICE":
            await setDoc(doc(getFirestore(), "service", staff.phone), staff);
            return staff;
        case "CASHIER":
            await setDoc(doc(getFirestore(), "cashier", staff.phone), staff);
            return staff;

        case "KITCHEN":
            await setDoc(doc(getFirestore(), "kitchen", staff.phone), staff);
            return staff;
        case "COUNTER":
            await setDoc(doc(getFirestore(), "counter", staff.phone), staff);
            return staff;
        default:
            error.message = "Unknown staff type provided: " + type;
            throw error;
    }

}
