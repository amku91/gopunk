import { Component, OnInit } from '@angular/core';

/**Import Custom Services */
import { ContextService } from '../../services/context.service';
import { PunkService } from '../../services/punk/punk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appContext: ContextService, private punkService: PunkService) { }

  ngOnInit() {
  }

}
