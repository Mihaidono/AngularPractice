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
  loadingText: string = 'Loading ';

  elapsedTimeNoResponse: number = 0;

  itemList!: Item[];

  constructor(public dialog: MatDialog, public itemService: ItemService) {}

  ngOnInit() {
    this.getItemList();
    this.loadingAnimation();
  }

  loadingAnimation(): void {
    setInterval(() => {
      let pointCount = this.loadingText.split('.').length;
      if (pointCount <= 3) {
        this.loadingText += '.';
      } else {
        this.loadingText = 'Loading .';
      }
      this.elapsedTimeNoResponse += 1;
    }, 1000);
  }

  getItemList() {
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
          this.getItemList();
          //doesn't work
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateItem(itemId: number | undefined) {
    if (itemId !== undefined) {
      //implementation needed
      this.getItemList();
    }
  }

  addItem() {
    //implementation needed
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
