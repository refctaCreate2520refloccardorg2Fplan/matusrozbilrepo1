import { Component, inject, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    AsyncPipe,
    MatList,
    MatListItem,
    NgForOf,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  time = new Date();
  private destroy$ = new Subject<void>();
  timeSubscription: Subscription;
  ngOnInit() {
    const timeSource = timer(0, 1000);
    this.timeSubscription = timeSource.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.time = new Date();
    });
  }


  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}
