import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {
  abstract get endpoint(): string;
  
  constructor(protected http:HttpClient) { }

  all(page=null):Observable<any> {
    let url = this.endpoint;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get(url);
   }
  delete(id)
  {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }
  save(data)
  {
    return this.http.post(`${this.endpoint}`,data)
  }
  find(id:number):Observable<any>
  {
    return this.http.get(`${this.endpoint}/${id}`)
  }
  update(data , id)
  {
     
    return this.http.put(`${this.endpoint}/${id}`,data)
  }
}
