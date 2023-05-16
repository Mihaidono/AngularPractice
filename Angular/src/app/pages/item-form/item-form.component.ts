import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';

export interface DialogData {
  idToBeEdited: number;
}

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup;
  
  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public itemService: ItemService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit(): void {
    this.CreateForm();
  }

  private CreateForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null],
      quantity: [null],
    });
  }
}
