import { MessageService } from './../message/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { userCourses } from './../Models/userCourses';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit  {
  courses : userCourses[]=[];
  displayedColumns: string[] = ['name', 'numberTopics', 'numberPosts', 'date_modif'];
  datasource= new MatTableDataSource<userCourses>();

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private userCoursesService : MessageService) { }
  

  ngOnInit(): void {
    this.userCoursesService.sendMessage("userCourses",null).subscribe(result=>{
      this.courses=result.data;
      this.datasource.data=this.courses;
      this.datasource.paginator = this.paginator;
      this.datasource.sort=this.sort;
    });
  }

}
