import { Role } from './../../../interfaces/role';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form:FormGroup ;
  roles:Role[];
  constructor(private roleService:RoleService,
    private formBuilder: FormBuilder,
    private userService: UserService , 
    private router: Router,
    ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name:'',
      last_name:'',
      email:'',
      role_id:''
    })
    this.roleService.all()
                    .subscribe(
                      res=> this.roles = res,
                      err=> console.log(err,"fffff")
                      
                      
                    )
  }
  submit()
  {
    console.log(this.form.getRawValue());
    this.userService.save(this.form.getRawValue())
                    .subscribe(user=>this.router.navigate(['/users'])
                    )
  }

}
