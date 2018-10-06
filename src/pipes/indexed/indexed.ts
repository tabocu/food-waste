import { Pipe, PipeTransform } from '@angular/core';
import { IndexedModel } from '../../models/utils/indexed';

@Pipe({
  name: 'indexed',
})
export class IndexedPipe implements PipeTransform {

  transform(indexedList: IndexedModel[], index: number[]) : IndexedModel[] {
    return indexedList.filter((e, i, arr) => {
      return !index || index.indexOf(e.getKey()) == -1;
    });
  }
}
