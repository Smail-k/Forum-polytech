import { Topic } from './../Models/topic';
import { CreateTopicDialogComponent } from './../create-topic-dialog/create-topic-dialog.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  @Input() course : number;
  constructor(public dialog: MatDialog) { }
  @Output() newTopic = new EventEmitter<Topic>();

  ngOnInit(): void {
  }

  print(){
    console.log("hello")
  }
  openDialog(): void {
    //console.log(this.course+"---")
    const dialogRef = this.dialog.open(CreateTopicDialogComponent, {
      data : this.course
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
        this.newTopic.emit({id : result.id ,name : result.title,numberPosts : 0,course : "",date_modif : "---"});
    });
  }
}
