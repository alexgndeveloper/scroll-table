import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatTableModule,
    ScrollingModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  dataSource = new MatTableDataSource<any>([]);
  page = 1;
  loading = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    if (this.loading) return;

    this.loading = true;
    this.dataService.getItems(this.page).subscribe(newItems => {
      this.dataSource.data = [...this.dataSource.data, ...newItems.items];
      this.page++;
      this.loading = false;
    });
  }

  onScroll(event: any) {
    const { offsetHeight, scrollTop, scrollHeight } = event.target;
    if (scrollTop + offsetHeight >= scrollHeight - 10 && !this.loading) {
      this.loadMore();
    }
  }
}
