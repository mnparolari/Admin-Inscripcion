import { Pipe, PipeTransform } from '@angular/core';
import { Users } from 'src/app/dashboard/pages/users/models/user';


@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: Users, ...args: unknown[]): unknown {
    const fullName = `${user.name} ${user.surname}`
    return fullName;
  }
}
