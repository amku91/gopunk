import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * @name NavbarComponent
 * @description Created to show common header across all pages
 * @author Amit Kumar
 */
export class NavbarComponent implements OnInit {
  public appTitle: string;
  constructor() { }

  ngOnInit() {
    this.appTitle = "Gopunk";
  }
}
