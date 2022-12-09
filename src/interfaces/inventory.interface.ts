export interface InventorySubCategory {
  id: string;
  name: string;
}

export interface InventoryItem {
  id?: string;
  itemName: string;
  category: "FOOD" | "DRINKS";
  subcategory: InventorySubCategory;
  itemPrice: string | number;
  itemQuantity: string | number;
}
