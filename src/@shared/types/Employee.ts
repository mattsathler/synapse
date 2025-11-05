import { Address } from "./Address";
import { Task } from "./Task";

export interface Employee {
    id: string,
    name: string,
    photo?: string,
    tasks: Task[],
    email: string,
    address?: Address,
    identification: string,
    position: string,
    isMedic: boolean,
    mainPhone: string,
    secondaryPhone?: string,
    birthDate?: string,
}