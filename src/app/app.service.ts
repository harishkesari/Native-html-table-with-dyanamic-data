import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStatusModel } from './models/user_status_update.model';

@Injectable()
export class AppService {

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  postStatus(object: UserStatusModel) {
    return this.http.post('/api/submit', object, this.httpOptions);
  }

  getData() {
    return this.http.get('./assets/data/sample_data.json');
  }
}

