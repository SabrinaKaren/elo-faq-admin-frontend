import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})
export class PrimaryButtonComponent implements OnInit {

  @Input() label!: string;
  @Output() clickEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onClick(): void {
    this.clickEmitter.emit();
  }

}