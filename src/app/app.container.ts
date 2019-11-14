import { Container } from 'inversify';
import { adminModule } from '~/admin';
import { bingoModule } from '~/bingo';
import { injectId } from '~/core';
import * as s from '~/shared';

// How to inject a dependency
// @Inject() nameService: INameService;

export let container: Container = null;

export function containerBuilder(): Container {
    container = new Container();

    // Bind shared services
    container.bind<s.ITranslateService>(injectId(s.TranslateService)).to(s.TranslateService).inSingletonScope();

    // Bind services for each module
    bingoModule.container(container);
    adminModule.container(container);

    return container;
}