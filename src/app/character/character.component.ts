import { Component, OnInit } from '@angular/core';
import { character } from '../character.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters: character[];
constructor( private dataServie: DataService) {

}
ngOnInit() {
  return this.dataServie.getCharacters()
    .subscribe(data => this.characters = data);
}
}
