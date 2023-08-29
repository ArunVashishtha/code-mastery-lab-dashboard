import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import Editor from './../../../../ckeditor5-39.0.1-72owmrkdy25w/build/ckeditor';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  selectedImage: any;
  Editor: any = Editor;
  post: any;
  imgSrc: any = './assets/placeholderimage.png';
  categories: any = [];
  postForm: any = {};
  formStatus: string = 'Add';
  postId: string = '';
  constructor(private fb: FormBuilder,
    private postService: PostsService,
    private categoryService: CategoriesService,
    private router: ActivatedRoute) {
    this.router.queryParams.subscribe(val => {
      
      this.postId = val['id'];
      if (this.postId) {
        this.postService.loadOneData(val['id']).subscribe(post => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            postLabel: [this.post.postLabel, [Validators.required]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: [this.post.postImg, Validators.required],
            content: [this.post.content, Validators.required]
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        })
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          postLabel: ['', [Validators.required]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: [``, Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }
  get fc() {
    return this.postForm.controls;
  }
  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.imgSrc = e.target.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  } 
  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
      const postData: Post = {
        title: this.postForm.value.title,
        postLabel: this.postForm.value.postLabel,
        permalink: this.postForm.value.permalink,
        category: {
          categoryId: splitted[0],
          category: splitted[1],
        },
        postImgPath: '',
        excerpt: this.postForm.value.excerpt,
        content: this.postForm.value.content,
        isFeatured: false,
        views: 0,
        status: 'new',
        isEnablePost: false,
        createdAt: new Date()
      }
    this.postService.uploadImage(this.selectedImage, postData, this.formStatus, this.postId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholderimage.png';
  }
}
