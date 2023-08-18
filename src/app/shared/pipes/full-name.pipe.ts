import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models/user';


@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    const fullName = `${user.name} ${user.surname}`
    return fullName;
  }
}
