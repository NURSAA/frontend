import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UsersListComponent} from 'src/app/views/private/users/users-list/users-list.component';
import {usersRoutes} from 'src/app/views/private/users/users.routes';
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';


@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes),
        ComponentsModule,
        TranslationsModule,
        AppFormsModule,
    ],
    declarations: [
        UsersListComponent
    ]
})
export class UsersModule {
}
