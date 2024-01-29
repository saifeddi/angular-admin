import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form:FormGroup ;
  roles:Role[];
  user_id:number;
  user:User
  constructor(private roleService:RoleService,
    private formBuilder: FormBuilder,
    private userService: UserService , 
    private router: Router,
    private activatedRoute : ActivatedRoute
    ) { }
  ngOnInit(): void {
   this.user_id =  this.activatedRoute.snapshot.params.id
   
     
    this.form = this.formBuilder.group({
      first_name:'',
      last_name:'',
      email:'',
      role_id:''
    })
    this.roleService.all()
                    .subscribe(
                      res=> this.roles = res,
                       
                      
                    )

                    this.userService.find(this.user_id)
                    .subscribe(
                      user=>  this.form.patchValue({
                        first_name:user.first_name,
                        last_name:user.last_name,
                        email:user.email,
                        role_id:user.role.id
                      })
                    )
  }
  update()
  {
    this.userService.update(this.form.getRawValue() , this.user_id)
                    .subscribe(user=> this.router.navigate(["/users"])
                    )
  }

}
