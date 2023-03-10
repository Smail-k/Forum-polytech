import { MessageService } from './../message/message.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';  


@Component({
  selector: 'app-create-topic-dialog',
  templateUrl: './create-topic-dialog.component.html',
  styleUrls: ['./create-topic-dialog.component.scss']
})
export class CreateTopicDialogComponent implements OnInit {
  title : string;
  errorMessage : string="";
  constructor(public dialogRef: MatDialogRef<CreateTopicDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: number,@Inject(MessageService) public service : MessageService) {}

  onNoClick(): void {
    //console.log(this.data);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  saveNewTopic(){
    if(this.title==undefined || this.title==""){
      this.errorMessage="you must type the title of the topic";
      return;
    }
    this.service.sendMessage("saveNewTopic",{ title : this.title, id : this.data}).subscribe(result=>{
      if(result.status=="error")
        this.errorMessage="error adding this topic";
      else 
        this.dialogRef.close({title : this.title,id : this.data});
    })
  }
}
