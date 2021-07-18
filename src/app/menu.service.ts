import { Injectable } from '@angular/core';
import { MenuItem } from './menuItem.model';
import { Topping } from './topping.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


constructor(private database: AngularFirestore) { }
private menu: any = [];
private liveMenu: any = [];
private menuUpdated = new Subject<any[]>();
categories: Array<{name: string, sizes: Array<string>}> = [];

fetchMenu() {
  this.database.collection(environment.menu, ref => ref.orderBy('id')).get().toPromise().then( querySnapshot => {
    querySnapshot.forEach( doc => {
      this.menu.push(doc.data());
      this.menu[this.menu.length - 1].firebaseId = doc.id;
      // console.log(doc.id, ' => ', doc.data());
    });
  });
}

getLiveMenu() {
    let menuBuffer = [];
    this.database.collection(environment.menu, ref => ref.orderBy('id')).snapshotChanges().subscribe( data => {
      menuBuffer = [];
      data.map( a => {
        // tslint:disable-next-line: no-shadowed-variable
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        menuBuffer.push(data);
        menuBuffer[menuBuffer.length - 1].firebaseId = id;
      });
      this.liveMenu = menuBuffer;
      this.menuUpdated.next(this.liveMenu);
    }, error => {
      // console.log(error);
    });
}
getLiveMenuListener() {
  return this.menuUpdated.asObservable();
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

  reset() {
    this.menu = [];
    this.categories = [];
    this.toppings = [];
  }

  changeMenuItem(firebaseId, data) {
    this.database.collection(environment.menu).doc(firebaseId).update({
      name: data.name,
      category: data.category,
      isActive: data.isActive,
      toppings: data.toppings,
      sizes: data.sizes,
      isNew: data.isNew,
      type: data.type
    });
  }

  addNewPosition(data: any) {
    let id = this.menu.length + 1;
    data.id = id;
    this.database.collection(environment.menu).add(data).then(response => {
      console.log(response);
    });
  }

  movePositionUp(firebaseId: string, targetFirebaseId: string, newId: number): Observable<boolean> {
    let status = new Subject<boolean>();
    let status$ = status.asObservable();
    this.database.collection(environment.menu).doc(firebaseId).update({id: newId-1}).then(() => {
      this.database.collection(environment.menu).doc(targetFirebaseId).update({id: newId});
      console.log(firebaseId, targetFirebaseId, newId);
      status.next(true);
    });
    return status$;
  }

  movePositionDown(firebaseId: string, targetFirebaseId: string, newId: number): Observable<boolean> {
    let status = new Subject<boolean>();
    let status$ = status.asObservable();
    this.database.collection(environment.menu).doc(firebaseId).update({id: newId+1}).then(() => {
      this.database.collection(environment.menu).doc(targetFirebaseId).update({id: newId});
      console.log(firebaseId, targetFirebaseId, newId);
      status.next(true);
    });
    return status$;
  }
}
