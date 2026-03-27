import { Invoice } from './invoice.entity';
export declare class InvoiceItem {
    id: number;
    itemName: string;
    qty: number;
    price: number;
    total: number;
    invoice: Invoice;
    invoiceId: number;
}
