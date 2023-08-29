import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  postArray: any;
  categories: any;
  selectedCategory = 'all';
  constructor(private postService: PostsService,
  private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any) => {
      this.categories = val;
      this.postService.loadData().subscribe((val) => {
        console.log(val);
        this.postArray = val;
      });
    });
  }

  get filteredPosts(): any {
    if (this.categories && this.postArray) {
      if (this.selectedCategory === 'all') {
        return this.postArray;
      } else {
        return this.postArray.filter((post: any) => post.data.category.category.toLowerCase() === this.selectedCategory.toLowerCase());
      }
    } else {
      return this.postArray;
    }
  }

  onDelete(postImgPath: string, id: string) {
    this.postService.deleteImage(postImgPath, id);
  }

  postFeatureEnable(id:string, markFeatureEnable: boolean) {
    const featuredData = {
      isFeatured: markFeatureEnable
    }
    this.postService.updatePostFeatureEnable(id, featuredData);
  }
  postEnable(id:string, markPostEnable: boolean) {
    const featuredData = {
      isEnablePost: markPostEnable
    }
    this.postService.updatePostFeatureEnable(id, featuredData);
  }
}
