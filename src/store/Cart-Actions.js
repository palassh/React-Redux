import { cartAction } from "./cart-slice";
import { uiAction } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-req-fd3d6-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching cart data failed");
      }

      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartAction.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }))
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "Error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  };
};
