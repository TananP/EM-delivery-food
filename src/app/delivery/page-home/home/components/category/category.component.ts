import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryMerchantService } from 'src/app/services/category-merchant.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() taskData: string;
  @Output() selectedCategory = new EventEmitter();

  // public top = false;
  // public bottom = true;
  public activeCategory = null;
  public loading = true;
  public loadingError = false;

  public categoryList: any;
  constructor(private route: ActivatedRoute , private categoryAPI: CategoryMerchantService) {}

  ngOnInit(): void {
    // Call API get category
    this.categoryAPI.getMerchantCategory().subscribe( x => {
      this.categoryList = x;
      // console.log(this.categoryList);
      this.categoryList.unshift({categoryId: 0, categoryName: 'All restaurants' ,  imagePath: ''});
      this.loading = false;
    }, error => {
      this.loading = false;
      this.loadingError = true;
    });
  }
  categorySelect(category){
    this.activeCategory = category;
    this.selectedCategory.emit(category.categoryId);
  }
}
