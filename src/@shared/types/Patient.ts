import { Record } from "./Record";

export interface Patient {
    // Personal Information
    id: string;
    registration: string;
    fullName: string;
    socialName?: string;
    birthDate?: string; // ISO format 'YYYY-MM-DD'
    gender?: 'Male' | 'Female' | 'Other';
    identification?: string;
    rg?: string;
    age: number;
    image?: string;
    records: {
        date: Date,
        records: Record[]
    }[];
    totalRecords?: number;

    // Address
    address: {
        postalCode: string;
        region: string;
        state: string;
        city: string;
        street: string;
        complement: string;
        number: string;
        neighborhood: string;
    }

    // Contact
    phone?: string;
    secondaryPhone?: string;
    cellphone?: string;
    secondaryCellphone?: string;
    email?: string;

    // Insurance
    insuranceType?: string;
    insuranceCode?: string;
    cnsNumber?: string;
    medicalRecordNumber?: string;
    tags?: string[];
    registrationNumber?: string;

    // Additional Information
    company?: string;
    reference?: string;
    referredBy?: string;
    maritalStatus?: string;
    profession?: string;
    educationLevel?: string;
    fatherName?: string;
    motherName?: string;
    children?: string;
    companion?: string;
    spouse?: string;
    notes?: string;
}
