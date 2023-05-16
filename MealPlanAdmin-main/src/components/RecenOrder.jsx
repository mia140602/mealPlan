import { Box, Pagination, Stack, Table, Text } from "@mantine/core";
import React from "react";
import { ListOrders } from "../pages/Orders";

const RecenOrder = () => {
  return (
    <Stack>
      <Text>Recent Order</Text>

      <ListOrders />
    </Stack>
  );
};

export default RecenOrder;
