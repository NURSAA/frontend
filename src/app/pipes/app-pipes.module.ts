import {NgModule} from '@angular/core';
import {PricePipe} from 'src/app/pipes/price.pipe';
import {HasAccessPipe} from 'src/app/pipes/has-access.pipe';
import {TransformToRestPipe} from 'src/app/pipes/transform-to-rest.pipe';


@NgModule({
    declarations: [
        PricePipe,
        HasAccessPipe,
        TransformToRestPipe
    ],
    exports: [
        PricePipe,
        HasAccessPipe,
        TransformToRestPipe
    ]
})
export class AppPipesModule {
}
