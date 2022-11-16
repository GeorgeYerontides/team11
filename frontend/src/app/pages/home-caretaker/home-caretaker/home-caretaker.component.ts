import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/global/models/user/user.model';

@Component({
  selector: 'app-home-caretaker',
  templateUrl: './home-caretaker.component.html',
  styleUrls: ['./home-caretaker.component.scss']
})
export class HomeCaretakerComponent implements OnInit {
  users: User[] = [
    new User("Andread Mixahl", 1000),
    new User("Dimitris Papa", 2000),
    new User("Giorgos Trifonos", 3000),
    new User("Kostas Lamprou", 4000)

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
