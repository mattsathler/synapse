export interface Record {
    id: string;
    date: Date;
    author: string;
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
