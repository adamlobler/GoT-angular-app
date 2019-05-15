import { Component, OnInit } from "@angular/core";
import { character } from "./character.model";
import { DataService } from "../data.service";
import { House } from '../house/house.model';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.css"]
})
export class CharacterComponent implements OnInit {
  characters: character[];
  itemsPerPage: number;
  totalItems: any;
  page: 3;
  previousPage: any;
  selectedCharacter: character;

  selectedSpouse: character;
  spouseSelected: boolean;

  selectedAllegiances: House[];
  allegianceSelected: boolean;

  constructor(private DataService: DataService,private http: HttpClient) {}

  ngOnInit() {
    return this.DataService.getCharacters(this.page).subscribe(
      data => (this.characters = data)
    );
  }

  onSelect(character: character): void {
    this.selectedCharacter = character;

    const spouseUrl = this.selectedCharacter.spouse;
    console.log("Spouse:" + spouseUrl);
    if (spouseUrl.length !== 0) {
    this.DataService.getCharacter(spouseUrl).subscribe(
      (data:character) => (this.selectedSpouse = data));
    } else {
      this.selectedSpouse = character;
      this.selectedSpouse.name = "";
      console.log(this.selectedSpouse);

    }
    console.log("Allegiances:")
    console.log(this.selectedCharacter.allegiances);
    const allegianceArray = this.selectedCharacter.allegiances;
    allegianceArray.forEach(houseUrl => {
      this.DataService.getHouse(houseUrl).subscribe(
        (data) => (this.selectedAllegiances.push(data))
      )
    }
    );
    console.log("SELECTED ALLEGIANCES:")
    console.log(this.selectedAllegiances)

    /*
    console.log(this.selectedCharacter);
    const allegiancesUrl:string[] = this.selectedCharacter.allegiances;
    //console.log(allegiancesUrl);

    for (let index = 0; index < allegiancesUrl.length; index++) {
      const element = allegiancesUrl[index];
      console.log(index +". Element: " + element);
      this.http.get<House>(element).subscribe(
        data => (this.selectedAllegiances.push(data))
      );
    }
    console.log("This is wrong:");
    console.log(this.selectedAllegiances[0]);*/
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
