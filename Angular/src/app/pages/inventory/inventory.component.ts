import { Component, OnInit } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  error?: string;
  itemList!: Item[];

  constructor(public dialog: MatDialog, public itemService: ItemService) {}

  ngOnInit() {
    this.fetchItemList();
  }

  fetchItemList() {
    this.itemService.getItems().subscribe(
      (response: any) => {
        this.itemList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteItem(itemId: number | undefined) {
    if (itemId !== undefined) {
      this.itemService.deleteItem(itemId).subscribe(
        (response) => {
          this.itemList = this.itemList.filter((item) => item.id !== itemId);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
