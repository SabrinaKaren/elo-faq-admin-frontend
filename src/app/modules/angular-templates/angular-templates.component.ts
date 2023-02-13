import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-templates',
  templateUrl: './angular-templates.component.html',
  styleUrls: ['./angular-templates.component.css']
})
export class AngularTemplatesComponent implements OnInit {

  name = 'Eduardo';
  imgUrl = 'https://elogroup.com.br/wp-content/uploads/2021/08/Logo-2.svg?quality=80';

  constructor() { }

  ngOnInit(): void { }

  onSave(): void {
    alert('Event binding... simples né!?');
  }

  outputClicked() {
    alert('@Output... simples né!?');
  }

}