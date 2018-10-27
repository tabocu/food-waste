import { Component } from '@angular/core';
import { ModalController, AlertController, LoadingController } from 'ionic-angular';
import { AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { Key } from '../../utils/keygen';
import { AlimentosPage } from '../alimentos/alimentos';
import { OtimizacaoProvider } from '../../providers/otimizacao/otimizacao';
import { QuantidadeModel } from '../../models/quantidade/quantidade';

@Component({
  selector: 'page-quantidades',
  templateUrl: 'quantidades.html',
})
export class QuantidadesPage {

  quantidades: QuantidadeModel<AlimentoModel>[] = [];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private otimizacaoProvider: OtimizacaoProvider,
    private alimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantidadesPage');
  }

  getNomeOfAlimento(key: Key<AlimentoModel>): string {
    return this.alimentosProvider.retrieve(key).nome;
  }

  removeQuantidade(quantidade: QuantidadeModel<AlimentoModel>) {
    for (let i = 0; i < this.quantidades.length; i++)
      if (this.quantidades[i] == quantidade)
        this.quantidades.splice(i, 1);
  }

  fetchAlimento() {
    let alimentosModal = this.modalCtrl.create(AlimentosPage, {
      isModal: true,
      filter: this.quantidades.map(
        (quantidade) => {
          return quantidade.key;
        })
    });
    alimentosModal.onDidDismiss((key: Key<AlimentoModel>) => {
      this.quantidades.push(new QuantidadeModel<AlimentoModel>(key, 1000));
    });
    alimentosModal.present();
  }

  otimizar() {
    let loader = this.loadingCtrl.create({
      content: 'Tentando otimizar...',
    });

    loader.present().then(() => {
      this.otimizacaoProvider.sendOpt(this.quantidades,
        () => {

        }, () => {
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Não foi possível otimizar.',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      );
      loader.dismiss();
    });
  }
}
