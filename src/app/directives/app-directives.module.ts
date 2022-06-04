import {NgModule} from '@angular/core';
import {TitleDirective} from 'src/app/directives/title.directive';


@NgModule({
    declarations: [
        TitleDirective
    ],
    exports: [
        TitleDirective
    ]
})
export class AppDirectivesModule {
}
