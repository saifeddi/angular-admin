import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { Role } from 'src/app/interfaces/role';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  form:FormGroup ;
  permissions:Permission[]=[];
  role_id:number;
  role : Role ;
  ourPermissions :Number[] = []; 
  constructor(private formBuilder:FormBuilder ,
              private permissionService:PermissionService ,
              private roleService: RoleService ,
              private router :Router,
              private activatedRoute : ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:"",
      permissions : this.formBuilder.array([])
    })
    this.role_id =  this.activatedRoute.snapshot.params.id ;
    
  this.roleService.find(this.role_id)
                  .subscribe(
                    role=> {
                      this.ourPermissions = role.permissions.map(p=>p.id)
                      this.form.patchValue({
                        name:role.name,
                        
                      })
                      
                    }
  );
    
    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissions.forEach(p => {
          console.log();
          
          this.permissionArray.push(
            this.formBuilder.group({
              value: this.ourPermissions.includes(p.id),
              id: p.id
            })
          );
        });
      }
    );
  }
  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }
  save()
  {
     
    let formData = this.form.getRawValue() ;
    const Data =  {
      name : formData.name ,
      permissions : formData.permissions.filter(permission => permission.value === true ).map(p => p.id)
    }
    this.roleService.update(Data , this.role_id).subscribe(
      res=> this.router.navigate(["/roles"])
      
    )
    
  }

}
