import { Component } from '@angular/core';

import { User } from './global/models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  users: User[] = [
    new User("Andread Mixahl", 1000),
    new User("Dimitris Papa", 2000),
    new User("Giorgos Trifonos", 3000),
    new User("Kostas Lamprou", 4000)

  ]
}
