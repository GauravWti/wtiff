import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import AssignedBooking from 'views/utilities/AssignedBooking/AssignedBooking';
import VenderAllBooking from 'views/utilities/VenderSide/VendorAllBooking';
import CarEditGrid from 'views/utilities/CarForms/CarEditGrid';
import CreateBooking from 'views/utilities/Booking/CreateBooking';
import FinalInvoice from 'views/utilities/Billing/InVoice/FinalInvoice';
import AllBlogs from 'views/utilities/Blog/AllBlog';
import Form from 'views/utilities/Blog/AddBlog'
// import Pending from 'views/utilities/BookingStatus/PendingComponent/Pending';
import FavBlog from 'views/utilities/Blog/FavBlog';
// import EnRoute from 'views/utilities/BookingStatus/EnRoute/EnRoute';
// import Complete from 'views/utilities/BookingStatus/CompleteComponent/Complete';
// import NoShow from 'views/utilities/BookingStatus/NoShow/NoShow';
// import Overdue from 'views/utilities/BookingStatus/OverDueComponent/Overdue';
// import Cancelled from 'views/utilities/BookingStatus/CancelledComponent/Cancelled';
import CarApproved from 'views/utilities/CarForms/CarApproved';
import AdvancedRecipt from 'views/utilities/Billing/AdvancedRecipt/AdvancedReceipt';
import FunAndFinalInvoice from 'views/utilities/Billing/FullAndFinal/FullAndFinalInvoice';
import AddOperator from 'views/utilities/operator/AddOperator';
import BookingStatus from 'views/utilities/BookingStatus/BookingStatus';

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// utilities routing
const UserProfile = Loadable(lazy(() => import('views/ProfileSection/UserProfile')));
const AllOrders = Loadable(lazy(() => import('views/utilities/AllOrdersComponent/AllOrders')));
const NewVender = Loadable(lazy(() => import('views/utilities/AddVender/NewVender')));
const NewCar = Loadable(lazy(() => import('views/utilities/AddCar/NewCar')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
       path: '/register',
      element: <AuthRegister3 />
    },
    {
     path:'/Profile/:userid',
     element:<UserProfile/>
    },
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'notAssign/:userid',
          element: <AllOrders />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'Assigned',
          element: <AssignedBooking />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: `newVender/:userid`,
          element: <NewVender />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: `NewCar/:userid`,
          element: <NewCar />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'VendercarAssign/:venderID',
          element: <VenderAllBooking />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'caredit',
          element: <CarEditGrid />
        },
        {
          path: 'CarApproved',
          element: <CarApproved/>
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'CreateBooking',
          element: <CreateBooking />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'InVoice',
          element: <FinalInvoice />
        }
      ]
    },
    
    {
      path: '/',
      children: [
        {
          path: 'receipt',
          element: <AdvancedRecipt />
        }
      ]
    }
    ,
    
    {
      path: '/',
      children: [
        {
          path: 'FinalInvoice',
          element: <FunAndFinalInvoice />
        }
      ]
    }
    ,
    {
      path: '/',
      children: [
        {
          path: 'status/:status',
          element: <BookingStatus />
        }
      ]
    },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'EnRoute',
    //       element: <EnRoute />
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'Complete',
    //       element: <Complete />
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'NoShow',
    //       element: <NoShow />
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'Overdue',
    //       element: <Overdue/>
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'Cancelled',
    //       element: <Cancelled />
    //     }
    //   ]
    // },
    {
      path: '/',
      children: [
        {
          path: 'AllBlog',
          element: <AllBlogs />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'FavBlog',
          element: <FavBlog />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'AddBlog',
          element: <Form />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'AddOperator',
          element: <AddOperator />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
