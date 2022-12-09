import {
  InventoryItem,
  Menu,
  MenuItem,
  Order,
} from "../../interfaces/operations.interface";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./index.ts";
import * as uuid from "uuid";

/**
 * adds an item to the menu of the restaurant so it can be visible to the waiter
 *
 * @param menuItem - the item to add to the menu could be under the category "FOOD" or "DRINKS"
 *
 * @returns - A Promise resolved once the item has been successfully added to the backend (note that it won't resolve while you're offline).
 */

export async function addItemToMenu(menuItem: MenuItem) {
  if (menuItem.category === "DRINKS" && !menuItem.inventory) {
    const error = new Error();
    error.message = "You need to provide a quantity for the Drinks menu item";
    throw error;
  }

  menuItem = {
    id: uuid.v4(),
    ...menuItem,
    quantity: 0,
    disabled: false,
  };

  const menuRef = doc(db, "menu", menuItem!.id + "");
  await setDoc(menuRef, menuItem);
  return menuItem;
}

/**
 * fetches an item from the menu of the restaurant so it can be visible to the waiter
 *
 * @param id - the item id to be fetched
 *
 * @returns - A Promise resolved once the item has been successfully fetched to the backend (note that it won't resolve while you're offline).
 */
export async function fetchMenuItemById(id: string) {
  const menuRef = doc(db, "menu", id);
  return getDoc(menuRef).then((res) => res.data() as MenuItem);
}

/**
 * updates the inventory number of a served menu item
 *
 * @param items - the items to be updated
 *
 * @returns - A Promise resolved once the item has been successfully fetched to the backend (note that it won't resolve while you're offline).
 */
export async function updateInventory(items: MenuItem[]) {
  for (let i = 0; i < items.length; i++) {
    const item = await fetchMenuItemById(items[0].id!);
    const incomingItem = items[i]
    if (item && item.id) {
      const menuRef = doc(db, "menu", item.id);
      // console.log(item.itemQuantity);
      await updateDoc(menuRef, {
        inventory: item.inventory ? item.inventory - (incomingItem.quantity || 1) : 0,
      });
    }
  }
  return { message: "Successfully updated inventory" };
}

/**
 * removes an item from the menu of the restaurant so it is no longer visible to the waiter
 *
 * @param menuItem - the item to remove from the menu could be under the category "FOOD" or "DRINKS"
 *
 * @returns - A Promise resolved once the item has been successfully removed from the backend (note that it won't resolve while you're offline)
 */

export async function removeItemFromMenu(menuItem: MenuItem) {
  const menuRef = doc(db, "menu", menuItem!.id + "");
  await setDoc(menuRef, menuItem);
  return menuItem;
}

/**
 * fetches all menu items from both the food and drinks category
 *
 * @returns - A Promise resolved once the items have been fetched from the backend with the category "FOOD" and "DRINKS"
 */

export async function fetchAllMenuItems() {
  const menuRef = collection(db, "menu");
  const menu = (await getDocs(menuRef)).docs.map(
    (doc) => doc.data() as MenuItem
  );
  return {
    drinks: menu.filter((item) => item.category === "DRINKS"),
    food: menu.filter((item) => item.category === "FOOD"),
  };
}

/**
 * realtime fetches all menu items from both the food and drinks category
 *
 *@param onSuccess call back function called everytime a new menu item is updated
 *
 * @returns - A Promise resolved once the item has been successfully gotten
 */

export async function onSnapshotFetchMenuItems(
  onSuccess: (result: { drinks: MenuItem[]; food: MenuItem[] }) => void
) {
  const menuRef = collection(db, "menu");
  const menu = onSnapshot(menuRef, (res) => {
    const menu = res.docs.map((doc) => doc.data() as MenuItem);
    const result = {
      drinks: menu.filter((item) => item.category === "DRINKS"),
      food: menu.filter((item) => item.category === "FOOD"),
    };
    onSuccess(result);
  });
}

/**
 * edits an item to the menu of the restaurant so it can be visible to the waiter
 *
 * @param menuItem - the item to edit to the menu could be under the category "FOOD" or "DRINKS"
 *
 * @returns - A Promise resolved once the item has been successfully edited on the backend (note that it won't resolve while you're offline).
 */

export async function EditItemToMenu(menuItem: MenuItem) {
  if (menuItem.category === "DRINKS" && !menuItem.inventory) {
    const error = new Error();
    error.message = "You need to provide a quantity for the Drinks menu item";
    throw error;
  }

  if (!menuItem.id) {
    const error = new Error();
    error.message = "You need to provide an id for the menu item";
    throw error;
  }

  const menuRef = doc(db, "menu", menuItem!.id + "");
  await setDoc(menuRef, menuItem);
  return menuItem;
}

export async function DeleteMenuItem(menuItemId: string) {
  if (!menuItemId) {
    const error = new Error();
    error.message = "You need to provide an id for the menu item";
    throw error;
  }

  const menuRef = doc(db, "menu", menuItemId);
  await deleteDoc(menuRef);
  return { message: "Successfully deleted" };
}

export async function changeDisableState(menuItemId: string, disable: boolean) {
  if (!menuItemId) {
    const error = new Error();
    error.message = "You need to provide an id for the menu item";
    throw error;
  }

  const menuRef = doc(db, "menu", menuItemId);
  await updateDoc(menuRef, { disabled: disable });
  return { message: "Successfully deleted" };
}
