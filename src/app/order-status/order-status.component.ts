import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  id: any;
  dataFromDb: any;
  status: any;
  constructor(private route: ActivatedRoute, private database: AngularFirestore) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.database.collection('orders').doc(this.id).valueChanges().subscribe( data => {
      this.dataFromDb = data;
      this.status = this.dataFromDb.orderStatus;
      // console.log(this.status);
    });
  }


}
