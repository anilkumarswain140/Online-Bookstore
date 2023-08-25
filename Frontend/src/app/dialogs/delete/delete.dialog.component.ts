import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { Appservice } from 'src/app/service/appservice.service';



@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: Appservice) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    // this.dataService.deleteIssue(this.data.id);
  }
}
