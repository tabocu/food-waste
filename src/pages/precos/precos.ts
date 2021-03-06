import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PrecosProvider } from '../../providers/precos/precos';
import { PrecoModel, ReceitaModel } from '../../models/receita/receita';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { Key } from '../../utils/keygen';
import { PrecoPage } from '../preco/preco';
import { AlimentoModel } from '../../models/alimento/alimento';

@Component({
  selector: 'page-precos',
  templateUrl: 'precos.html',
})
export class PrecosPage {

  isModal: boolean = false;
  filter: Key<PrecoModel>[] = [];

  precos: PrecoModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public precosProvider: PrecosProvider,
              public receitasProvider: ReceitasProvider,
              public alimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecoPage');
  }

  ionViewDidEnter() {
    this.isModal = this.navParams.get('isModal');
    this.filter = this.navParams.get('filter');
    this.precos = this.precosProvider.retrieveAll();
  }

  newPreco() {
    this.navCtrl.push(PrecoPage);
  }

  selectPreco(key: Key<PrecoModel>) {
    if (this.isModal) {
      this.viewCtrl.dismiss(key);
    } else {
      this.navCtrl.push(PrecoPage, { key: key });
    }
  }

  getNomeOfReceita(key: Key<ReceitaModel>) : string {
    return this.receitasProvider.retrieve(key).nome;
  }

  getQuantidadesOfReceita(key: Key<ReceitaModel>): QuantidadeModel<AlimentoModel>[] {
    return this.receitasProvider.retrieve(key).quantidades;
  }

  getAlimentosTextOfReceita(key: Key<ReceitaModel>): string {
    let alimentos: string[] = this.getQuantidadesOfReceita(key).map(
      (quantidade: QuantidadeModel<AlimentoModel>) => {
        return this.alimentosProvider.retrieve(quantidade.key).nome;
      }
    )

    if (alimentos.length > 0)
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }
}