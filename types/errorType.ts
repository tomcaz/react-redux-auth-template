import { Timestamp } from "firebase/firestore"

export type ErrorType = {
    when: ERROR_WHEN,
    object: any,
    happenedAt?: Date
}

export enum ERROR_WHEN {
    CREATE_UESR = 'CREATE_UESR'
}