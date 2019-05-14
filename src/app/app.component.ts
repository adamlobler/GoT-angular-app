import { Component, OnInit } from '@angular/core';
import { character } from './character.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  characters: character[];
constructor( private dataServie: DataService) {

}
ngOnInit() {
  return this.dataServie.getCharacters()
    .subscribe(data => this.characters = data);
}
}
