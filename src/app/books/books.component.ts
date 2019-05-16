import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { DataService } from "../data.service";
import { character } from "../character/character.model";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["../app.component.css"]
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;
  previousPage: any;
  page: 1;
  selectedCharacters: character[];

  constructor(private DataService: DataService) {
    this.selectedCharacters = new Array();
  }

  ngOnInit() {
    return this.DataService.getBooks(this.page).subscribe(
      data => (this.books = data)
    );
  }

  onSelect(Book: Book): void {
    this.selectedCharacters = new Array();
    this.selectedBook = Book;
    const characterArray = this.selectedBook.characters;
    characterArray.forEach(characterUrl => {
      this.DataService.getCharacter(characterUrl).subscribe(data =>
        this.selectedCharacters.push(data)
      );
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.DataService.getBooks(this.page).subscribe(
        data => (this.books = data)
      );
    }
  }
}
