import React, { useEffect, useState } from "react";
import {
  createStyles,
  Flex,
  Navbar as NavBarMantine,
  NavLink,
  Text,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import IconDashboard from "../assets/icons/IconDashboard";
import IconProducts from "../assets/icons/IconProducts";
import IconCustomers from "../assets/icons/IconCustomers";
import IconOrders from "../assets/icons/IconOrders";

const NavBar = ({ opened, setOpened }) => {
  const [active, setActive] = useState("");

  const { pathname } = useLocation();
  const { classes } = makeStyles();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const navBar = [
    {
      path: "/",
      name: "Dashboard",
      icon: <IconDashboard active={active === "/"} />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <IconProducts active={active === "/products"} />,
    },
    {
      path: "/customers",
      name: "Customers",
      icon: <IconCustomers active={active === "/customers"} />,
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <IconOrders active={active === "/orders"} />,
    },
  ];

  return (
    <NavBarMantine
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Flex direction="column">
        {navBar.map((item, index) => (
          <Link to={item.path} className={classes.link} key={index}>
            <NavLink
              label={item.name}
              className={classes.navLink}
              style={{
                borderLeft:
                  active === item.path ? "4px solid rgb(34, 139, 230)" : "",
              }}
              icon={item.icon}
              active={active === item.path}
            />
          </Link>
        ))}
      </Flex>
    </NavBarMantine>
  );
};

const makeStyles = createStyles((theme) => ({
  link: {
    width: "100%",
  },
  navLink: {
    padding: 20,
  },
}));

export default NavBar;
