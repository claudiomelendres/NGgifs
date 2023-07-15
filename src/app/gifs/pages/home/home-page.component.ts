import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private gifsService: GifsService) {
    if (gifsService.tagsHistory.length > 0)
      this.searchTag(gifsService.tagsHistory[0]);
  }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
