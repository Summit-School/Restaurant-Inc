import { uuidv4 } from "@firebase/util";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import {
    InventoryItem,
    InventorySubCategory,
} from "../../interfaces/inventory.interface";

let error = new Error();

export async function getSubCategories(
    onSuccess: (subCategories: InventorySubCategory[]) => void
) {
    const subCatRef = collection(getFirestore(), "sub-categories");

    onSnapshot(subCatRef, (snapshot) => {
        onSuccess(snapshot.docs.map((doc) => doc.data() as InventorySubCategory));
    });
}

export async function addSubCategory(name: string) {
    const id = uuidv4();
    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await setDoc(subCatRef, { id, name } as InventorySubCategory);

    return { message: "Successfully updated" };
}

export async function editSubCategory(name: string, id: string) {
    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await setDoc(subCatRef, { id, name } as InventorySubCategory);

    return { message: "Successfully updated" };
}

export async function deleteCategory(id: string) {
    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await deleteDoc(subCatRef);

    return { message: "Successfully deleted" };
}

export async function addToInventory(inventoryItem: InventoryItem) {
    inventoryItem.id = uuidv4();

    const inventoryRef = doc(getFirestore(), "inventory-record", inventoryItem.id);

    await setDoc(inventoryRef, inventoryItem);

    return { message: "Successfully updated inventory" };
}

export async function editToInventory(
    inventoryItem: InventoryItem,
    id: string
) {
    const inventoryRef = doc(getFirestore(), "inventory-record", id);

    await setDoc(inventoryRef, inventoryItem);

    return { message: "Successfully updated inventory" };
}

export async function deleteInventory(id: string) {
    const inventoryRef = doc(getFirestore(), "inventory-record", id);

    await deleteDoc(inventoryRef);

    return { message: "Successfully updated inventory" };
}

export async function getInventoryItems(
    onSuccess: (items: InventoryItem[]) => void
) {
    const inventoryRef = collection(getFirestore(), "inventory-record");

    onSnapshot(inventoryRef, (snapshot) => {
        onSuccess(snapshot.docs.map((doc) => doc.data() as InventoryItem));
    });
}

export async function releaseInventoryItem(
    inventoryId: string,
    releaseQuantity: number | string
) {
    releaseQuantity = +releaseQuantity;

    const inventoryItem = await getInventoryItemById(inventoryId);
    if (!inventoryItem.id) {
        error.message = "Sorry but the inventory item doesn't exist";
        throw error;
    }
    if (
        inventoryItem.itemQuantity <= 0 ||
        releaseQuantity > inventoryItem.itemQuantity
    ) {
        error.message = "Not enough items in stock to release";
        throw error;
    }

    let previousRelease = await getReleasedItemById(inventoryId);

    const inventoryQuantity = +inventoryItem.itemQuantity;
    const balanceInventoryQuantity = inventoryQuantity - releaseQuantity;

    if (!previousRelease) {
        previousRelease = inventoryItem;
        previousRelease.itemQuantity = 0;
    }

    previousRelease.itemQuantity =
        releaseQuantity + +previousRelease.itemQuantity;
    inventoryItem.itemQuantity = balanceInventoryQuantity;

    const inventoryRef = doc(getFirestore(), "inventory", inventoryItem.id);
    const released_stockRef = doc(
        getFirestore(),
        "released_stock",
        inventoryItem.id
    );

    await setDoc(inventoryRef, inventoryItem);
    await setDoc(released_stockRef, previousRelease);

    return { message: "Successfully updated inventory" };
}

export async function getInventoryItemById(inventoryId: string) {
    const inventoryRef = doc(getFirestore(), "inventory-record", inventoryId);

    return await getDoc(inventoryRef).then((doc) => doc.data() as InventoryItem);
}

export async function getReleasedItemById(inventoryId: string) {
    const inventoryRef = doc(getFirestore(), "released_stock", inventoryId);

    return await getDoc(inventoryRef).then((doc) => doc.data() as InventoryItem);
}

export async function getAllReleasedItems(
    onSuccess: (subCategories: InventoryItem[]) => void
) {
    const subCatRef = collection(getFirestore(), "released_stock");

    onSnapshot(subCatRef, (snapshot) => {
        onSuccess(snapshot.docs.map((doc) => doc.data() as InventoryItem));
    });
}
