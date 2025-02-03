export class Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity:number;
    description:string;
    currencyCode:string;
    constructor(args:any)
    {
        this.id = args.id;
        this.name = args.name;
        this.price = args.price;
        this.imageUrl = args.imageUrl;
        this.quantity = args.quantity;
        this.description = args.description;
        this.currencyCode = args.currencyCode;
    }
}