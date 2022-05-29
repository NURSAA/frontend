import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {privateRoutes} from "./private.routes";


@NgModule({
    imports: [
        RouterModule.forChild(privateRoutes),
    ]
})
export class PrivateModule {
}
