import { Employee } from "./Employee";

export interface Record {
    id?: string;
    date: string;
    time: string;
    author: Employee;
    content: string;
    attachments?: Attachment[];
    images?: Image;
}

interface Image {
    name: string;
    base64: string;
}

interface Attachment {
    name: string;
    type: string;
    url?: string;
}
