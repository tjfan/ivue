import VModel from '@/views/v-model';
import Home from '@/views/home';

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/v-model',
    component: VModel
  }
];

export default routes;
