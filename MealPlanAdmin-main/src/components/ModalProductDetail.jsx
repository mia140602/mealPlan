import { Grid, Image, Modal, Stack, Text } from "@mantine/core";
import React from "react";

const ModalProductDetail = ({ opened, setOpened, data }) => {
  return (
    <Modal size={900} centered opened={opened} onClose={() => setOpened(false)}>
      <Grid>
        <Grid.Col span={3}>
          <Image src={data?.image} />
        </Grid.Col>

        <Grid.Col span={9}>
          <Stack spacing={5}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {data?.name}
            </Text>
            <Text>ID: {data?._id}</Text>
            <Text>${data?.price}</Text>
            <Text
              style={{
                color: "#707275",
              }}
            >
              {data?.description}
            </Text>
            <Text
              style={{
                fontWeight: 600,
              }}
            >
              Category: {data?.category.join(",")}
            </Text>
            <Text
              style={{
                fontWeight: 600,
              }}
            >
              Component: {data?.component.join(",")}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default ModalProductDetail;
