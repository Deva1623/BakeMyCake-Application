import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {

@Output() categoryChanged = new EventEmitter<string>(); 

categories: string[] = ['cakes', 'cupcakes', 'brownies', 'cookies'];
selectedCategory: string = '';

onCategoryChange(){
  this.categoryChanged.emit(this.selectedCategory);
}


}
