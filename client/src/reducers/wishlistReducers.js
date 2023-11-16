import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const itemExists = state.wishlistItems.find(
        (i) => i.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((i) => {
            if (i.product === itemExists.product) {
              return item;
            }
            return i;
          }),
        };
      } else {
        return { ...state, wishlistItems: [...state.wishlistItems, item] };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
