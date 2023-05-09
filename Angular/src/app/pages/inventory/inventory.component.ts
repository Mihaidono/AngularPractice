import { Component } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  error?: string;
  itemList!: Item[];

  constructor(public dialog: MatDialog, public itemService: ItemService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
