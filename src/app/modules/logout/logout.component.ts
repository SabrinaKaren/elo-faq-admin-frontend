import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/context.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private context: ContextService
  ) { }

  ngOnInit(): void {
    this.context.logout();
  }

}