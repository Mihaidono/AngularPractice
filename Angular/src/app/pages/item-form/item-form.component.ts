import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';

export interface DialogData {
  idToBeEdited: number | undefined;
}

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup;
  formButtonText!: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
    this.completeFormData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  completeFormData(): void {
    if (this.data.idToBeEdited != 0) {
      this.itemService.getItemById(this.data.idToBeEdited).subscribe((item) => {
        this.form.setValue({
          name: item.name,
          category: item.category,
          quantity: item.number,
        });
      });
      this.formButtonText = 'Save';
    } else {
      this.formButtonText = 'Add Item';
    }
  }

  submitForm(): void {
    let itemToBeSent: Item = {
      _id: this.data.idToBeEdited,
      name: this.form.value.name,
      category: this.form.value.category,
      number: this.form.value.quantity,
    };

    if (this.data.idToBeEdited != 0) {
      this.itemService.editItem(itemToBeSent).subscribe(
        () => {
          console.log('Item edited successfully.');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error editing item:', error);
        }
      );
    } else {
      this.itemService.createItem(itemToBeSent).subscribe(
        () => {
          console.log('Item created successfully.');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error creating item:', error);
        }
      );
    }
  }

  cancelForm(): void {
    this.dialogRef.close();
  }

  private CreateForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
      quantity: [null],
    });
  }
}
