import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { ReceitasPage } from '../receitas/receitas'
import { PrecosPage } from '../precos/precos';

import { ReceitasProvider } from '../../providers/receitas/receitas';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { PrecosProvider } from '../../providers/precos/precos';
import { AlimentoModel, QuantidadeModel } from '../../models/alimento/alimento';
import { ReceitaModel, PrecoModel } from '../../models/receita/receita';

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
    /*let keyAlimento4 =*/ this.alimentosProvider.create(new AlimentoModel("Quiabo", "Legume"));
    let keyAlimento5 = this.alimentosProvider.create(new AlimentoModel("Farofa de ovo", "Misto"));
    /*let keyAlimento6 =*/ this.alimentosProvider.create(new AlimentoModel("Frango com quiabo", "Proteina"));

    let recp1 = new ReceitaModel("Tropeiro");
    recp1.quantidades.push(new QuantidadeModel(keyAlimento0, 200));
    recp1.quantidades.push(new QuantidadeModel(keyAlimento2, 200));
    recp1.quantidades.push(new QuantidadeModel(keyAlimento5, 200));
    
    let recp2 = new ReceitaModel("Mixido");
    recp2.quantidades.push(new QuantidadeModel(keyAlimento0, 200));
    recp2.quantidades.push(new QuantidadeModel(keyAlimento1, 200));
    recp2.quantidades.push(new QuantidadeModel(keyAlimento3, 200));
    recp2.quantidades.push(new QuantidadeModel(keyAlimento5, 200));
    
    let receita0 = this.receitasProvider.create(recp1);
    let receita1 = this.receitasProvider.create(recp2);
    let receita2 = this.receitasProvider.create(new ReceitaModel("Fricasse"));
    let receita3 = this.receitasProvider.create(new ReceitaModel("Macarrão na chapa"));

    this.precosProvider.create(new PrecoModel(receita0, 4.75));
    this.precosProvider.create(new PrecoModel(receita1, 7.15));
  }
}
