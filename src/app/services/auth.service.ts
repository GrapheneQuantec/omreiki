import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';

@Injectable()
export class CustomAuthService {
  itemsCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(public afs: AngularFirestore) { 
    //this.items = this.afs.collection('items').valueChanges();

    this.afs.firestore.settings({timestampsInSnapshots: true});

    this.itemsCollection = this.afs.collection('users');

    this.users = this.itemsCollection.valueChanges();
  }

  getUsers(){
    return this.users;
  }

}

