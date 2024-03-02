import { Component } from '@angular/core';
import { ImageService } from 'services/image.service';
import { Item } from 'models/data';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {

  color: string = "#6d6eb5";
  radius: number = 100;
//------------------------------
  items: Item[] = [];
  categoryFiltered: Item[] = [];
  selectedCategory: string = ''; 
//-------------------------------
  constructor(private imageService: ImageService){ }

  ngOnInit(): void {
    this.getImages(); 
  } 
  getImages() {
    this.imageService.getImages().subscribe(
      (data) => {
        this.items = data;
        this.categoryFiltered = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //---------------------------------------------
  onSearch(searchText: string) {   
    if (searchText) {
      this.items = this.items.filter(item =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
      );   
    } else {
      this.getImages();  
      // this.onCategoryChanged(this.selectedCategory); 
      // this.selectedCategory = ''; 
    }
  }
 //----------------------------------------------------------
  onCategoryChanged(selectedCategory: string) {
    if (!selectedCategory) {
      this.items = this.categoryFiltered;
    } else {
      this.items = this.categoryFiltered.filter((item) =>
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  }
  
}


