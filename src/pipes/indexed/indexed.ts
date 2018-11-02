import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexed',
  pure: false
})
export class IndexedPipe implements PipeTransform {

  transform(indexedList: any[], index: number[]) : any[] {
    return indexedList.filter((e, i, arr) => {
      return !index || index.indexOf(e.getKey()) == -1;
    });
  }
}
