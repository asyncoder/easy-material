import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: any, args?: any): any {    
    let fieldName = args[0];
    return data.slice().sort((a, b) => {
        if (a[fieldName] < b[fieldName]) {
            return -1;
        } else if (b[fieldName] < a[fieldName]) {
            return 1;
        } else {
            return 0;
        }
    });
  }
}
