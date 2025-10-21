import { Record } from "./Record";

export interface Patient {
    id: number;
    registration: string;
    full_name: string;
    image?: string;
    age: number;
    address: {
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zip: string;
    };
    records: {
        date: Date,
        records: Record[]
    }[];
}