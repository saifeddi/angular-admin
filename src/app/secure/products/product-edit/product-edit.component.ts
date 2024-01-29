import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  form:FormGroup
  product_id:number;
  constructor(private formBuilder:FormBuilder , private productService:ProductService , 
    private router:Router, private activaRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:"",
      description:"",
      image:"",
      price:""
    })
    this.product_id = this.activaRoute.snapshot.params.id;
    this.productService.find(this.product_id).subscribe(
    
    product=> this.form.patchValue(product)
    )
  }
 submit()
 {
  this.productService.update(this.form.getRawValue() , this.product_id)
                      .subscribe(res=> this.router.navigate(["/products"]))
 }

}
