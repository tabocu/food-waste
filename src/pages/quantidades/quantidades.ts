import { Component } from '@angular/core';
import { ModalController, AlertController, LoadingController, NavController } from 'ionic-angular';
import { AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { AlimentosPage } from '../alimentos/alimentos';
import { OtimizacaoProvider } from '../../providers/otimizacao/otimizacao';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { ResultadoPage } from '../resultado/resultado';

@Component({
  selector: 'page-quantidades',
  templateUrl: 'quantidades.html',
})
export class QuantidadesPage {

  mQuantidades: QuantidadeModel<AlimentoModel>[] = [];

  constructor(
    private mNavCtrl: NavController,
    private mModalCtrl: ModalController,
    private mAlertCtrl: AlertController,
    private mLoadingCtrl: LoadingController,
    private mOtimizacaoProvider: OtimizacaoProvider,
    private mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuantidadesPage');
  }

  getNomeOfAlimento(id: number): string {
    return this.mAlimentosProvider.retrieve(id).mNome;
  }

  removeQuantidade(quantidade: QuantidadeModel<AlimentoModel>) {
    for (let i = 0; i < this.mQuantidades.length; i++) {
      if (this.mQuantidades[i] == quantidade) {
        this.mQuantidades.splice(i, 1);
        return;
      }
    }
  }

  fetchAlimento() {
    let alimentosModal = this.mModalCtrl.create(AlimentosPage, {
      IS_MODAL: true,
      FILTER: this.mQuantidades.map(
        (quantidade) => {
          return quantidade.mId;
        })
    });
    alimentosModal.onDidDismiss((id: number) => {
      this.mQuantidades.push(new QuantidadeModel<AlimentoModel>(id, 1000));
    });
    alimentosModal.present();
  }

  otimizar() {
    let loader = this.mLoadingCtrl.create({
      content: 'Tentando otimizar...',
    });

    loader.present().then(() => {
      this.mOtimizacaoProvider.sendOpt(this.mQuantidades,
        (id: number) => { // Got a result
          this.mNavCtrl.push(ResultadoPage, { ID: id });
        },
        (code: number) => { // Got an error
          let alert = this.mAlertCtrl.create({
            title: 'Erro',
            subTitle: 'Não foi possível otimizar.\n[Error code: ' + code + ']',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      );
      loader.dismiss();
    });
  }
}