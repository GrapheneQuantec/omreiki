import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item'; 

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    title: '',
    content:''
  }

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('oto ja');
    
    if(this.item.title != '' && this.item.content != ''){
      console.log('jestem');
      this.itemService.addItem(this.item);
      this.item.title = '';
      this.item.content = '';
    }
  }

}
