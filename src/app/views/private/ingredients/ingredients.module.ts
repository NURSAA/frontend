import {NgModule} from "@angular/core";
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';


@NgModule({
    imports: [
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
