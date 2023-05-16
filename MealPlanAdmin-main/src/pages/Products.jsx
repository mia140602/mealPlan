import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  createStyles,
  Drawer,
  FileInput,
  Flex,
  MultiSelect,
  NumberInput,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WithAsteriskCustoms from "../components/WithAsteriskCustoms";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  requestGetProducts,
  selectDataProduct,
  updateProduct,
} from "../features/product/productSlice";
import IconPublish from "../assets/icons/IconPublish";
import IconDelete from "../assets/icons/IconDelete";
import IconEdit from "../assets/icons/IconEdit";
import IconDetail from "../assets/icons/IconDetail";
import { useForm } from "@mantine/form";
import axios from "axios";
import { toast } from "react-toastify";
import { apiDelete, apiPost, apiPut } from "../utils/https/request";
import ModalProductDetail from "../components/ModalProductDetail";

const Products = () => {
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetProducts());
  }, []);

  return (
    <Stack>
      <Text className={classes.title}>Products</Text>
      <FilterProduct />
      <ListProducts />
    </Stack>
  );
};

const FilterProduct = () => {
  const { classes } = makeStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex className={classes.flexFilter}>
      <Box className={classes.box}>
        <TextInput placeholder="Search..." />
      </Box>
      <Box className={classes.box}>
        <Select
          placeholder="Category"
          data={[
            { value: "Chicken", label: "Chicken" },
            { value: "Pasta ", label: "Pasta" },
            { value: "Noodles", label: "Noodles" },
            { value: "Seafood", label: "Seafood" },
            { value: "Leftovers", label: "Leftovers" },
            { value: "Soup", label: "Soup" },
            { value: "Slow Cooker", label: "Slow Cooker" },
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Select
          placeholder="Price"
          data={[
            { value: "Meat", label: "Meat" },
            { value: "Vegetables", label: "Vegetables" },
            { value: "Fruits", label: "Fruits" },
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Button className={classes.button} onClick={open}>
          + Add Product
        </Button>
      </Box>

      <DrawerAddProduct opened={opened} open={open} close={close} />
    </Flex>
  );
};

const DrawerAddProduct = ({ opened, open, close }) => {
  const { classes } = makeStyles();
  const [file, setFile] = useState(null);
  const [component, setComponent] = useState([]);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      // quanity: 0,
      price: 0,
      sale: 0,
    },
  });

  async function hanldeAddProduct(values) {
    // Updload image
    let formData = new FormData();
    formData.append("image", file);

    try {
      const img = await axios.post(
        `https://api.imgbb.com/1/upload?key=8116c46e1fcd746f6edde5648f74174d`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const payload = {
        image: img.data.data.url,
        category: category,
        component: component,
        rate: 5,
        name: values.name,
        description: values.description,
        // quanity: values.quanity, // stock
        price: values.price,
        discount: values.sale,
      };
      const response = await apiPost("product", payload, {});
      if (response.error === 0) {
        // update state
        dispatch(addProduct({ ...payload, _id: response.data.insertedId }));
        toast("Thêm sản phẩm thành công !", { type: "success" });
        close();
      }
    } catch (error) {
      toast("Có lỗi xảy ra !", { type: "error" });
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      size={700}
      title={
        <Stack spacing={0}>
          <Text fw="bold">Add Product</Text>
          <Text>Add your product and necessary information from here</Text>
        </Stack>
      }
    >
      {/* Drawer content */}
      <form onSubmit={form.onSubmit((values) => hanldeAddProduct(values))}>
        <Stack spacing={20}>
          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Image <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <FileInput
                placeholder="Pick file"
                value={file}
                onChange={setFile}
                accept="image/png,image/jpeg"
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Title/Name <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <TextInput
                placeholder="Product Title/Name"
                {...form.getInputProps("name")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Description <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <Textarea
                placeholder="Product Description"
                {...form.getInputProps("description")}
              />
            </Box>
          </Flex>

          {/* <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Quantity <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Product Quantity"
                type="number"
                {...form.getInputProps("quanity")}
              />
            </Box>
          </Flex> */}

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Price <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Product Price"
                type="number"
                {...form.getInputProps("price")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Sale Percent <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Sale Percent"
                {...form.getInputProps("sale")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Category <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <MultiSelect
                value={category}
                onChange={setCategory}
                placeholder="Pick category"
                data={[
                  { value: "Chicken", label: "Chicken" },
                  { value: "Pasta ", label: "Pasta" },
                  { value: "Noodles", label: "Noodles" },
                  { value: "Seafood", label: "Seafood" },
                  { value: "Leftovers", label: "Leftovers" },
                  { value: "Soup", label: "Soup" },
                  { value: "Slow Cooker", label: "Slow Cooker" },
                ]}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Component <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <MultiSelect
                value={component}
                onChange={setComponent}
                placeholder="Pick component"
                data={[
                  { value: "Meat", label: "Meat" },
                  { value: "Vegetables", label: "Vegetables" },
                  { value: "Fruits", label: "Fruits" },
                ]}
              />
            </Box>
          </Flex>

          <Flex gap={10} className={classes.flexBtnDrawer}>
            <Button className={classes.boxF1}>Cancel</Button>
            <Button className={classes.boxF1} type="submit">
              Add Product
            </Button>
          </Flex>
        </Stack>
      </form>
    </Drawer>
  );
};

const DrawerEditProduct = ({ opened, open, close, data }) => {
  const { classes } = makeStyles();
  const [file, setFile] = useState(null);
  const [component, setComponent] = useState([]);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      // quanity: 0,
      price: 0,
      sale: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue("name", data?.name);
      form.setFieldValue("description", data?.description);
      form.setFieldValue("price", data?.price);
      form.setFieldValue("sale", data?.discount);
      setCategory(data?.category);
      setComponent(data?.component);
    }
  }, [data]);

  async function hanldeEditProduct(values) {
    // Updload image
    let formData = new FormData();
    formData.append("image", file);

    try {
      let img;
      if (file) {
        img = await axios.post(
          `https://api.imgbb.com/1/upload?key=8116c46e1fcd746f6edde5648f74174d`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      const payload = {
        image: file ? img.data.data.url : data?.image,
        category: category,
        component: component,
        rate: 5,
        name: values.name,
        description: values.description,
        // quanity: values.quanity, // stock
        price: values.price,
        discount: values.sale,
      };
      const response = await apiPut(`product/${data?._id}`, payload, {});
      if (response.error === 0) {
        // update state
        dispatch(updateProduct({ ...payload, _id: data?._id }));
        toast("Cập nhật thành công !", { type: "success" });
        close();
      }
    } catch (error) {
      console.log(error);
      toast("Có lỗi xảy ra !", { type: "error" });
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      size={700}
      title={
        <Stack spacing={0}>
          <Text fw="bold">Edit Product</Text>
          <Text>Edit your product and necessary information from here</Text>
        </Stack>
      }
    >
      {/* Drawer content */}
      <form onSubmit={form.onSubmit((values) => hanldeEditProduct(values))}>
        <Stack spacing={20}>
          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Image <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <FileInput
                placeholder="Pick file"
                value={file}
                onChange={setFile}
                accept="image/png,image/jpeg"
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Title/Name <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <TextInput
                placeholder="Product Title/Name"
                {...form.getInputProps("name")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Description <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <Textarea
                placeholder="Product Description"
                {...form.getInputProps("description")}
              />
            </Box>
          </Flex>

          {/* <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Quantity <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Product Quantity"
                type="number"
                {...form.getInputProps("quanity")}
              />
            </Box>
          </Flex> */}

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Product Price <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Product Price"
                type="number"
                {...form.getInputProps("price")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Sale Percent <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <NumberInput
                placeholder="Sale Percent"
                {...form.getInputProps("sale")}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Category <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <MultiSelect
                value={category}
                onChange={setCategory}
                placeholder="Pick category"
                data={[
                  { value: "Chicken", label: "Chicken" },
                  { value: "Pasta ", label: "Pasta" },
                  { value: "Noodles", label: "Noodles" },
                  { value: "Seafood", label: "Seafood" },
                  { value: "Leftovers", label: "Leftovers" },
                  { value: "Soup", label: "Soup" },
                  { value: "Slow Cooker", label: "Slow Cooker" },
                ]}
              />
            </Box>
          </Flex>

          <Flex className={classes.flexDrawer}>
            <Box className={classes.boxF1}>
              <Text className={classes.titleDrawer}>
                Component <WithAsteriskCustoms />
              </Text>
            </Box>
            <Box className={classes.boxF1}>
              <MultiSelect
                value={component}
                onChange={setComponent}
                placeholder="Pick component"
                data={[
                  { value: "Meat", label: "Meat" },
                  { value: "Vegetables", label: "Vegetables" },
                  { value: "Fruits", label: "Fruits" },
                ]}
              />
            </Box>
          </Flex>

          <Flex gap={10} className={classes.flexBtnDrawer}>
            <Button className={classes.boxF1}>Cancel</Button>
            <Button className={classes.boxF1} type="submit">
              Edit Product
            </Button>
          </Flex>
        </Stack>
      </form>
    </Drawer>
  );
};

const ListProducts = () => {
  const list = useSelector(selectDataProduct);
  const [data, setData] = useState([]);
  const { classes } = makeStyles();

  const [filterData, setFilterData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  const [openedDetailModal, setOpenedDetailModal] = useState(false);

  function hanldeEdit(id) {
    open();
    const item = list.find((item, _) => item._id === id);
    setFilterData(item);
  }

  function handleDetail(id) {
    setOpenedDetailModal(true);
    const item = list.find((item, _) => item._id === id);
    setFilterData(item);
  }

  async function handleDelete(id) {
    try {
      const response = await apiDelete(`product/${id}`, {});
      if (response.error === 0) {
        // Update state
        dispatch(deleteProduct(response.data));
        toast("Xóa sản phẩm thành công !", { type: "success" });
      }
    } catch (error) {
      toast("Có lỗi xảy ra !", { type: "error" });
    }
  }

  useEffect(() => {
    if (list.length > 0) {
      const newList = list.map((item, _) => ({
        ...item,
        category: item.category.join(" & "),
        component: item.component.join(" & "),
        stock: 20,
        status: <Badge color="green">Sell</Badge>,
        detail: (
          <Box onClick={() => handleDetail(item._id)}>
            <IconDetail />
          </Box>
        ),
        published: <IconPublish />,
        action: (
          <Flex align="center" justify="center" gap={5}>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => hanldeEdit(item._id)}
            >
              <IconEdit />
            </Box>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(item._id)}
            >
              <IconDelete />
            </Box>
          </Flex>
        ),
      }));

      setData(newList);
    }
  }, [list]);

  const ths = (
    <tr>
      <th>ID</th>
      <th>PRODUCT NAME</th>
      <th>CATEGORY</th>
      <th>COMPONENT</th>
      <th>PRICE</th>
      <th>STOCK</th>
      <th>STATUS</th>
      <th>DISCOUNT</th>
      <th>DETAILS</th>
      <th>PUBLISHED</th>
      <th>ACTIONS</th>
    </tr>
  );

  const rows = data?.map((element) => (
    <tr key={element._id}>
      <td>{element._id}</td>
      <td>{element.name}</td>
      <td>{element.category}</td>
      <td>{element.component}</td>
      <td>{element.price}</td>
      <td>{element.stock}</td>
      <td>{element.status}</td>
      <td>{element.discount ? `${element.discount} %` : ""}</td>
      <td>{element.detail}</td>
      <td>{element.published}</td>
      <td>{element.action}</td>
    </tr>
  ));

  return (
    <Stack className={classes.stackRoot}>
      <Table captionSide="bottom" withBorder>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>

      <DrawerEditProduct
        opened={opened}
        open={open}
        close={close}
        data={filterData}
      />

      <ModalProductDetail
        opened={openedDetailModal}
        setOpened={setOpenedDetailModal}
        data={filterData}
      />
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  box: {
    flex: 1,
  },

  flexFilter: {
    alignItems: "center",
    justifyContent: "spact-between",
    gap: 10,
    border: "1px solid #e5e7eb",
    padding: 40,
    borderRadius: 15,
  },

  button: {
    width: "100%",
  },

  flexDrawer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  boxF1: {
    flex: 1,
  },
  titleDrawer: {
    fontSize: 14,
  },

  flexBtnDrawer: {
    marginTop: 20,
  },

  stackRoot: {
    overflow: "auto",
  },
}));
export default Products;
