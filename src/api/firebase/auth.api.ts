import { doc, getDoc, getFirestore } from "firebase/firestore";
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

    const adminRef = doc(getFirestore(), "admin", email);
    const admin = (await getDoc(adminRef)).data() as Admin
    if (admin) {
        if (admin.password == password) {
            return admin;
        }
    }
    return null;


}


/**
 * Create service account 
 * 
 * @param service The service account to be created
 * 
 * @returns {Promise<Service|null>} - A Promise resolved with the service user object or null
 * 
 */
