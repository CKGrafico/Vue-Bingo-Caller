import VueRouter from 'vue-router';
import { Vue } from 'vue-property-decorator';
import { bingoModule } from './bingo';

Vue.use(VueRouter);

export function router() {
    return new VueRouter({
        mode: 'history',
        routes: [
            ...bingoModule.routes(),
        ]
    });
}