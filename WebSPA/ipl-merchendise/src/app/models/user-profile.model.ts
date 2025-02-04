export class UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    constructor(args: any) {
        this.id = args.id;
        this.name = args.name;
        this.email = args.email;
        this.phone = args.phone;
        this.address = args.address;
    }
}