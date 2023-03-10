import { PostsComponent } from './posts/posts.component';
import { TopicsComponent } from './topics/topics.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path : '', component : undefined ,canActivateChild: [AuthGuard],children : [
    {path : 'courses' ,component : CoursesComponent},
    {path : 'topics/:id' , component : TopicsComponent},
  ]},
  {path : 'login' ,component : LoginComponent},
  // {path : 'courses' ,component : CoursesComponent},
  // {path : 'topics/:id' , component : TopicsComponent},
  {path : 'posts/:id' , component : PostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
