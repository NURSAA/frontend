import {NgModule} from '@angular/core';
import {PricePipe} from 'src/app/pipes/price.pipe';


@NgModule({
    declarations: [
        PricePipe
    ],
    exports: [
        PricePipe
    ]
})
export class AppPipesModule {
}
