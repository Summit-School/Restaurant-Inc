import { InventoryItem, MenuItem, Order } from "../../interfaces/operations.interface";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '.'
import * as uuid from "uuid"



/**
 * adds an item to the menu of the restaurant so it can be visible to the waiter
 * 
 * @param menuItem - the item to add to the menu could be under the category "FOOD" or "DRINKS"
 * 
 * @returns - A Promise resolved once the item has been successfully added to the backend (note that it won't resolve while you're offline).
 */

export async function addItemToMenu(menuItem: MenuItem) {

    if (menuItem.category === "DRINKS" && !menuItem.quantity) {
        const error = new Error()
        error.message = "You need to provide a quantity for the Drinks menu item"
        throw error
    }

    menuItem = {
        id: uuid.v4(),
        ...menuItem

    }

    const menuRef = doc(db, "menu", menuItem!.id + "")
    await setDoc(menuRef, menuItem);
    return menuItem
}

/**
 * removes an item from the menu of the restaurant so it is no longer visible to the waiter
 * 
 * @param menuItem - the item to remove from the menu could be under the category "FOOD" or "DRINKS"
 * 
 * @returns - A Promise resolved once the item has been successfully removed from the backend (note that it won't resolve while you're offline)
 */

export async function removeItemFromMenu(menuItem: MenuItem) {

    const menuRef = doc(db, "menu", menuItem!.id + "")
    await setDoc(menuRef, menuItem)
    return menuItem
}

/**
 * fetches all menu items from both the food and drinks category
 * 
 * @returns - A Promise resolved once the items have been fetched from the backend with the category "FOOD" and "DRINKS"
 */

export async function fetchAllMenuItems() {

    const menuRef = collection(db, "menu")
    const menu = (await getDocs(menuRef)).docs.map(doc => doc.data() as MenuItem)
    return ({
        drinks: menu.filter((item) => item.category === "DRINKS"),
        food: menu.filter((item) => item.category === "FOOD")
    })
}


/**
 *  
 */