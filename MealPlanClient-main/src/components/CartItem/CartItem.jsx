import React, { useEffect, useState } from "react";
import Image from "../../assets/imgs/Home_Slider_1.png";
import IconTrash from "../../assets/icons/IconTrash";
import { useDispatch, useSelector } from "react-redux";
import { apiGet, apiPut } from "../../utils/https/request";
import {
  calcTotal,
  changeQuanity,
  removeItem,
  selectListCard,
} from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

const CartItem = ({ id, quanity, price }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const listData = useSelector(selectListCard);
  const { cartId } = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    const fetchingProductById = async () => {
      try {
        const response = await apiGet(`product/${id}`, {});
        setData(response.data);
      } catch (error) {}
    };

    fetchingProductById();
  }, [id]);

  function hanldeChangeQuanity(id, quanity) {
    dispatch(changeQuanity({ id, quanity }));
    dispatch(calcTotal());
  }

  async function hanldeRemoveItem() {
    const newData = listData.filter((item, _) => item.id !== id);
    const reponse = await apiPut(`cart/${cartId}`, newData, {});
    if (reponse.error === 0) {
      dispatch(removeItem({ id }));
      dispatch(calcTotal());
      toast("Cập nhật giỏ hàng thành công !", { type: "success" });
    } else {
      toast("Có lỗi xảy ra !", { type: "error" });
    }
  }

  return (
    <div className="cart_item d-flex align-items-center justify-content-between py-5 px-2 gap-2">
      <div className="cart_item_content">
        <div className="cart_header_mobile">
          <p>Product</p>
        </div>
        <div
          style={{
            width: "40%",
          }}
        >
          <img src={data?.image} alt="" className="w-100 h-100" />
        </div>
      </div>

      <div className="cart_item_content">
        <div className="cart_header_mobile">
          <p>Name</p>
        </div>

        <div>
          <p className="m-0">{data?.name}</p>
        </div>
      </div>
      <div className="cart_item_content">
        <div className="cart_header_mobile">
          <p>Price</p>
        </div>
        <div>
          <p className="m-0">${price}</p>
        </div>
      </div>
      <div className="cart_item_content d-flex justify-content-center align-items-center">
        <div className="cart_header_mobile">
          <p>Quanity</p>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn_minus"
            onClick={() => hanldeChangeQuanity(id, -1)}
          >
            -
          </button>
          <input
            className="input_cart"
            type="number"
            value={quanity}
            onChange={(e) => hanldeChangeQuanity(id, Number(e.target.value))}
          />
          <button
            className="btn btn_add"
            onClick={() => hanldeChangeQuanity(id, 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart_item_content">
        <div className="cart_header_mobile">
          <p>Total</p>
        </div>
        <div>
          <p className="m-0">${(data?.price * quanity).toFixed(2)}</p>
        </div>
      </div>
      <div className="cart_item_content">
        <div className="cart_header_mobile">
          <p>Remove</p>
        </div>
        <div onClick={() => hanldeRemoveItem()}>
          <IconTrash />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
