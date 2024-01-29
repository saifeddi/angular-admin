import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('tableState', [
      state('show', style({
        maxHeight: '150px'
      })),
      state('hide', style({
        maxHeight: 0
      })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ])
  ]
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []
  page: number = 1;
  lastPage: number;
  selected_id = 0 ;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.load()
  }
  load(page:number = 1) { 
    this.orderService.all(page).subscribe(res => {
      this.lastPage = res.meta.last_page
      this.orders = res?.data
    })
  }
  select(order_id)
  {
    this.selected_id = (this.selected_id == order_id) ? 0 : order_id ;
  }
  itemState(id: number): string {
    return this.selected_id === id ? 'show' : 'hide';
  }
  export()
  {
    this.orderService.export().subscribe(
      res => {
        const blob = new Blob([res], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
      }
    );
  }
}
