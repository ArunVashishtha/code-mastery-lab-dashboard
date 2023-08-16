import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ChaptersService } from '../services/chapters.service';
import { Chapter } from '../models/chapter';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {
  categories: any;
  chapterForm: FormGroup;
  quillConfig: any; // Quill configuration for rich text editing

  constructor(private fb: FormBuilder,
    private chapterService: ChaptersService,
  private categoryService: CategoriesService) {
    this.chapterForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      content: [''] // No validation needed for content
    });

    this.quillConfig = {
      toolbar: {
        container: [
        ['bold', 'italic', 'underline', 'strike', 'image', 'vedio'], // Custom toolbar options
          [{ list: 'ordered' }, { list: 'bullet' }],
        [{'size': ['xsmall', 'small', 'medium', 'large', 'xlarge'] }],
        ['link']
        ]
      }
    };
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
