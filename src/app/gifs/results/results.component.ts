import { Component, OnInit } from '@angular/core';
import { GifsService } from '../service/gifs-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent {

  get gifs() {
    return this.gifsService.gifs;
  }

  constructor(private gifsService: GifsService) { }

}
