import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    infoForm:FormGroup;
    passwordForm :FormGroup ;
  constructor( private formBuilder: FormBuilder,
    private authService:AuthService) { }

  ngOnInit(): void {
   let user :User ;
   Auth.userEmitter.subscribe(res=> user = res)
   console.log(user);
   
    this.infoForm = this.formBuilder.group({
      first_name:user?.first_name,
      last_name:'',
      email:''
    }),
    this.passwordForm = this.formBuilder.group({
      password:'',
      password_confirm:'',
     
    })

    Auth.userEmitter.subscribe(
      user => {this.infoForm.patchValue(user) }
    )
  }
  chargeUser()
  {
      
  }
  updateInfo()
  {
    this.authService.updateInfo(this.infoForm.getRawValue())
                      .subscribe(
                        res=>{                          
                          Auth.userEmitter.emit(res)
                         },
                        err=>{}
                      );
    
  }
  updatePassword()
  {
    this.authService.updatePassword(this.passwordForm.getRawValue())
                      .subscribe(
                        res=>{
                          console.log(res);
                          
                        },
                        err=>{
                          console.log(err);
                          
                        }
                      );
    
  }
}
