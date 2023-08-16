import { Component, OnInit } from '@angular/core';
import { ChaptersService } from '../services/chapters.service';

@Component({
  selector: 'app-allchapters',
  templateUrl: './allchapters.component.html',
  styleUrls: ['./allchapters.component.css']
})
export class AllchaptersComponent implements OnInit {

  chapters: any;
  constructor(private chapterService: ChaptersService) { }

  ngOnInit(): void {
    this.chapterService.loadData().subscribe((val) => {
      console.log(val);
      this.chapters = val;
    })
  }

  onDelete(id: string) {
    this.chapterService.deleteData(id);
  }

}
