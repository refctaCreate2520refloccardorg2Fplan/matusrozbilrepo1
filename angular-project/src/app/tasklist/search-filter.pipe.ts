import { Pipe, PipeTransform } from '@angular/core';
import { TasksDTO } from '../tasklist/tasklist.component';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: TasksDTO[], searchTerm: string): TasksDTO[] {
    if (!searchTerm) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}