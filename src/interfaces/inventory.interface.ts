
export interface InventorySubCategory {
    id: string;
    name: string;
}

export interface InventoryItem {
    id?: string,
    name: string,
    category: "FOOD" | "DRINKS",
    subcategory: string,
    price: string | number,
    quantity: string | number,
}