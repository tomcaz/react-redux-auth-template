export type User = {
    id: string,
    emailAddress: string,
    role: string,
    fullname: string,
    postalCode?: string,
    address?: string,
    activated: boolean
}

export type UserDataInput = {
    emailAddress: string,
    fullname: string,
    postalCode?: string,
    address?: string,
    activated: boolean
}

export enum Role {
    Customer,
    Admin,
    Seller,
    Guest
}
