import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  page: number = 1;
  lastPage: number;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.load()
  }
  load(page:number = 1) { 
    this.productService.all(page).subscribe(res => {
      this.lastPage = res.meta.last_page
      this.products = res?.data
    })
  }
  delete(product_id) {
    if (confirm("Do you sure to delete this user ?")) {
      this.productService.delete(product_id)
        .subscribe(
          res => {
            this.products = this.products.filter(
              (p) => p.id !== product_id

            )
 
          }
        )
    }
  }
 
}
