import { Component, OnInit } from "@angular/core";
import { character } from "./character.model";
import { DataService } from "../data.service";

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

  constructor(private CharacterService: DataService) {}

  ngOnInit() {
    return this.CharacterService.getCharacters(this.page).subscribe(
      data => (this.characters = data)
    );
  }

  onSelect(character: character): void {
    this.selectedCharacter = character;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.CharacterService.getCharacters(this.page).subscribe(
        data => (this.characters = data)
      );
    }
  }
}
