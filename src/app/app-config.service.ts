import {Injectable} from '@angular/core';
import {FaConfig, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';


@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    constructor(
        private faLibrary: FaIconLibrary,
        private faConfig: FaConfig
    ) {
    }

    initialize(): void {
        this.configureFontAwesome();
    }

    private configureFontAwesome(): void {
        this.faConfig.defaultPrefix = 'fas';
        this.faLibrary.addIconPacks(fas);
    }
}
