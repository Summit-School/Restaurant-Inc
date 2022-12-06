export interface User {
    id: string;
    name: string,
    phone: string,
    password: string,
    type?: "SERVICE" | "CASHIER" | "KITCHEN" | "COUNTER" | "INVENTORY"
}

export interface Admin {
    email: string,
    password: string,


}


export interface Service extends User {


}


export interface Cashier extends User {

}

export interface Kitchen extends User {

}

export interface Counter extends User {

}


