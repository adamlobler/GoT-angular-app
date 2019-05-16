import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { character } from "./character/character.model";
import { Book } from "./books/book.model";
import { House } from "./house/house.model";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  //root URL of the api
  apiUrl = "https://www.anapioficeandfire.com/api";

  constructor(private http: HttpClient) {}

  // Get characters throw http
  getCharacters(page) {
    let params = new HttpParams().set("pageSize", "10").set("page", page);
    return this.http
      .get<character[]>(this.apiUrl + "/characters", { params })
      .pipe(catchError(this.handleError));
  }

  getCharacter(URL) {
    return this.http.get<character>(URL).pipe(catchError(this.handleError));
  }

  // Get books throw http
  getBooks(page) {
    let params = new HttpParams().set("pageSize", "12").set("page", page);
    return this.http
      .get<Book[]>(this.apiUrl + "/books", { params })
      .pipe(catchError(this.handleError));
  }

  getBook(URL) {
    return this.http.get<Book>(URL).pipe(catchError(this.handleError));
  }

  // Get houses throw http
  getHouses(page) {
    let params = new HttpParams().set("pageSize", "10").set("page", page);
    return this.http
      .get<House[]>(this.apiUrl + "/houses", { params })
      .pipe(catchError(this.handleError));
  }

  getHouse(URL) {
    return this.http.get<House>(URL).pipe(catchError(this.handleError));
  }

  //ERROR HANDLING
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
