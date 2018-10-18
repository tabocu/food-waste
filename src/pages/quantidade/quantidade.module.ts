import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuantidadePage } from './quantidade';

@NgModule({
  declarations: [
    QuantidadePage,
  ],
  imports: [
    IonicPageModule.forChild(QuantidadePage),
  ],
})
export class QuantidadePageModule {}
