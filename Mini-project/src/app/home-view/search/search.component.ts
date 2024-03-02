import { OnInit,Component } from '@angular/core';
import { Output,EventEmitter } from '@angular/core'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  
  ngOnInit(): void {
  }
   
  search(){
    this.searchEvent.emit(this.searchText);
    console.log(this.searchText);
  }

}
