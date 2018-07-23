import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Null'
})
export class NullPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
