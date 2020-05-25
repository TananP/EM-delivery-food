import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryMerchantService } from 'src/app/services/category-merchant.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() taskData: string;
  public top = false;
  public bottom = true;

  public categoryList: any;
  constructor(private route: ActivatedRoute , private categoryAPI: CategoryMerchantService) {}

  ngOnInit(): void {
    // this.categoryList = [ 'Desserts' , 'Drink' , 'Snack' , 'Seafood' , 'Thai'];
    // Call API get category
    this.categoryAPI.getMerchantCategory().subscribe( x => {
      this.categoryList = x;
    });
  }
}
