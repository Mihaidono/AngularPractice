import { Component, OnInit } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/models/item';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  error?: string;
  loadingText: string = 'Loading ';

  itemList!: Item[];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public itemService: ItemService
  ) {}

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
    }, 1000);
  }

  getItemList() {
    this.itemService.getItems().subscribe(
      (response: Item[]) => {
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
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
    }
    this.openSnackBar('Deleting Item...','');
  }

  openDialog(id: number | null | undefined): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      data: { idToBeEdited: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.openSnackBar('Succesfully', 'Nice');
    });
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
  }
}
