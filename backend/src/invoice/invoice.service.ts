import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    @InjectRepository(InvoiceItem)
    private itemRepository: Repository<InvoiceItem>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      customerName: createInvoiceDto.customerName,
      total: 0,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    let grandTotal = 0;

    const items = createInvoiceDto.items.map((itemDto) => {
      const itemTotal = itemDto.qty * itemDto.price;
      grandTotal += itemTotal;

      const item = this.itemRepository.create({
        itemName: itemDto.itemName,
        qty: itemDto.qty,
        price: itemDto.price,
        total: itemTotal,
        invoiceId: savedInvoice.id,
      });
      return item;
    });

    await this.itemRepository.save(items);

    // Update invoice total
    savedInvoice.total = grandTotal;
    await this.invoiceRepository.save(savedInvoice);

    return this.findOne(savedInvoice.id); // return with items
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: ['items'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice #${id} not found`);
    }
    return invoice;
  }

  async remove(id: number): Promise<void> {
    const invoice = await this.findOne(id);
    await this.invoiceRepository.remove(invoice);
  }
}