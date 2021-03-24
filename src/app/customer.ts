
class PhoneDetails{
    countryName: string;
    countryCode: string;    
}
export class Customer {
    id: number;
    name: string;
    phone: string;
    validPhoneNumber: boolean;
    phoneDetails: PhoneDetails;
}