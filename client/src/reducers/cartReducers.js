import {
  ADD_TO_CART,
  CART_COUNT,
  CHANGE_QUANTITY_IN_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  GET_STRIPE_API_KEY,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {}, stripeKey: "" },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const itemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => {
            if (i.product === itemExists.product) {
              item.quantity = i.quantity + item.quantity;
              console.log(item.quantity);
              return item;
            }
            return i;
          }),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CHANGE_QUANTITY_IN_CART:
      const item2 = action.payload;

      const itemExists2 = state.cartItems.find(
        (i) => i.product === item2.product
      );
      if (itemExists2) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExists2.product ? item2 : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item2] };
      }

    case CART_COUNT:
      return { ...state, cartCount: action.payload };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case GET_STRIPE_API_KEY:
      return {
        ...state,
        stripeKey: action.payload,
      };
    case "CLEAR_CART_ITEMS":
      return {
        ...state,
        cartItems: [],
        cartCount: 0,
      };
    default:
      return state;
  }
};
