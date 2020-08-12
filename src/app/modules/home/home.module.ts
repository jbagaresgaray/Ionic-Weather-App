import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ComponentsModule } from './../../shared/components/components.module';
import { PipesModule } from './../../shared/pipes/pipes.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    PipesModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
