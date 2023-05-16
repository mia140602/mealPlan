import React from "react";
import { Box, Center, createStyles, Flex, Stack, Text } from "@mantine/core";

import IconTodayOrder from "../assets/icons/IconTodayOrder";
import IconThisMonth from "../assets/icons/IconThisMonth";
import IconTotalOrder from "../assets/icons/IconTotalOrder";

const Overview = () => {
  const { classes } = makeStyles();
  const overviewArray = [
    {
      icon: <IconTodayOrder />,
      title: "Today Order",
      number: 0,
      color: "#0694a2",
    },
    {
      icon: <IconThisMonth />,
      title: "This Month",
      number: 4254.4,
      color: "#3f83f8",
    },
    {
      icon: <IconTotalOrder />,
      title: "Total Order",
      number: 39511.95,
      color: "#0e9f6e",
    },
  ];

  return (
    <Stack>
      <Text className={classes.title}>Dashboard Overview</Text>
      <Flex className={classes.flex}>
        {overviewArray.map((item, index) => (
          <OverviewItem key={index} data={item} />
        ))}
      </Flex>
    </Stack>
  );
};

const OverviewItem = ({ data }) => {
  const { classes } = makeStyles();

  return (
    <Stack bg={data.color} className={classes.stack}>
      <Center>
        <Stack align="center" spacing={10}>
          <Stack align="center" spacing={5}>
            <Box>{data.icon}</Box>
            <Text className={classes.text}>{data.title}</Text>
          </Stack>
          <Text className={classes.number}>{data.number} VND</Text>
        </Stack>
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
    borderRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
  },

  text: {
    fontSize: 16,
    color: "#fff",
  },
  number: {
    fontSize: 30,
    fontWeight: 700,
    color: "#fff",
  },
}));

export default Overview;
