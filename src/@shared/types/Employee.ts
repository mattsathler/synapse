import { Task } from "./Task";

export interface Employee {
    id: string,
    name: string,
    photo?: string,
    tasks: Task[]
}