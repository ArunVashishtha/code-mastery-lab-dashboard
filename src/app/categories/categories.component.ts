import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: any = [];
  formCategory: string = '';
  formCategoryDescription: string = '';
  formStatus: string = 'Add';
  formCategoryID: string = '';
  formContentType: string = '';
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    })
  }

  onSubmit = (formData: any): void => {
    let categoryData: Category = {
      category: formData.value.category,
      categoryDescription: formData.value.description,
      contentType: formData.value.contentType,
      isFeatured: false
    };
    if (this.formStatus === 'Add') {
      this.categoryService.saveData(categoryData);
    } else {
      this.categoryService.updateData(this.formCategoryID, categoryData);
    }
    this.formStatus = 'Add';
    formData.reset();
  };

  onEdit(category: any) {
    this.formStatus = 'Edit';
    this.formCategoryID = category.id;
    this.formCategory = category.data.category;
    this.formContentType = category.data.contentType;
    this.formCategoryDescription = category.data.categoryDescription;
  }

  onDelete(category: any) {
    this.categoryService.deleteData(category.id);
  }

  enableDisableCategory(enableCat: boolean, selectedCat: any) {
    let categoryData: Category = {
      category: selectedCat.data.category,
      categoryDescription: selectedCat.data.categoryDescription,
      contentType: selectedCat.data.contentType,
      isFeatured: enableCat
    };
    this.categoryService.updateData(selectedCat.id, categoryData);
  }
}
