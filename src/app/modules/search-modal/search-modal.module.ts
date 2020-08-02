import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModalComponent } from './search-modal.component';

@NgModule({
  declarations: [SearchModalComponent],
  imports: [CommonModule],
  exports: [SearchModalComponent],
  entryComponents: [SearchModalComponent],
})
export class SearchModalModule {}
