import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiAction } from "./store/ui-slice";
import { fetchCartData } from "./store/Cart-Actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiAction.showNotification({
          status: "Pending",
          title: "Sending...",
          message: "sending cart data...",
        })
      );
      const response = await fetch(
        "https://react-req-fd3d6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch(
        uiAction.showNotification({
          status: "Success",
          title: "Success!",
          message: "sent cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      sendCartData().catch((error) => {
        dispatch(
          uiAction.showNotification({
            status: "Error",
            title: "Error!",
            message: "sending cart data failed",
          })
        );
      });
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
