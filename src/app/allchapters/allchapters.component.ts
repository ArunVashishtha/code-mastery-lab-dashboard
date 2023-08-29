import { Component, OnInit } from '@angular/core';
import { ChaptersService } from '../services/chapters.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-allchapters',
  templateUrl: './allchapters.component.html',
  styleUrls: ['./allchapters.component.css']
})
export class AllchaptersComponent implements OnInit {

  selectedCategory = 'all';
  chapters: any;
  categories: any;
  sortByChapter = 'post.data.chapterNumber';
  constructor(private chapterService: ChaptersService,
  private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.chapterService.loadData().subscribe((val) => {
      this.chapters = val;
    });
    this.categoryService.loadData().subscribe((val: any) => {
      this.categories = val;
    });
  }

  onDelete(id: string) {
    this.chapterService.deleteData(id);
  }

  chapterEnable(id:string, markFeatureEnable: boolean) {
    const featuredData = {
      isFeatured: markFeatureEnable
    }
    this.chapterService.updateChapterFeatureEnable(id, featuredData);
  }
  get filteredChapters(): any {
    if (this.categories && this.chapters) {
      if (this.selectedCategory === 'all') {
        return this.chapters;
      } else {
        return this.chapters.filter((post: any) => post.data.category.description.toLowerCase() === this.selectedCategory.toLowerCase()).sort((a: any,b: any) => a.data.chapterNumber - b.data.chapterNumber);
      }
    } else {
      return this.chapters;
    }
  }
}
