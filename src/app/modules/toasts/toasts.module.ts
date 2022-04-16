import {NgModule} from '@angular/core';
import {ToastsComponent} from 'src/app/modules/toasts/components/toasts/toasts.component';
import {ToastComponent} from 'src/app/modules/toasts/components/toast/toast.component';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ToastsComponent,
        ToastComponent
    ],
    exports: [
        ToastsComponent
    ]
})
export class ToastsModule {
}
