export class CartItem {
    productId: number;
    quantity: number;
    productName: string;
    imageUrl: string;
    constructor(args: any) {
        this.productId = args.productId;
        this.quantity = args.quantity;
        this.productName = args.productName;
        this.imageUrl = args.imageUrl;
    }
}