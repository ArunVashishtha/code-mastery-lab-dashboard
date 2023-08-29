import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ChaptersService } from '../services/chapters.service';
import { Chapter } from '../models/chapter';
import { ActivatedRoute } from '@angular/router';
import Editor from '../../../ckeditor5-39.0.1-72owmrkdy25w/build/ckeditor';
@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css'],
})
export class NewChapterComponent implements OnInit {
  categories: any;
  chapterForm!: FormGroup;
  Editor: any = Editor; // CKEditor instance
  editorContent = '';
  chapterId = '';
  chapter: any;
  formStatus: string = 'Add';
  selectedImage: any;
  imgSrc: any = './assets/placeholderimage.png';
  constructor(
    private fb: FormBuilder,
    private chapterService: ChaptersService,
    private categoryService: CategoriesService,
    private router: ActivatedRoute
  ) {
    this.router.queryParams.subscribe((val) => {
      this.chapterId = val['id'];
      if (this.chapterId) {
        this.chapterService
          .loadOneData(this.chapterId)
          .subscribe((chap: any) => {
            this.chapter = chap;
            this.chapterForm = this.fb.group({
              title: [
                this.chapter.title,
                [Validators.required, Validators.minLength(10)],
              ],
              category: [
                `${this.chapter.category.id}-${this.chapter.category.description}`,
                Validators.required,
              ],
              content: [this.chapter.content, Validators.required],
              chapterNumber: [this.chapter.chapterNumber, Validators.required],
              description: [this.chapter.description, Validators.required],
            });
            this.formStatus = 'Edit';
          });
      } else {
        this.chapterForm = this.fb.group({
          category: ['', Validators.required],
          title: ['', Validators.required],
          chapterNumber: ['', Validators.required],
          description: ['', Validators.required],
          content: [''], // No validation needed for content
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any) => {
      this.categories = val;
    });
  }

  onSubmit() {
    if (this.chapterForm.valid) {
      let splitted = this.chapterForm.value.category.split('-');
      const chapterData: Chapter = {
        title: this.chapterForm.value.title,
        chapterNumber: this.chapterForm.value.chapterNumber,
        description: this.chapterForm.value.description,
        category: {
          id: splitted[0],
          description: splitted[1],
        },
        content: this.chapterForm.value.content,
        isFeatured: false,
        views: 0,
        createdAt: new Date(),
        image: ''
      };
      if (this.chapterId) {
        this.chapterService.uploadImage(this.selectedImage, chapterData, 'Edit', this.chapterId);
      } else {
        this.chapterService.uploadImage(this.selectedImage, chapterData, 'Save', this.chapterId);
      }
    }
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e:any) => {
      this.imgSrc = e.target.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }
}
