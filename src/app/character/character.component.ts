import { Component, OnInit } from "@angular/core";
import { character } from "./character.model";
import { DataService } from "../data.service";
import { House } from "../house/house.model";
import { HttpClient } from "@angular/common/http";
import { Book } from "../books/book.model";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["../app.component.css"]
})
export class CharacterComponent implements OnInit {
  characters: character[];
  itemsPerPage: number;
  totalItems: any;
  page: 1;
  previousPage: any;
  selectedCharacter: character;

  selectedSpouse: character;
  spouseSelected: boolean;

  selectedAllegiances: House[];
  allegianceSelected: boolean;

  selectedBooks: Book[];
  //bookSelected: boolean;

  selectedPovBooks: Book[];

  constructor(private DataService: DataService, private http: HttpClient) {
    this.selectedAllegiances = new Array();
    this.selectedBooks = new Array();
    this.selectedPovBooks = new Array();
  }

  ngOnInit() {
    return this.DataService.getCharacters(this.page).subscribe(
      data => (this.characters = data)
    );
  }

  addItem(item, list) {
    list.push(item);
  }

  onSelect(character: character): void {
    this.selectedCharacter = character;
    this.selectedAllegiances = new Array();
    this.selectedBooks = new Array();
    this.selectedPovBooks = new Array();
    // GET THE SPOUSE
    const spouseUrl = this.selectedCharacter.spouse;
    console.log("Spouse:" + spouseUrl);
    // if selected character has a spouse -> add
    if (spouseUrl.length !== 0) {
      this.DataService.getCharacter(spouseUrl).subscribe(
        (data: character) => (this.selectedSpouse = data)
      );
      // if selected character doesn't have a spouse -> remove name
    } else {
      this.selectedSpouse.name = "";
      console.log(this.selectedSpouse);
    }
    //console.log("Allegiances:");
    //console.log(this.selectedCharacter.allegiances);
    // GET THE ALLEGIANCES
    const allegianceArray = this.selectedCharacter.allegiances;
    allegianceArray.forEach(houseUrl => {
      this.DataService.getHouse(houseUrl).subscribe(data =>
        this.addItem(data, this.selectedAllegiances)
      );
    });

    // GET THE BOOKS
    const bookArray = this.selectedCharacter.books;
    bookArray.forEach(bookUrl => {
      this.DataService.getBook(bookUrl).subscribe(data =>
        this.addItem(data, this.selectedBooks)
      );
    });

    // GET THE POVBOOKS
    const povBookArray = this.selectedCharacter.povBooks;
    povBookArray.forEach(povBookUrl => {
      this.DataService.getBook(povBookUrl).subscribe(data =>
        this.addItem(data, this.selectedPovBooks)
      );
    });
  }

  onSpouseSelect(): void {
    this.spouseSelected = !this.spouseSelected;
  }

  onAllegianceSelect(): void {
    this.allegianceSelected = !this.allegianceSelected;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.DataService.getCharacters(this.page).subscribe(
        data => (this.characters = data)
      );
    }
  }
}
