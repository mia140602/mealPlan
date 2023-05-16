import React from "react";
import { Box, Center, createStyles, Flex, Stack, Text } from "@mantine/core";
import IconTotalNumber1 from "../assets/icons/IconTotalNumber1";
import IconOrderPending from "../assets/icons/IconOrderPending";
import IconOrderProcessing from "../assets/icons/IconOrderProcessing";
import IconOrderDelivered from "../assets/icons/IconOrderDelivered";

const StatisticalNumber = () => {
  const { classes } = makeStyles();

  const statisticalItemTop = [
    {
      id: 1,
      icon: <IconTotalNumber1 />,
      title: "Total Order",
      number: 295,
      color: "#feecdc",
    },
    {
      id: 2,
      icon: <IconOrderPending />,
      title: "Order Pending (5344.50)",
      number: 36,
      color: "#e1effe",
    },
  ];

  const statisticalItemBottom = [
    {
      id: 3,
      icon: <IconOrderProcessing />,
      title: "Order Processing",
      number: 41,
      color: "#d5f5f6",
    },
    {
      id: 4,
      icon: <IconOrderDelivered />,
      title: "Order Delivered",
      number: 217,
      color: "#def7ec",
    },
  ];

  return (
    <Flex className={classes.flex}>
      <Flex className={classes.flexItem}>
        {statisticalItemTop.map((item, index) => (
          <StatisticalNumberItem key={item.id} data={item} />
        ))}
      </Flex>

      <Flex className={classes.flexItem}>
        {statisticalItemBottom.map((item, index) => (
          <StatisticalNumberItem key={item.id} data={item} />
        ))}
      </Flex>
    </Flex>
  );
};

const StatisticalNumberItem = ({ data }) => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.item}>
      <Box className={classes.box} bg={data.color}>
        <Center className={classes.box}>{data.icon}</Center>
      </Box>
      <Stack spacing={5}>
        <Text className={classes.title}>{data.title}</Text>
        <Text className={classes.number}>{data.number}</Text>
      </Stack>
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },

  flexItem: {
    flex: 1,
    gap: 15,
  },

  item: {
    flex: 1,
    border: "1px solid #e5e7eb",
    padding: 20,
    borderRadius: 15,
    gap: 10,
    alignItems: "center",
  },

  box: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },

  title: {
    fontSize: 14,
  },
  number: {
    fontSize: 24,
    fontWeight: 600,
  },
}));

export default StatisticalNumber;
