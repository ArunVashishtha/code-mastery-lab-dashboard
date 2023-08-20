import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  postArray: any;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      console.log(val);
      this.postArray = val;
    })
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
