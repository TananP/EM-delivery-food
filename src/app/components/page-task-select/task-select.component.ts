import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-select',
  templateUrl: './task-select.component.html',
  styleUrls: ['./task-select.component.scss']
})
export class TaskSelectComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}
  saveData(task: string){
    localStorage.setItem('task', task);
  }

}
