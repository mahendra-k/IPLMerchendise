export class PageResult<T>{
    items:T[];
    totalCount:number;
    pageNumber:number;
    pageSize:number;
    totalPages:number;

    constructor(args:any)
    {
        this.items = args.items;
        this.totalCount = args.totalCount;
        this.pageNumber = args.pageNumber;
        this.pageSize = args.pageSize;
        this.totalPages = args.totalPages;
    }
}