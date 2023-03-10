import { BreadcrumbData } from './../breadcrumb/breadcrumb.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Topic } from './../Models/topic';
import { MessageService } from './../message/message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  id : number;
  topics : Topic[];
  breadCrumb : BreadcrumbData[] = [] ;

  displayedColumns : string[] = ["name","numberPosts","date_modif"];
  datasource =new  MatTableDataSource<Topic>(); 

  @ViewChild(MatSort) matsort :MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private route : ActivatedRoute,private courseTopicsService : MessageService,private router: Router) { }

  ngOnInit(): void {
    this.breadCrumb.push({nom : "Tous les cours" , route : "/courses"});

    this.id=this.route.snapshot.params["id"];
    this.courseTopicsService.sendMessage("courseTopics",{ "id" : this.id }).subscribe(result=>{
      if(result.status=="error")
        this.router.navigateByUrl("/login");
      this.topics = result.data;
      this.datasource.data=this.topics;
      this.datasource.sort=this.matsort;
      this.datasource.paginator=this.paginator;
      if(result.data.length>0)
        this.breadCrumb.push({nom : result.data[0].course , route : ""})
      console.log(this.breadCrumb)
    })
  }
  onNewTopic(newTopic : Topic){
    this.topics.unshift({id : newTopic.id,name : newTopic.name,numberPosts : newTopic.numberPosts,course : newTopic.course,date_modif : newTopic.date_modif});
    this.datasource.data=this.topics;
  }
}
