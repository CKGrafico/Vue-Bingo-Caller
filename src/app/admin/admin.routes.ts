import { RouteConfig } from 'vue-router';

export default (): RouteConfig[] => {
    return [
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./Admin.vue')
        }
    ];
};