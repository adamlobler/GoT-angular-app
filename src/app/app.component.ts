import { Component, OnInit } from "@angular/core";
import { character } from "./character/character.model";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  characters: character[];
  constructor(private CharacterService: DataService) {}
  ngOnInit() {
    return this.CharacterService.getCharacters(0).subscribe(
      data => (this.characters = data)
    );
  }
}
