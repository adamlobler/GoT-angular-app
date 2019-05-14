import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { DataService } from "../data.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;
  previousPage: any;
  page: 1;

  constructor(private BookService: DataService) {}

  ngOnInit() {
    return this.BookService.getBooks(this.page).subscribe(
      data => (this.books = data)
    );
  }

  onSelect(Book: Book): void {
    this.selectedBook = Book;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.BookService.getBooks(this.page).subscribe(
        data => (this.books = data)
      );
    }
  }
}
