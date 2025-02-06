const CartModel = require("../model/Cart");

exports.createCart = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Add item to cart"
  #swagger.description = 'Endpoint to add a product to the cart'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["productId", "name", "price", "image", "quantity", "email"],
          properties: {
            productId: { type: "string", example: "123456" },
            name: { type: "string", example: "Product Name" },
            price: { type: "number", example: 199.99 },
            image: { type: "string", example: "https://image-url.com/sample.jpg" },
            quantity: { type: "integer", example: 2 },
            email: { type: "string", example: "user@example.com" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "Item added to cart successfully",
    schema: { "$ref": "#components/schemas/CartResponse" }
  }
  #swagger.responses[400] = {
    description: "Missing required fields"
  }
  #swagger.responses[500] = {
    description: "Error creating cart"
  }
*/

  const { productId, name, price, image, quantity, email } = res.body;
  if (!productId || !name || !price || !image || !quantity || !email) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    // add the same items
    const existingItem = await CartModel.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }
    // add item first time
    const cart = new CartModel({
      productId,
      name,
      price,
      image,
      quantity,
      email,
    });
    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (error) {
    res.status(500).send({
      message: "Error creating cart",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Get all cart items"
  #swagger.description = 'Retrieve all items from the cart'
  #swagger.responses[200] = {
    description: "List of all cart items",
    schema: { "$ref": "#components/schemas/CartResponse" }
  }
  #swagger.responses[404] = {
    description: "No cart items found"
  }
*/

  try {
    const cartItems = await CartModel.find();
    if (!cartItems) {
      return res.status(404).json({ message: "No cart items found" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching cart items",
    });
  }
};

exports.getCartItemByEmail = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Get cart items by email"
  #swagger.description = 'Retrieve cart items associated with a user email'
  #swagger.parameters['email'] = {
    in: 'path',
    required: true,
    description: 'User email',
    type: 'string',
    example: 'user@example.com'
  }
  #swagger.responses[200] = {
    description: "Cart items retrieved successfully",
    schema: { "$ref": "#components/schemas/CartResponse" }
  }
  #swagger.responses[400] = {
    description: "Email is required"
  }
  #swagger.responses[404] = {
    description: "No cart items found for this email"
  }
*/

  const email = req.params;
  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }
  try {
    const cartItem = await CartModel.findOne({ email });
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "No cart item found for this email" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching cart item",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Update cart item"
  #swagger.description = 'Update an existing cart item by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'Cart item ID',
    type: 'string',
    example: '60b8d295f8d5c34f3c8a49b9'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            quantity: { type: "integer", example: 5 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "Cart item updated successfully"
  }
  #swagger.responses[404] = {
    description: "Cart item not found"
  }
  #swagger.responses[500] = {
    description: "Error updating cart item"
  }
*/

  const { id } = req.params;
  try {
    const cart = await CartModel.findByIdAndUpdate(id, req.body, {
      useFindModify: false,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart items not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating cart item",
    });
  }
};

exports.deleteCartItemById = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Delete cart item"
  #swagger.description = 'Remove an item from the cart using its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'Cart item ID',
    type: 'string',
    example: '60b8d295f8d5c34f3c8a49b9'
  }
  #swagger.responses[200] = {
    description: "Cart item deleted successfully"
  }
  #swagger.responses[404] = {
    description: "Cart item not found"
  }
  #swagger.responses[500] = {
    description: "Error deleting cart item"
  }
*/

  const { id } = req.params;
  try {
    const cartItem = await CartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting cart item",
    });
  }
};

exports.clearAllItem = async (req, res) => {
  /**
  #swagger.tags = ['Cart']
  #swagger.summary = "Clear all cart items for a user"
  #swagger.description = 'Remove all items from the cart for a specific user'
  #swagger.parameters['email'] = {
    in: 'path',
    required: true,
    description: 'User email',
    type: 'string',
    example: 'user@example.com'
  }
  #swagger.responses[200] = {
    description: "Cart cleared successfully"
  }
  #swagger.responses[404] = {
    description: "No cart items found"
  }
  #swagger.responses[500] = {
    description: "Error clearing cart items"
  }
*/

  const { email } = req.params;
  try {
    const cart = await CartModel.deleteMany({ email });
    if (cart.deletedCount > 0) {
      return res.json({ message: "Cart cleared successfully" });
    }
    if (!cart) {
      res.status(404).json({ message: "No cart items found" });
    }
    res.status(200).json({ message: "Cart is already empty" });
  } catch (error) {
    res.status(500).send({ message: "Error clearing cart item" });
  }
};