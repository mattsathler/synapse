import { Clinic } from "./Clinic";

export interface User {
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'receptionist' | 'assistant';
    clinic?: Clinic;
    isActive: boolean;
    lastLogin?: Date;
}