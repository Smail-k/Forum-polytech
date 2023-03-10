import { Post } from './../Models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from './../message/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts : Post[];
  constructor(private messageService : MessageService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.messageService.sendMessage("topicPosts",{ id : this.route.snapshot.params["id"]}).subscribe(result=>{
      if(result.status=="error")
        this.router.navigateByUrl("/login");
      this.posts=result.data;
    })
  }

}
