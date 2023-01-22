import {NgModule} from "@angular/core";
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RemoveObjectModule} from 'src/app/modules/remove-object/remove-object.module';


@NgModule({
    imports: [
        TranslationsModule,
        ComponentsModule,
        CommonModule,
        AppPipesModule,
        AppFormsModule,
        FontAwesomeModule,
        RemoveObjectModule,
    ],
    declarations: [
        IngredientsComponent
    ]
})
export class IngredientsModule {
}
