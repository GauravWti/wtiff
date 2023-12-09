import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
// import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const role = localStorage.getItem('role');
const menuItems = {
  items: [dashboard, utilities]
};

// Conditionally include 'pages' menu for Vendor role
if (role==='Admin') {
  menuItems.items.push(pages);
}

export default menuItems;
