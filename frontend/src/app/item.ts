//This is your service file

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InvoiceItem {
  itemName: string;
  qty: number;
  price: number;
  total?: number;
}

export interface Invoice {
  id?: number;
  customerName: string;
  total: number;
  date?: Date;
  items: InvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/invoices';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  createInvoice(invoice: { customerName: string; items: InvoiceItem[] }): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }
}