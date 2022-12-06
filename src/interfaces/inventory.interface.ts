
export interface InventorySubCategory {
    id: string;
    name: string;
}

export interface InventoryItem {
    id?: string,
    name: string,
    category: "FOOD" | "DRINKS",
    subcategory: InventorySubCategory,
    price: string | number,
    quantity: string | number,
}