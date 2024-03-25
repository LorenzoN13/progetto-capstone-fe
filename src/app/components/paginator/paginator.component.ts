import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  goToNextPage(): void {
    this.currentPage++;
    this.emitPageChange();
  }

  goToPage(event: Event): void {
    const enteredPage = +(event.target as HTMLInputElement).value;
    if (enteredPage >= 1) {
      this.currentPage = enteredPage;
      this.emitPageChange();
    }
  }

  emitPageChange(): void {
    this.pageChange.emit(this.currentPage);
  }
}
