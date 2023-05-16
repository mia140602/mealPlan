import IconCustomers from "../assets/icons/IconCustomers";
import IconDashboard from "../assets/icons/IconDashboard";
import IconOrders from "../assets/icons/IconOrders";
import IconProducts from "../assets/icons/IconProducts";

export const navBar = [
  {
    path: "/",
    name: "Dashboard",
    icon: <IconDashboard />,
  },
  {
    path: "/products",
    name: "Products",
    icon: <IconProducts />,
  },
  {
    path: "/customers",
    name: "Customers",
    icon: <IconCustomers />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <IconOrders />,
  },
];
