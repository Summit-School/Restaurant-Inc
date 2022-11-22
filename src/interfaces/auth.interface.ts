export interface User {
    name: string,
    phone: string,
    password: string
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


