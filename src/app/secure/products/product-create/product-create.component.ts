import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form:FormGroup
  constructor(private formBuilder:FormBuilder , private productService:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:"",
      description:"",
      image:"",
      price:""
    })
  }
 submit()
 {
  this.productService.save(this.form.getRawValue())
                      .subscribe(res=> this.router.navigate(["/products"]))
 }
}
