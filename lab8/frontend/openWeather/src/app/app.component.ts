import { Component } from '@angular/core';

declare var paulFunc: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openWeather';

  // onClick(){
  //   paulFunc();
  // }
}
