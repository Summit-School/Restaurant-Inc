import { uuidv4 } from "@firebase/util";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { InventoryItem, InventorySubCategory } from "../../interfaces/inventory.interface";


export async function getSubCategories(onSuccess: (subCategories: InventorySubCategory[]) => void) {

    const subCatRef = collection(getFirestore(), "sub-categories");

    onSnapshot(subCatRef, (snapshot) => {
        onSuccess(snapshot.docs.map((doc) => doc.data() as InventorySubCategory));
    })

}


export async function addSubCategory(name: string) {

    const id = uuidv4();
    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await setDoc(subCatRef, { id, name } as InventorySubCategory);

    return ({ message: "Successfully updated" })

}

export async function editSubCategory(name: string, id: string) {

    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await setDoc(subCatRef, { id, name } as InventorySubCategory);

    return ({ message: "Successfully updated" })

}


export async function deleteCategory(id: string) {

    const subCatRef = doc(getFirestore(), "sub-categories", id);

    await deleteDoc(subCatRef);

    return ({ message: "Successfully deleted" })
}



export async function addToInventory(inventoryItem: InventoryItem) {
    inventoryItem.id = uuidv4()

    const inventoryRef = doc(getFirestore(), "inventory", inventoryItem.id);

    await setDoc(inventoryRef, inventoryItem);

    return ({ message: "Successfully updated inventory" })

}


export async function editToInventory(inventoryItem: InventoryItem, id: string) {


    const inventoryRef = doc(getFirestore(), "inventory", id);

    await setDoc(inventoryRef, inventoryItem);

    return ({ message: "Successfully updated inventory" })

}

export async function deleteInventory(id: string) {


    const inventoryRef = doc(getFirestore(), "inventory", id);

    await deleteDoc(inventoryRef);

    return ({ message: "Successfully updated inventory" })

}


export async function getInventoryItems(onSuccess: (items: InventoryItem[]) => void) {
    const inventoryRef = collection(getFirestore(), "inventory");

    onSnapshot(inventoryRef, (snapshot) => {
        onSuccess(snapshot.docs.map((doc) => doc.data() as InventoryItem));
    })
}