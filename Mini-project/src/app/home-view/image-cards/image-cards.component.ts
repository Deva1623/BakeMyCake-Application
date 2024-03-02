import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'models/data';
// import { ImageService } from 'services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-cards',
  templateUrl: './image-cards.component.html',
  styleUrls: ['./image-cards.component.css']
})
export class ImageCardsComponent  {
  @Input()  item: Item;
  selectedItem: Item;

 

  constructor(private router: Router) {}

  redirectToOrderView() {     
    this.router.navigate([`/order-view/${this.item.id}`], { state: { item: this.item } });
  }
}
//state = additinal info throgh route //activateRoute disply recievied info and may take some actions





















// import { Component,OnInit } from '@angular/core';
// import { ImageService } from 'services/image.service';
// @Component({
//   selector: 'app-image-cards',
//   templateUrl: './image-cards.component.html',
//   styleUrls: ['./image-cards.component.css']
// })
// export class ImageCardsComponent {
//   images: any[] = [];
//   constructor(private imageService: ImageService){}

//   ngOnInit(): void {
//     this.imageService.getImages().subscribe(data => {
//       console.log(data); 
//       this.images = data.data;
//     });
// }
// }











/* {
    "data": [
        {
            "image":"Berries Summer Cupcakes.jpg"  
        },
        {
            "image":"Brownies Different Flavor"
        },
        {
            "image":"Butter Cookies"
        },
        {
            "image":"Cherry Jelly Cheesecake"
        }, 
        {
            "image":"Chocolate Blueberries Cake"
        },
        {
            "image":"Chocolate Bonbons"
        },
        {
            "image":"Chocolate Cookies"
        },
        {
            "image":"Chocolate Cupcake"
        }, 
        {
            "image":"Chocolate Summer Berries"
        },
        {
            "image":"Classic Cheesecake"
        },
        {
            "image":"Cookies Cream Cake"
        },
        {
            "image":"Easter Cupcakes"
        }, 
        {
            "image":"Fruit Cake"
        },
        {
            "image":"Isometric chocolate brownies"
        },
        {
            "image":"Monster Theme Cake"
        },
        {
            "image":"Muffin Devil Horns"
        },
        {
            "image":"Muffin Ghost"
        },
        {
            "image":"Pumpkin Spice Cupcakes"
        }
    ]
}*/