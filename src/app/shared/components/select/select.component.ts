import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() labelName: string = '';
  @Input() options: Array<any> = [];
  @Input() selectedOptionNumber: number = 0;

  selectedOption: any = null;

  OnInit() {
    console.log(this.selectedOption);
    console.log(this.options);
  }

  ngOnInit() {
    this.selectedOption = this.options[this.selectedOptionNumber];
    console.log(this.selectedOption);
    console.log(this.options);
  }

}
