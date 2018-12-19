import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
/**Custom Component */
import { HomeComponent } from './components/home/home.component';



export const routes: Routes =[
    { path: 'home', component: HomeComponent },
    { path: '',redirectTo: 'home', pathMatch: 'full'},
    { path: "**",redirectTo:"home"}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })/**Make useHash false if you want to serve app without hash url's */
  ],
  exports: [
  ],
})
export class AppRoutingModule { }