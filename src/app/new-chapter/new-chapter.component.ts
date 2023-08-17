import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ChaptersService } from '../services/chapters.service';
import { Chapter } from '../models/chapter';
import { ActivatedRoute } from '@angular/router';
import * as CustomEditor from '../core/ckeeditor';
@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {
  categories: any;
  chapterForm!: FormGroup;
  Editor = CustomEditor; // CKEditor instance
  editorContent = '';
  chapterId = '';
  chapter: any;
  formStatus: string = '';
  public config = {
    toolbar: [ 'heading', '|',
      'fontfamily','fontsize',
      'alignment',
      'fontColor','fontBackgroundColor', '|',
      'bold', 'italic', 'custombutton', 'strikethrough','underline','subscript','superscript','|',
      'link','|',
      'outdent','indent','|',
      'bulletedList','numberedList','|',
      'code','codeBlock','|',
      'insertTable','|',
      'imageUpload','blockQuote','|',
      'undo','redo','|',
      'youtube',
      'mediaEmbed'
    ]
  }
  constructor(private fb: FormBuilder,
    private chapterService: ChaptersService,
    private categoryService: CategoriesService,
    private router: ActivatedRoute) {
    
    this.router.queryParams.subscribe(val => {
      
      this.chapterId = val['id'];
      if (this.chapterId) {
        this.chapterService.loadOneData(this.chapterId).subscribe(chap => {
          this.chapter = chap;
          this.chapterForm = this.fb.group({
            title: [this.chapter.title, [Validators.required, Validators.minLength(10)]],
            category: [`${this.chapter.category.id}-${this.chapter.category.description}`, Validators.required],
            content: [this.chapter.content, Validators.required]
          });
          this.formStatus = 'Edit';
        })
      } else {
        this.chapterForm = this.fb.group({
          category: ['', Validators.required],
          title: ['', Validators.required],
          content: [''] // No validation needed for content
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  onSubmit() {
    if (this.chapterForm.valid) {
      let splitted = this.chapterForm.value.category.split('-');
      const chapterData: Chapter = {
        title: this.chapterForm.value.title,
        category: {
          id: splitted[0],
          description: splitted[1],
        },
        content: this.chapterForm.value.content,
        isFeatured: false,
        views: 0,
        createdAt: new Date()
      }
      this.chapterService.saveData(chapterData);
    }
  }
}
