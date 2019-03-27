import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { ReceitasPage } from '../receitas/receitas'
import { PrecosPage } from '../precos/precos';

import { ReceitasProvider } from '../../providers/receitas/receitas';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { PrecosProvider } from '../../providers/precos/precos';
import { AlimentoModel} from '../../models/alimento/alimento';
import { ReceitaModel, PrecoModel } from '../../models/receita/receita';
import { QuantidadeModel } from '../../models/quantidade/quantidade';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mTab1Root = AlimentosPage;
  mTab2Root = ReceitasPage;
  mTab3Root = PrecosPage;

  constructor(
    public mReceitasProvider: ReceitasProvider,
    public mAlimentosProvider: AlimentosProvider,
    public mPrecosProvider: PrecosProvider) {

    let idAlimento0 = this.mAlimentosProvider.create(new AlimentoModel("Arroz branco", "Carboidrato"));
    let idAlimento1 = this.mAlimentosProvider.create(new AlimentoModel("Feijão carioquinha", "Carboidrato"));
    let idAlimento2 = this.mAlimentosProvider.create(new AlimentoModel("Carne de panela", "Proteina"));
    let idAlimento3 = this.mAlimentosProvider.create(new AlimentoModel("Carne moida", "Proteina"));
    this.mAlimentosProvider.create(new AlimentoModel("Quiabo", "Legume"));
    let idAlimento5 = this.mAlimentosProvider.create(new AlimentoModel("Farofa de ovo", "Misto"));
    this.mAlimentosProvider.create(new AlimentoModel("Frango com quiabo", "Proteina"));

    let recp1 = new ReceitaModel("Tropeiro");
    recp1.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento0, 200));
    recp1.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento2, 200));
    recp1.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento5, 200));
    
    let recp2 = new ReceitaModel("Mixido");
    recp2.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento0, 200));
    recp2.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento1, 200));
    recp2.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento3, 200));
    recp2.mQuantidades.push(new QuantidadeModel<AlimentoModel>(idAlimento5, 200));
    
    let receita0 = this.mReceitasProvider.create(recp1);
    let receita1 = this.mReceitasProvider.create(recp2);
    this.mReceitasProvider.create(new ReceitaModel("Fricasse"));
    this.mReceitasProvider.create(new ReceitaModel("Macarrão na chapa"));

    this.mPrecosProvider.create(new PrecoModel(receita0, 4.75));
    this.mPrecosProvider.create(new PrecoModel(receita1, 7.15));
  }
}