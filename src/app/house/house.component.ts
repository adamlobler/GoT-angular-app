import { Component, OnInit } from "@angular/core";
import { House } from "./house.model";
import { DataService } from "../data.service";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["../app.component.css"]
})
export class HouseComponent implements OnInit {
  Houses: House[];
  selectedHouse: House;
  previousPage: any;
  page: 1;

  constructor(private HouseService: DataService) {}

  ngOnInit() {
    return this.HouseService.getHouses(this.page).subscribe(
      data => (this.Houses = data)
    );
  }

  onSelect(House: House): void {
    this.selectedHouse = House;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.HouseService.getHouses(this.page).subscribe(
        data => (this.Houses = data)
      );
    }
  }
}
