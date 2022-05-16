import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  search() {
    const value = this.txtSearch.nativeElement.value;
    this.txtSearch.nativeElement.value = '';
    this.gifsService.search(value);
  }
  constructor(private gifsService: GifsService) {}
}
