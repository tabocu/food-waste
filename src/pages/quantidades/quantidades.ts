import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { QuantidadeModel, AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { Key } from '../../utils/keygen';
import { AlimentosPage } from '../alimentos/alimentos';

@Component({
  selector: 'page-quantidades',
  templateUrl: 'quantidades.html',
})
export class QuantidadesPage {

  quantidades: QuantidadeModel[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantidadesPage');
  }

  getNomeOfAlimento(key: Key<AlimentoModel>): string {
    return this.alimentosProvider.retrieve(key).nome;
  }

  removeQuantidade(quantidade: QuantidadeModel) {
    for (let i = 0; i < this.quantidades.length; i++)
      if (this.quantidades[i] == quantidade)
        this.quantidades.splice(i, 1);
  }

  fetchAlimento() {
    let alimentosModal = this.modalCtrl.create(AlimentosPage, {
      isModal: true,
      filter: this.quantidades.map(
        (quantidade) => {
          return quantidade.alimentoKey;
        })
    });
    alimentosModal.onDidDismiss((key: Key<AlimentoModel>) => {
      this.quantidades.push(new QuantidadeModel(key, 1000));
    });
    alimentosModal.present();
  }
}
