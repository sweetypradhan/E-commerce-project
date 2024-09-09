const initialState = {
  items: [] // Array to store cart items; each item should have an 'id' and 'quantity'
};

// Reducer function to handle cart actions
const cartReducer = (state = initialState, action) => {
  // Handle different types of actions
  switch (action.type) {
    
    // Action type for adding an item to the cart
    case 'ADD_TO_CART':
      // Find if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      // Check if the item exists in the cart
      if (existingItemIndex > -1) {
        // If the item exists, update its quantity
        return {
          ...state, // Spread the existing state
          items: state.items.map((item, index) =>
            // Check if the current item matches the existing item in the cart
            index === existingItemIndex
              // Update the quantity of the existing item
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item // Leave other items unchanged
          )
        };
      }

      // If the item does not exist, add it to the cart
      return {
        ...state, // Spread the existing state
        items: [...state.items, action.payload] // Add the new item to the cart
      };

    // Action type for removing an item from the cart
    case 'REMOVE_FROM_CART':
      // Remove the item with the specified id from the cart
      return {
        ...state, // Spread the existing state
        items: state.items.filter(item => item.id !== action.payload) // Filter out the item to be removed
      };

    // Default case to return the current state if no action type matches
    default:
      return state;
  }
};

export default cartReducer; // Export the reducer function to be used in the store
