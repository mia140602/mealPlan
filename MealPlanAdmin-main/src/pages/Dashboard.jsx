import React from "react";
import { Stack } from "@mantine/core";
import Overview from "../components/Overview";
import StatisticalNumber from "../components/StatisticalNumber";
import StatisticalChart from "../components/StatisticalChart";
import RecenOrder from "../components/RecenOrder";

const Dashboard = () => {
  return (
    <Stack>
      <Overview />
      <StatisticalNumber />
      <StatisticalChart />
      <RecenOrder />
    </Stack>
  );
};

export default Dashboard;
