import {Pipe, PipeTransform} from '@angular/core';
import {PrivilegesService} from 'src/app/modules/privileges/privileges.service';

@Pipe({
    name: 'hasAccess'
})
export class HasAccessPipe implements PipeTransform {
    constructor(
        private privilegeService: PrivilegesService
    ) {
    }

    transform(name: string): boolean {
        return this.privilegeService.hasAccess(name);
    }
}
