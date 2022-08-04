import {NgModule} from '@angular/core';
import {PricePipe} from 'src/app/pipes/price.pipe';
import {HasAccessPipe} from 'src/app/pipes/has-access.pipe';


@NgModule({
    declarations: [
        PricePipe,
        HasAccessPipe
    ],
    exports: [
        PricePipe,
        HasAccessPipe
    ]
})
export class AppPipesModule {
}
