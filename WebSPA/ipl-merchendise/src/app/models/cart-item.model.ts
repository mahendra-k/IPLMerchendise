export class CartItem {
    productId: number;
    quantity: number;
    productName: string;
    imageUrl: string;
    price: number;
    currencyCode: string;

    constructor(args: any) {
        this.productId = args.productId;
        this.quantity = args.quantity;
        this.productName = args.productName;
        this.imageUrl = args.imageUrl;
        this.price = args.price;
        this.currencyCode = args.currencyCode;
    }
}