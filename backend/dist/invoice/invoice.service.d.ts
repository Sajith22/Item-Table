import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoiceService {
    private invoiceRepository;
    private itemRepository;
    constructor(invoiceRepository: Repository<Invoice>, itemRepository: Repository<InvoiceItem>);
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findOne(id: number): Promise<Invoice>;
    remove(id: number): Promise<void>;
}
