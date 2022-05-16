import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get history(): string[] {
    return this.gifsService.history;
  }
  searchHistory(term: string) {
    this.gifsService.search(term);
  }
  constructor(private gifsService: GifsService) {}
}
