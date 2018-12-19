/**Angular Libs Section */
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app.routing';

/**Import Google Material Libs Section */
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

/**App Common/Entrypoint Component Section */
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

/**Env/Config Section */
import { environment } from '../environments/environment';

/**App Custom Component */
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
