import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() taskData: string;
  public searchInput = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(search) {
      this.searchInput = search;
  }
}
