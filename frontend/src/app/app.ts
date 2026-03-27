import { Component } from '@angular/core';
import { ItemListComponent } from './item-list/item-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}