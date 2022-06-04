import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {ingredientsRoutes} from 'src/app/views/private/ingredients/ingredients.routes';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';


@NgModule({
    imports: [
        RouterModule.forChild(ingredientsRoutes),
        TranslationsModule,
        ComponentsModule,
        CommonModule,
        AppPipesModule,
    ],
    declarations: [
        IngredientsComponent
    ]
})
export class IngredientsModule {
}
