export type ResponseApi = {
    id: number;
    dni: string;
    phone_number: string;
    phone_contact: string;
    full_name: string;
    verified: boolean;
    ip_address: string;
    created_at: string;
}

export type IpAddressResponse = {
    ip_address: string;
}