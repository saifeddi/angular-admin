import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService  extends RestService {

  endpoint = `${environment.api}/permissions`;
  
}
