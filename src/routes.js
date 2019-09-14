import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base1/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base1/Cards'));
const Carousels = React.lazy(() => import('./views/Base1/Carousels'));
const Collapses = React.lazy(() => import('./views/Base1/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base1/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base1/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base1/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base1/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base1/Navbars'));
const Navs = React.lazy(() => import('./views/Base1/Navs'));
const Paginations = React.lazy(() => import('./views/Base1/Paginations'));
const Popovers = React.lazy(() => import('./views/Base1/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base1/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base1/Switches'));
const Tables = React.lazy(() => import('./views/Base1/Tables'));
const Tabs = React.lazy(() => import('./views/Base1/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base1/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons1/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// my import
const Category = React.lazy(()=>import('./views/Categories/Category'));
const AddCategory=React.lazy(()=>import('./views/Categories/compnents/AddCategory'));
const ViewCategory= React.lazy(()=>import('./views/Categories/compnents/ViewCategory'));
const EditCategory = React.lazy(()=>import('./views/Categories/compnents/EditCategory'));

const ViewLocations=React.lazy(()=>import('./views/Categories/compnents/ViewLocations'));
const AddLocation = React.lazy(()=>import('./views/Categories/compnents/AddLocation'));
const EditLocation = React.lazy(()=>import('./views/Categories/compnents/EditLocation'));
// const deleteLocation = React.lazy(()=>import('./views/Categories/compnents/deleteLocation'));

const ChangePassword = React.lazy(()=>import('./views/Pages/Register/ChangePassword'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const ResetPassword = React.lazy(()=>import('./views/Pages/Register/ResetPassword'));
const PublicUsers = React.lazy(()=>import('./views/Categories/compnents/PublicUsers'));
const ViewAdmins = React.lazy(()=>import('./views/Categories/compnents/ViewAdmins'))

const OyoData = React.lazy(()=>import('./views/Categories/OyoData/OyoData'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Category },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  // my components
  {path: '/category', exact:true , name : 'Category' , component:Category},
  {path:'/addcategory', exact:true, name:'Add Category', component:AddCategory},
  {path:'/viewcategory', exact:true, name:'View Categories', component:ViewCategory},
  {path:'/viewlocation/:id', exact:true, name:'View Locations', component:ViewLocations},
  {path:'/editcategory/:id', exact:true, name:'Edit Category', component:EditCategory},
  {path:'/addlocation/:id', exact:true, name:'Add Location', component:AddLocation},
  {path:'/editlocation/:id', exact:true, name:'Edit Location' , component:EditLocation },
  {path:'/changepassword/:email', exact:true, name:'Change Password', component:ChangePassword },
  {path:'/register', exact:true, name:'Register', component:Register},
  {path:'/resetpassword/:email', exact:true, name:'Reset Password', component:ResetPassword},
  {path:'/publicusers', exact:true, name:'Public Users' ,  component:PublicUsers},
  {path:'/viewadmins', exact:true, name:'View Admins', component:ViewAdmins},
  {path: '/oyo-data', exact: true, name: 'Oyo Data', component: OyoData}
];

export default routes;
