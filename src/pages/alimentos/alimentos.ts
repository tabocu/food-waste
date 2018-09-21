import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { AlimentoModel } from '../../app/models/alimento-model'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
  searchCtrl: FormControl = new FormControl();
  searchTerm: string = '';
  searching: boolean = false;

  alimentos: AlimentoModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alimentosProvider: AlimentosProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentosPage');
    this.setFiltered();
    this.searchCtrl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFiltered();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFiltered() {
    this.alimentos = this.alimentosProvider.filterAlimentos(this.searchTerm);
  }
}
