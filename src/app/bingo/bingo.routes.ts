import { RouteConfig } from 'vue-router';

export default (): RouteConfig[] => {
    return [
        {
            path: '/',
            name: 'bingo',
            component: () => import('./Bingo.vue')
        }
    ];
};