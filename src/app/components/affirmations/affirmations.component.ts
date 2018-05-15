import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-affirmations',
  templateUrl: './affirmations.component.html',
  styleUrls: ['./affirmations.component.css']
})
export class AffirmationsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  isNewlyAdded: boolean = false;
  activeItemId: string;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  activate(item: Item) {
    
        if(this.activeItemId != item.id) {
          if(this.isNewlyAdded) {
    
            if(confirm("Are you sure to delete " + this.activeItemId)) {
              var itemToDelete = this.items.filter(x => x.id === this.activeItemId)[0];
              this.deleteItem(itemToDelete);
              this.isNewlyAdded = false;
            }
            else {
              return;
            }
    
            // let dialogRef = this.dialog.open(UserProfileComponent, {
            //   height: '400px',
            //   width: '600px',
            // });
          }
          this.activeItemId = item.id;
          this.clearState();
        }
      }

  addItem() {
    var item: Item = {
      title: '',
      content: '',
      style: ''
    }

    this.itemService.addItem(item).then( (doc: Item) =>{
      this.isNewlyAdded = true;
      this.editState = true;
      this.activeItemId = doc.id;
    });
  }

  deleteItem(item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(item: Item){
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

}
