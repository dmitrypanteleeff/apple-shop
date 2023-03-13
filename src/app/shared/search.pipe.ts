import { Pipe, PipeTransform } from '@angular/core';
import { productItem } from './interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: productItem[], productName: string = ''): productItem[] {
    if (!productName.trim()) {
      return products
    }
    return products.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()))
  }

}
