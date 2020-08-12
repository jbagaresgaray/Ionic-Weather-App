import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SearchModalComponent } from './search-modal.component';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  declarations: [SearchModalComponent],
  imports: [CommonModule, IonicModule, ComponentsModule],
  exports: [SearchModalComponent],
  entryComponents: [SearchModalComponent],
})
export class SearchModalModule {}
