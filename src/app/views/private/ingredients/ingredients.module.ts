import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {ingredientsRoutes} from 'src/app/views/private/ingredients/ingredients.routes';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';


@NgModule({
    imports: [
        AppFormsModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild(ingredientsRoutes),
        TranslationsModule
    ],
    declarations: [
        IngredientsComponent
    ]
})
export class IngredientsModule {
}
