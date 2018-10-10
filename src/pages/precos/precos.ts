import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PrecosProvider } from '../../providers/precos/precos';
import { PrecoModel, ReceitaModel } from '../../models/receita/receita';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { QuantidadeModel } from '../../models/alimento/alimento';
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-precos',
  templateUrl: 'precos.html',
})
export class PrecosPage {

  precos: PrecoModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public precosProvider: PrecosProvider,
              public receitasProvider: ReceitasProvider,
              public alimentosProvider: AlimentosProvider) {
    this.precos = precosProvider.retrieveAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecosPage');
  }

  selectPreco(key: Key<PrecoModel>) {
    // console.log('PrecoKey: ' + key);
    // if (this.isModal) {
    //   this.viewCtrl.dismiss(key);
    // } else {
    //   //this.navCtrl.push(PrecoPage, { key: key });
    // }
  }

  getNomeOfReceita(key: Key<ReceitaModel>) : string {
    return this.receitasProvider.retrieve(key).nome;
  }

  getQuantidadesOfReceita(key: Key<ReceitaModel>): QuantidadeModel[] {
    return this.receitasProvider.retrieve(key).quantidades;
  }

  getAlimentosTextOfReceita(key: Key<ReceitaModel>): string {
    let alimentos: string[] = this.getQuantidadesOfReceita(key).map(
      (quantidade: QuantidadeModel) => {
        return this.alimentosProvider.retrieve(quantidade.alimentoKey).nome;
      }
    )

    if (alimentos.length > 0)
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }
}