import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ClientComponent } from './client/client.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ClientComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

}
