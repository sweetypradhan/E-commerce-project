const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        // If the item already exists, increase the quantity
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // If the item doesn't exist, add it to the cart with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      // Decrease quantity or remove item
      const itemToRemove = state.items.find(item => item._id === action.payload);
      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      // If quantity is 1, remove the item
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };

    // Other cases (if any)
    default:
      return state;
  }
};

export default cartReducer;
