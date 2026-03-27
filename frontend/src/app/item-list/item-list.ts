// This is your component logic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService, Item } from '../item';   // ← important: '../item' (not .service)

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  grandTotal = 0;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.calculateGrandTotal();
    });
  }

  addItem(): void {
    this.itemService.addItem().subscribe(newItem => {
      this.items.push(newItem);
      this.calculateGrandTotal();
    });
  }

  updateItem(item: Item): void {
    this.itemService.updateItem(item.id, item).subscribe(updated => {
      const index = this.items.findIndex(i => i.id === item.id);
      if (index !== -1) this.items[index] = updated;
      this.calculateGrandTotal();
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== id);
      this.calculateGrandTotal();
    });
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}