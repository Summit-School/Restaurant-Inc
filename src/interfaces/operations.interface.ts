import { User } from "./auth.interface"


export interface Order {
    table: Table,
    id: string,
    items: MenuItem[],
    state: "ORDERED" | "AVAILABLE" | "SERVED" | "DELIVERED"

}


export interface Table {
    id: string,

}


export interface MenuItem {
    id: string,
    name: string,
    price: number,
    category: "DRINKS" | "FOOD"
}

export interface Menu {
    food: MenuItem[],
    drinks: MenuItem[],
}

export interface Attendance {
    user: User,
    timestamp: number,
}

export interface Notification {
    id: string,
    timestamp: number,
    message: string,
    order?: Order
}


export interface Inventory {
    food: InventoryItem[],
    drinks: InventoryItem[],

}

export interface InventoryItem {
    id: string,
    name: string,
    price: number,
    category: "DRINKS" | "FOOD",
    quantity: number

}