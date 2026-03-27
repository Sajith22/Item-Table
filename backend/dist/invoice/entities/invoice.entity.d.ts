import { InvoiceItem } from './invoice-item.entity';
export declare class Invoice {
    id: number;
    customerName: string;
    total: number;
    date: Date;
    items: InvoiceItem[];
}
