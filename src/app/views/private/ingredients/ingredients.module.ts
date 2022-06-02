import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {ingredientsRoutes} from 'src/app/views/private/ingredients/ingredients.routes';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';


@NgModule({
    imports: [
        RouterModule.forChild(ingredientsRoutes),
        TranslationsModule,
    ],
    declarations: [
        IngredientsComponent
    ]
})
export class IngredientsModule {
}
