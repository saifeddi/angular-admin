import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles:any=[];
  constructor(private roleService : RoleService) { }

  ngOnInit(): void {
    this.roleService.all()
                    .subscribe(res=> this.roles = res)
  }
  delete(role_id)
  {
    if( confirm("Do you sure to delete this role ?")){
      this.roleService.delete(role_id)
                      .subscribe(
                        res=>{
                          this.roles = this.roles.filter(
                            (role)=> role.id !== role_id
                           
                          )
                          
                        }
                      )
 }
    
  }

}
