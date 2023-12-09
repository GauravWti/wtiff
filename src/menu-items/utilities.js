// assets
import {  IconWindmill  } from '@tabler/icons';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Man3Icon from '@mui/icons-material/Man3';

// constant
import { IconKey } from '@tabler/icons';
const icons = {
  DirectionsCarIcon,
  IconWindmill,
  PersonAddIcon,
  LocalAtmIcon,
  IconKey,
  AttachMoneyIcon,
  PostAddIcon,
  Man3Icon,

};

// constant

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const userid=localStorage.getItem('id');
const role=localStorage.getItem('role');




const arrVendor= [
  {
    id: 'util-VenderCarAssign',
    title: 'Vender Car form',
    type: 'item',
    url: `/utils/VendercarAssign/${userid}`,
    icon: icons.DirectionsCarIcon,
    breadcrumbs: false
  }
]

const arrOperator= [
  {
    id: 'icons',
    title: 'Vendor',
    type: 'collapse',
    icon: icons.Man3Icon,
    url:null,
    children: [
      {
        id: 'AddNewVendor',
        title: 'Add new Vendor',
        type: 'item',
        url: `/utils/newVender/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'AddCarQnt',
        title: 'Add Car Quantity',
        type: 'item',
        url: `/utils/NewCar/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'NotAssign',
        title: 'Not Assigned',
        type: 'item',
        url: `/utils/notAssign/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Assigned',
        title: 'Assigned',
        type: 'item',
        url: '/utils/Assigned', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  },

 
 
  {
    id: 'icons',
    title: 'CarForms',
    type: 'collapse',
    icon: icons.DirectionsCarIcon,
    url:null,
    children: [
      {
        id: 'CarEditGrid',
        title: 'carEdit',
        type: 'item',
        url: '/carEdit', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'CreateBooking',
        title: 'CreateBooking',
        type: 'item',
        url: '/CreateBooking', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
  , {
    id: 'icons',
    title: 'Booking status',
    type: 'collapse',
    icon: icons.IconWindmill,
    url:null,
    children: [
      {
        id: 'Pending',
        title: 'Pending',
        type: 'item',
        url: '/status/Pending', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'EnRoute',
        title: 'EnRoute',
        type: 'item',
        url: '/status/EnRoute', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Complete',
        title: 'Completed',
        type: 'item',
        url: '/status/Completed', // or set it to a non-existent URL
        breadcrumbs: false
      },
      {
        id: 'NoShow',
        title: 'NoShow',
        type: 'item',
        url: '/status/NoShow', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Overdue',
        title: 'Overdue',
        type: 'item',
        url: '/status/Overdue', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Cancelled',
        title: 'Cancelled',
        type: 'item',
        url: '/status/Cancelled', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }

]




const SuperAdmin=[
  {
    id: 'icons',
    title: 'Vendor',
    type: 'collapse',
    icon: icons.Man3Icon,
    url:null,
    children: [
      {
        id: 'AddNewVendor',
        title: 'Add new Vendor',
        type: 'item',
        url: `/utils/newVender/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'AddCarQnt',
        title: 'Add Car Quantity',
        type: 'item',
        url: `/utils/NewCar/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'NotAssign',
        title: 'Not Assigned',
        type: 'item',
        url: `/utils/notAssign/${userid}`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Assigned',
        title: 'Assigned',
        type: 'item',
        url: '/utils/Assigned', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'icons',
    title: 'Operator',
    type: 'collapse',
    icon: icons.Man3Icon,
    url:null,
    children: [
      {
        id: 'AddNewOperator',
        title: 'Add new Operator',
        type: 'item',
        url: `/AddOperator`, // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  },

  
  {
    id: 'icons',
    title: 'CarForms',
    type: 'collapse',
    icon: icons.DirectionsCarIcon,
    url:null,
    children: [
      {
        id: 'CarEditGrid',
        title: 'carEdit',
        type: 'item',
        url: '/carEdit', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'CarApproved',
        title: 'CarApproved',
        type: 'item',
        url: '/CarApproved', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'CreateBooking',
        title: 'CreateBooking',
        type: 'item',
        url: '/CreateBooking', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
  , {
    id: 'icons',
    title: 'Booking status',
    type: 'collapse',
    icon: icons.IconWindmill,
    url:null,
    children: [
      {
        id: 'Pending',
        title: 'Pending',
        type: 'item',
        url: '/status/Pending', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'EnRoute',
        title: 'EnRoute',
        type: 'item',
        url: '/status/EnRoute', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Complete',
        title: 'Completed',
        type: 'item',
        url: '/status/Completed', // or set it to a non-existent URL
        breadcrumbs: false
      },
      {
        id: 'NoShow',
        title: 'NoShow',
        type: 'item',
        url: '/status/NoShow', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Overdue',
        title: 'Overdue',
        type: 'item',
        url: '/status/Overdue', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Cancelled',
        title: 'Cancelled',
        type: 'item',
        url: '/status/Cancelled', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
  ,
  {
    id: 'icons',
    title: 'Blogs',
    type: 'collapse',
    icon: icons.PostAddIcon,
    url:null,
    children: [
      {
        id: 'AllBlog',
        title: 'AllBlog',
        type: 'item',
        url: '/AllBlog', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'AddBlog',
        title: 'AddBlog',
        type: 'item',
        url: '/AddBlog', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'FavBlog',
        title: 'FavBlog',
        type: 'item',
        url: '/FavBlog', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
  ,
  {
    id: 'icons',
    title: 'Billing',
    type: 'collapse',
    icon: icons.AttachMoneyIcon,
    url:null,
    children: [
      {
        id: 'Generate Invoice',
        title: 'Generate Invoice',
        type: 'item',
        url: `/Invoice`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Advanced receipt',
        title: 'Advanced receipt',
        type: 'item',
        url: `/receipt`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      
      ,
      {
        id: 'Final Invoice',
        title: 'Final Invoice',
        type: 'item',
        url: `/FinalInvoice`, // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  },
]



const MarketingArr=[
  {
    id: 'icons',
    title: 'Blogs',
    type: 'collapse',
    icon: icons.PostAddIcon,
    url:null,
    children: [
      {
        id: 'AllBlog',
        title: 'AllBlog',
        type: 'item',
        url: '/AllBlog', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'AddBlog',
        title: 'AddBlog',
        type: 'item',
        url: '/addblog', // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'FavBlog',
        title: 'FavBlog',
        type: 'item',
        url: '/FavBlog', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
]


const CheckerArr=[

  {
    id: 'icons',
    title: 'CarForms',
    type: 'collapse',
    icon: icons.DirectionsCarIcon,
    url:null,
    children: [
      {
        id: 'CarEditGrid',
        title: 'carEdit',
        type: 'item',
        url: '/carEdit', // or set it to a non-existent URL
        breadcrumbs: false
      },
      {
        id: 'CarApproved',
        title: 'CarApproved',
        type: 'item',
        url: '/CarApproved', // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'icons',
    title: 'Billing',
    type: 'collapse',
    icon: icons.AttachMoneyIcon,
    url:null,
    children: [
      {
        id: 'Generate Invoice',
        title: 'Generate Invoice',
        type: 'item',
        url: `/Invoice`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      ,
      {
        id: 'Download receipt',
        title: 'Download receipt',
        type: 'item',
        url: `/receipt`, // or set it to a non-existent URL
        breadcrumbs: false
      }
      
      ,
      {
        id: 'Final Invoice',
        title: 'Final Invoice',
        type: 'item',
        url: `/FinalInvoice`, // or set it to a non-existent URL
        breadcrumbs: false
      }
    ]
  }
]

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  // children:role==='Vendor'?arrVendor:arrOperator
  children:role==='Vendor'?arrVendor:role==='Operator'?arrOperator:role==='Marketing'?MarketingArr:role==='Admin'?SuperAdmin:CheckerArr

};

export default utilities;
