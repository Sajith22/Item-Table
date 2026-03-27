// This is your component logic


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Invoice, InvoiceItem } from '../item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent implements OnInit {
  invoices: Invoice[] = [];
  showForm = false;

  // Form data
  customerName = '';
  items: InvoiceItem[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.itemService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

  // Add new empty row
  addItemRow(): void {
    this.items.push({
      itemName: '',
      qty: 1,
      price: 0,
      total: 0
    });
  }

  // Remove row
  removeItemRow(index: number): void {
    this.items.splice(index, 1);
    this.calculateRowTotal(index); // just in case
  }

  // Calculate single row total
  calculateRowTotal(index: number): void {
    const item = this.items[index];
    if (item) {
      item.total = (item.qty || 0) * (item.price || 0);
    }
  }

  // Grand total of current form
  get currentGrandTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.total || 0), 0);
  }

  // Save invoice to backend
  saveInvoice(): void {
    if (!this.customerName || this.items.length === 0) {
      alert("Please enter customer name and at least one item");
      return;
    }

    const invoiceData = {
      customerName: this.customerName,
      items: this.items.map(item => ({
        itemName: item.itemName,
        qty: item.qty,
        price: item.price
      }))
    };

    this.itemService.createInvoice(invoiceData).subscribe({
      next: (newInvoice) => {
        alert('Invoice saved successfully!');
        this.loadInvoices();           // refresh list
        this.resetForm();              // clear form
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save invoice');
      }
    });
  }

  resetForm(): void {
    this.customerName = '';
    this.items = [];
    this.showForm = false;
  }

  // Toggle form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm && this.items.length === 0) {
      this.addItemRow(); // add one empty row by default
    }
  }
}