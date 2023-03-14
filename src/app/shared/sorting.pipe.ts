import { Pipe, PipeTransform } from '@angular/core';
import { productItem } from './interface';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: productItem[], type: string = ''): productItem[] {

    return products.filter(product => product.type.toLowerCase() === type.toLocaleLowerCase())
  }

}
