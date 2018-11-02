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

  tab1Root = AlimentosPage;
  tab2Root = ReceitasPage;
  tab3Root = PrecosPage;

  constructor(
    public receitasProvider: ReceitasProvider,
    public alimentosProvider: AlimentosProvider,
    public precosProvider: PrecosProvider) {

    let keyAlimento0 = this.alimentosProvider.create(new AlimentoModel("Arroz branco", "Carboidrato"));
    let keyAlimento1 = this.alimentosProvider.create(new AlimentoModel("Feijão carioquinha", "Carboidrato"));
    let keyAlimento2 = this.alimentosProvider.create(new AlimentoModel("Carne de panela", "Proteina"));
    let keyAlimento3 = this.alimentosProvider.create(new AlimentoModel("Carne moida", "Proteina"));
    this.alimentosProvider.create(new AlimentoModel("Quiabo", "Legume"));
    let keyAlimento5 = this.alimentosProvider.create(new AlimentoModel("Farofa de ovo", "Misto"));
    this.alimentosProvider.create(new AlimentoModel("Frango com quiabo", "Proteina"));

    let recp1 = new ReceitaModel("Tropeiro");
    recp1.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento0, 200));
    recp1.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento2, 200));
    recp1.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento5, 200));
    
    let recp2 = new ReceitaModel("Mixido");
    recp2.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento0, 200));
    recp2.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento1, 200));
    recp2.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento3, 200));
    recp2.quantidades.push(new QuantidadeModel<AlimentoModel>(keyAlimento5, 200));
    
    let receita0 = this.receitasProvider.create(recp1);
    let receita1 = this.receitasProvider.create(recp2);
    this.receitasProvider.create(new ReceitaModel("Fricasse"));
    this.receitasProvider.create(new ReceitaModel("Macarrão na chapa"));

    this.precosProvider.create(new PrecoModel(receita0, 4.75));
    this.precosProvider.create(new PrecoModel(receita1, 7.15));
  }
}
