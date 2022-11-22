import { Cashier, Counter, Kitchen, Service, User } from "./auth.interface"


export interface Order {
    table: Table,
    id: string,
    items: MenuItem[],
    state: "ORDERED" | "AVAILABLE" | "SERVED" | "DELIVERED",
    service?: Service,
    counter?: Counter,
    kitchen?: Kitchen,
    cashier?: Cashier

}


export interface Table {
    id: string,
    order?: Order

}


export interface MenuItem {
    id?: string,
    name: string,
    price: number,
    category: "DRINKS" | "FOOD",
    quantity?: number,
    disabled?: boolean;
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