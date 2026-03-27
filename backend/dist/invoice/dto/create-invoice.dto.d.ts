export declare class CreateInvoiceItemDto {
    itemName: string;
    qty: number;
    price: number;
}
export declare class CreateInvoiceDto {
    customerName: string;
    items: CreateInvoiceItemDto[];
}
