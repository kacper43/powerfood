import { Injectable } from '@angular/core';
import { MenuItem } from './menuItem.model';
import { Topping } from './topping.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


constructor(private database: AngularFirestore) { }
private menu: any = [];
categories: Array<{name: string, sizes: Array<string>}> = [];

fetchMenu() {
  this.database.collection('menu').get().toPromise().then( querySnapshot => {
    querySnapshot.forEach( doc => {
      this.menu.push(doc.data());
      this.menu[this.menu.length - 1].id = doc.id;
      // console.log(doc.id, ' => ', doc.data());
    });
  });
  // console.log(this.menu);

}
// tslint:disable-next-line: member-ordering
private toppings: Topping[] = [
];

  fetchToppings() {
    let topping: any;
    this.toppings = [];
    this.database.collection('toppings').get().toPromise().then( querySnapshot => {
      querySnapshot.forEach( doc => {
        topping = doc.data();
        this.toppings.push({
          name: topping.name,
          sizes: topping.sizes
        });
      });
    });
  }

  addTopping(toppingName: string, toppingSizes: Array<{size: string, price: number}>) {
    this.database.collection('toppings').add({
      name: toppingName,
      sizes: toppingSizes
    });
  }

  addCategory(catName: string, catSizes: Array<string>) {
    this.database.collection('categories').add({
      name: catName,
      sizes: catSizes
    });
  }

  fetchCategories() {
    let cat: any;
    this.categories = [];
    this.database.collection('categories').get().toPromise().then( querySnapshot => {
      querySnapshot.forEach( doc => {
        cat = doc.data();
        this.categories.push({
          name: cat.name,
          sizes: cat.sizes
        });
      });
    });
  }

  getMenu() {
    return this.menu;
  }

  getToppings() {
    return this.toppings;
  }

  deletePosition(id) {
    // deleting position via firebase
  }
  getCategories() {
    return this.categories;
  }

}
