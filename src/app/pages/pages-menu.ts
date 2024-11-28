import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/',
    home: true,
  },
  {
    title: 'Autenticação',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
       {
        title: 'Registrar',
        link: '/auth/sign-up',
      },
    ],
  },
  /* {
    title: 'Home ADM',
    icon: 'home-outline',
    link: '/pages/homeAdm',
  }, */
  /* {
    title: 'Recursos',
    icon: 'corner-down-right-outline',
    children: [
      {
        title: 'Marcas',
        link: '/pages/resource/brand',
      },
       {
        title: 'Categoria',
        link: '/pages/resource/category',
      },
      {
        title: 'Produto',
        link: '/pages/resource/product',
      },
    ],
  }, */
];
