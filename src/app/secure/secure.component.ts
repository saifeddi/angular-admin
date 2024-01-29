import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';
import { Auth } from '../classes/auth';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
       res=> {        
        this.user = res 
      Auth.userEmitter.emit(this.user)
      }
       ,
       erro => this.router.navigate(['/login'])
       
     );
  }

}
