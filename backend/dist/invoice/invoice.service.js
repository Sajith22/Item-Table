"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const invoice_item_entity_1 = require("./entities/invoice-item.entity");
let InvoiceService = class InvoiceService {
    invoiceRepository;
    itemRepository;
    constructor(invoiceRepository, itemRepository) {
        this.invoiceRepository = invoiceRepository;
        this.itemRepository = itemRepository;
    }
    async create(createInvoiceDto) {
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
        savedInvoice.total = grandTotal;
        await this.invoiceRepository.save(savedInvoice);
        return this.findOne(savedInvoice.id);
    }
    async findAll() {
        return this.invoiceRepository.find({
            relations: ['items'],
            order: { date: 'DESC' },
        });
    }
    async findOne(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice #${id} not found`);
        }
        return invoice;
    }
    async remove(id) {
        const invoice = await this.findOne(id);
        await this.invoiceRepository.remove(invoice);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_item_entity_1.InvoiceItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map