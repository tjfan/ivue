const Home = () => import('@/views/home');
const Directive = () => import('@/views/directive');
const Props = () => import('@/views/props');

const routes = [
  {
    path: '',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Home,
    name: '首页',
    hidden: false
  },
  {
    path: '/directive',
    component: Directive,
    name: '自定义指令'
  },
  {
    path: '/props',
    component: Props,
    name: '组件之间传值'
  }
];

export default routes;
