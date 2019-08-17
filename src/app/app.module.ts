import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { KeysPipe } from './pipe/key_transform.pipe';

@NgModule({
  declarations:
    [
      KeysPipe,
      AppComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
    ]),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
