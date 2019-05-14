import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = "https://www.anapioficeandfire.com/api";
  page = 1;
  constructor(private http: HttpClient) { }

  getCharacters() {
    let params = new HttpParams().set('pageSize', '50')
    .set('page', this.page.toString());
    return this.http.get<character[]>(this.apiUrl + '/characters', {params});
  }
}
