import {
  Box,
  Button,
  createStyles,
  Flex,
  Modal,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  requestGetCustomers,
  selectDataCustomer,
} from "../features/customer/customerSlice";
import IconDelete from "../assets/icons/IconDelete";
import IconDetail from "../assets/icons/IconDetail";
import { apiDelete } from "../utils/https/request";
import { toast } from "react-toastify";

const Customers = () => {
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetCustomers());
  }, []);

  return (
    <Stack>
      <Text className={classes.title}>Customers</Text>
      <SearchCustomer />
      <ListCustomers />
    </Stack>
  );
};

const SearchCustomer = () => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flex}>
      <TextInput placeholder="Search..." className={classes.input} />
    </Flex>
  );
};

const ListCustomers = () => {
  const listData = useSelector(selectDataCustomer);
  const [opened, setOpened] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();

  const ths = (
    <tr>
      <th>ID</th>
      <th>EMAIL</th>
      <th>ACTION</th>
    </tr>
  );

  async function handleDelete() {
    try {
      const { id } = JSON.parse(localStorage.getItem("admin"));
      const response = await apiDelete(`user/${id}/${selectedId}`, {});
      if (response.error === 0) {
        toast("Xóa thành công !", { type: "success" });
        dispatch(deleteCustomer(selectedId));
        setOpened(false);
      } else {
        toast("Có lỗi xảy ra !", { type: "error" });
      }
    } catch (error) {
      toast("Có lỗi xảy ra !", { type: "error" });
    }
  }

  const rows = listData?.map((element) => (
    <tr key={element._id}>
      <td>{element._id}</td>
      <td>{element.email}</td>
      <td>
        <Flex align="center" justify="center" gap={5}>
          <Box
            style={{ cursor: "pointer" }}
            // onClick={() => hanldeEdit(item._id)}
          >
            <IconDetail />
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpened(true);
              setSelectedId(element._id);
            }}
          >
            <IconDelete />
          </Box>
        </Flex>
      </td>
    </tr>
  ));

  return (
    <Stack>
      <Table captionSide="bottom" withBorder>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <Stack>
          <Text align="center">
            Bạn có chắc chắn muốn xóa người dùng này không !
          </Text>
          <Flex gap={10}>
            <Button
              variant="outline"
              style={{ flex: 1 }}
              onClick={() => setOpened(false)}
            >
              Hủy
            </Button>
            <Button style={{ flex: 1 }} onClick={() => handleDelete()}>
              Xóa
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 700,
  },

  flex: {
    border: "1px solid #e5e7eb",
    padding: 40,
    borderRadius: 15,
  },

  input: {
    width: "100%",
  },
}));

export default Customers;
