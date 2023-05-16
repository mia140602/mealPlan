import React from "react";
import { Center, createStyles, Flex, Stack, Tabs, Text } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const salesData = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: [100, 2000, 2000, 33, 2222, 22222, 22222],
      borderColor: "RGB(16 ,185 ,129)",
      backgroundColor: "RGB(16 ,185 ,129)",
    },
  ],
};

export const ordersData = {
  labels,
  datasets: [
    {
      label: "Orders",
      data: [100, 2000, 2000, 33, 2222, 22222, 22222],
      borderColor: "RGB(249 115 22)",
      backgroundColor: "RGB(249 115 22)",
    },
  ],
};

export const bestSelling = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const StatisticalChart = () => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flex}>
      <StatisticalChartLeft />
      <StatisticalChartRight />
    </Flex>
  );
};

const StatisticalChartLeft = () => {
  const { classes } = makeStyles();

  return (
    <Stack className={classes.stack}>
      <Text>Weekly Sales</Text>

      <Tabs defaultValue="sales">
        <Tabs.List>
          <Tabs.Tab value="sales">Sales</Tabs.Tab>
          <Tabs.Tab value="orders">Orders</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="sales" pt="xs">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
            data={salesData}
          />
        </Tabs.Panel>

        <Tabs.Panel value="orders" pt="xs">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
            data={ordersData}
          />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

const StatisticalChartRight = () => {
  const { classes } = makeStyles();

  return (
    <Stack className={classes.stack}>
      <Text>Best Selling Products</Text>
      <Center className={classes.center}>
        <Pie data={bestSelling} />
      </Center>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },

  stack: {
    flex: 1,
    width: "50%",
    border: "1px solid #e5e7eb",
    padding: 20,
    borderRadius: 15,
    position: "relative",
    height: 400,
  },

  center: {
    height: "100%",
    paddingBottom: 50,
  },
}));

export default StatisticalChart;
