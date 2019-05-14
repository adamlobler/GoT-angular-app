import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { character } from "./character/character.model";
import { Book } from "./books/book.model";
import { House } from "./house/house.model";

@Injectable({
  providedIn: "root"
})
export class DataService {
  apiUrl = "https://www.anapioficeandfire.com/api";
  constructor(private http: HttpClient) {}

  getCharacters(page) {
    let params = new HttpParams().set("pageSize", "10").set("page", page);
    return this.http.get<character[]>(this.apiUrl + "/characters", { params });
  }

  getBooks(page) {
    let params = new HttpParams().set("pageSize", "12").set("page", page);
    return this.http.get<Book[]>(this.apiUrl + "/books", { params });
  }

  getHouses(page) {
    let params = new HttpParams().set("pageSize", "10").set("page", page);
    return this.http.get<House[]>(this.apiUrl + "/houses", { params });
  }
}
