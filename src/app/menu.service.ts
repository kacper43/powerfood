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
fetchMenu() {
  this.database.collection('menu').get().toPromise().then( querySnapshot => {
    querySnapshot.forEach( doc => {
      this.menu.push(doc.data());
      this.menu[this.menu.length - 1].id = doc.id;
      console.log(doc.id, ' => ', doc.data());
    })
  })
  console.log(this.menu);

}
// tslint:disable-next-line: member-ordering
private toppings: Topping[] = [
  {
    id: 1,
    name: 'pieczarki',
    sizes: [
      {
        size: '30cm',
        price: 3
      },
      {
        size: '40cm',
        price: 4
      },
      {
        size: '50cm',
        price: 5
      }
    ]
  },
  {
    id: 2,
    name: 'pomidor',
    sizes: [
      {
        size: '30cm',
        price: 3
      },
      {
        size: '40cm',
        price: 4
      },
      {
        size: '50cm',
        price: 5
      }
    ]
  },
  {
    id: 3,
    name: 'szynka',
    sizes: [
      {
        size: '30cm',
        price: 4
      },
      {
        size: '40cm',
        price: 5
      },
      {
        size: '50cm',
        price: 6
      }
    ]
  },
  {
    id: 3,
    name: 'rukola',
    sizes: [
      {
        size: '30cm',
        price: 2
      },
      {
        size: '40cm',
        price: 3
      },
      {
        size: '50cm',
        price: 4
      },
      {
        size: '500ml',
        price: 2
      }
    ]
  }
];

categories: Array<{id: number, name: string, sizes: Array<string>}> = [
  {
    id: 1,
    name: 'Pizza',
    sizes: ['30cm', '40cm', '50cm']
  },
  {
    id: 2,
    name: 'Makarony',
    sizes: ['500ml']
  },
  {
    id: 3,
    name: 'Sosy i napoje',
    sizes: ['80ml', '0,33L', '0,85L']
  },
];

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
