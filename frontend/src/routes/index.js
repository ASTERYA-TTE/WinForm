import Dashboard from '../components/Dashboard/Dashboard';
import Trash from '../components/Trash';
import Favorites from '../components/Favorites';
import Archive from '../components/Archive'
import FormData from '../components/Dashboard/FormData'
import FormEdit from '../components/Dashboard/FormEdit'


const routers = [
    {
      path: '/app',
      component: Dashboard,
      exact: true,
      meta: { breadcrumb: [{ parent: 'Dashboard', label: 'All Forms' }] },
    },
    {
      path: '/trash',
      component: Trash,
      meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Trash' }] },
    },
    {
      path: '/favorites',
      component: Favorites,
      meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Favorites' }] },
    },
    {
      path: '/archive',
      component: Archive,
      meta: { breadcrumb: [{ parent: 'UI Kit', label: 'Archive' }] },
    },
    { path: '/formdata', component: FormData },
    { path: '/formedit', component: FormEdit },
  ]

export default routers;