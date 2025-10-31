import { Employee } from "./Employee";
import { Patient } from "./Patient";

export interface Task {
    start: Date;
    end: Date;
    title: string;
    description?: string;
    top?: number;
    height?: number;
    width?: string;
    left?: string;
    patient: Patient | null;
    employees: Employee[];
    type: number;
    status: number;
}