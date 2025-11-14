import { Address } from "./Address";
import { Record } from "./Record";

export interface Patient {
    // Personal Information
    id?: string;
    registration: string;
    fullName: string;
    socialName?: string;
    birthDate?: string;
    gender?: 'Male' | 'Female' | 'Other';
    identification?: string;
    age: number;
    image?: string;
    records: {
        date: Date,
        records: Record[]
    }[];
    totalRecords?: number;

    // Address
    address: Address;

    // Contact
    mainPhone?: string;
    secondaryPhone?: string;
    mainCellphone?: string;
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
