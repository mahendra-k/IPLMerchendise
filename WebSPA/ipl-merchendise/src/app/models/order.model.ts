export class Order
{
    id: number;
    date: string;
    totalPrice: number;
    status: string;
    items: OrderItem[];

    constructor(args:any){
        this.id = args.id;
        this.date = args.date;
        this.totalPrice = args.totalPrice;
        this.status = args.status;
        this.items = args.items;
    }
}

export class OrderItem {
    quantity: number;
    price: number;
    productId:number;
    productName:string;

    constructor(args:any){
        this.productId = args.productId;
        this.quantity = args.quantity;
        this.price = args.price;
        this.productName = args.productName;
    }
  }