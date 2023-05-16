import {
  AppShell,
  Aside,
  Burger,
  Footer,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const LayoutDefault = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavBar opened={opened} setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Outlet />
    </AppShell>
  );
};

export default LayoutDefault;
