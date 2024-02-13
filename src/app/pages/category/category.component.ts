import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Category } from '../../shared/models/category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CategoryService } from './services/category.service';
import { MatInputModule } from '@angular/material/input';
import { iconsfa } from '../../shared/utils/font-awesome-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MainComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FontAwesomeModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  back = iconsfa.back
  edit = iconsfa.edit
  add = iconsfa.plus
  
  displayedColumns: string[] = ['id', 'description', 'actions']
  dataSource!: MatTableDataSource<Category>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories: any) => {
      this.dataSource = new MatTableDataSource(categories.productCategories)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  goBack(): void {
    this.router.navigate(['home'])
  }

  addCategory(): void {
    this.router.navigate(['add-category'])
  }

  editRow(row: any): void {
    console.log(row)
  }
}
