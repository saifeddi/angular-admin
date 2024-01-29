import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    ) { }
  users :User[]= []
   lastPage:number ;
  ngOnInit(): void {
    this.load()
  }
  load(page = 1)
  {
    this.userService.all(page).subscribe( res=>{ 
        this.lastPage = res.meta.last_page
      this.users = res?.data})
  }

  delete(user:User)
   {
     if( confirm("Do you sure to delete this user ?")){
          this.userService.delete(user)
                          .subscribe(
                            res=>{
                              this.users = this.users.filter(
                                (u)=> u.id !== user.id
                               
                              )
                              
                            }
                          )
     }
    
    
   }

}
