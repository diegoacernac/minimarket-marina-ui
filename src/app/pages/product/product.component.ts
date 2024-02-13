import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iconsfa } from '../../shared/utils/font-awesome-icons';
import { Product } from '../../shared/models/product';
import { ProductService } from './services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/services/category.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-product',
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
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  back = iconsfa.back
  edit = iconsfa.edit
  add = iconsfa.plus

  displayedColumns: string[] = [
    'id',
    'barcode',
    'description',
    'perishable',
    'category',
    'unitM',
    'purchasePrice',
    'salePrice',
    'status',
    'actions'
  ]
  dataSource!: MatTableDataSource<Product>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  catgories: Array<Category> = []

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((products: any) => {
      this.dataSource = new MatTableDataSource(products.products)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }, (error: any) => {
      this.toastr.error(
        error.message,
        "¡Error!",
        {
          timeOut: 5000,
          closeButton: true,
          positionClass: 'toast-top-right',
        }
      )
    })
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

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  editRow(row: any): void {
    console.log(row)
  }

  deleteRow(row: any): void {
    console.log(row)
  }
}
