import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItem } from './invoice/entities/invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',           // ← change if your username is different
      password: '',               // ← put your MySQL password here
      database: 'invoice_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,          // Auto-creates tables (good for development)
      logging: true,
    }),
    TypeOrmModule.forFeature([Invoice, InvoiceItem]), // Optional but safe
    InvoiceModule,
  ],
})
export class AppModule {}