export class Order {
    id: number;
    orderDate: Date;
    totalAmount: number;
    status: string;
    items: OrderItem[];
    currencyCode: string;

    constructor(args: any) {
        this.id = args.id;
        this.orderDate = args.date;
        this.totalAmount = args.totalAmount;
        this.status = args.status;
        this.items = args.items;
        this.currencyCode = args.currencyCode;
    }
}

export class OrderItem {
    quantity: number;
    price: number;
    productId: number;
    productName: string;
    currencyCode: string;

    constructor(args: any) {
        this.productId = args.productId;
        this.quantity = args.quantity;
        this.price = args.price;
        this.productName = args.productName;
        this.currencyCode = args.currencyCode;
    }
}