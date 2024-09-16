import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../core/services/api.service';
import { MatTableModule } from '@angular/material/table'; 
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../core/model/item.model'; 

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'picture'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getApiData();
  }

  getApiData() {
    this.apiService.getItems().subscribe(
      (res: any) => {
        this.dataSource.data = res.results as User[];
        if (this.sort) {
          this.dataSource.sort = this.sort; 
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
