import { Cashier, Counter, Kitchen, Service, User } from "./auth.interface";

export interface Order {
  table: Table;
  id?: string;
  drinks: MenuItem[];
  food: MenuItem[];
  state?: "ORDERED" | "AVAILABLE" | "SERVED" | "PAID";
  service?: Service;
  counter?: Counter;
  kitchen?: Kitchen;
  cashier?: Cashier;
  timestamp?: number;
}

export interface Table {
  id: string;
  order?: Order;
}

export interface MenuItem {
  id?: string;
  name: string;
  price: number;
  category: "DRINKS" | "FOOD";
  inventory?: number;
  disabled?: boolean;
  quantity?: number;
}

export interface Menu {
  food: MenuItem[];
  drinks: MenuItem[];
}

export interface Attendance {
  user: User;
  timestamp: number;
}

export interface Notification {
  id: string;
  timestamp: number;
  message: string;
  order?: Order;
}

export interface Inventory {
  food: InventoryItem[];
  drinks: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  category: "DRINKS" | "FOOD";
  quantity: number;
}
