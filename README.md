# Triveous
# E-commerce API

This is an Express.js-based API for an e-commerce application. It provides various endpoints for managing products, categories, user carts, and orders.

## Getting Started

Follow the steps below to clone and run the application locally.

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database setup and running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/e-commerce-api.git
   cd e-commerce-api
   delete the package-lock.json file
### Install dependencies
  - npm install
### Start the application
 - npm run server

 
The API will be available at http://localhost:3000.

###API Endpoints

#User login/register

  -Endpoints: login /api/user/login
  
             register /api/user/register
             
   -Method: POST
   
   -Input : { 
          "name":String,
          "email":String,
          "password":String
        }

#Category Listing

  -Endpoint: /api/categories
  
   -Method: GET
   
   -Description: Get a list of categories.

Product Listing

Endpoint: /api/products/category/:categoryId

Method: GET

Description: Get a list of products based on the category ID.

Example: /api/products/category/123

Product Details

Endpoint: /api/products/:productId

Method: GET

Description: Get detailed information about a specific product by its ID.

Example: /api/products/456

### In all below endpoints provide token

    ex - headers:Bearer token ( In token userID is added so no need to add userID below anywhere )

Cart Management

Add Product to Cart

Endpoint: /api/cart/add

Method: POST

Description: Add a product to the user's cart.

Input:

productId (string) - Product ID

quantity (number, optional) - Quantity (default: 1)

Example Request:

{
  "productId": "456",
  "quantity": 2
}

#View Cart

Endpoint: /api/cart

Method: GET

Description: Get the user's cart by their user ID.

Example: /api/cart/789

#Update Cart Item Quantity

Endpoint: /api/cart/update/:cartItemId

Method: PUT

Description: Update the quantity of a specific item in the user's cart.

Input:

quantity (number) - New quantity

Example: /api/cart/update/123

#Remove Cart Item

Endpoint: /api/cart/remove/:cartItemId

Method: DELETE

Description: Remove a specific item from the user's cart.

Example: /api/cart/remove/123

Order Placement

Place Order

Endpoint: /api/orders/place-order

Method: POST

Description: Place an order with products from the user's cart.

Input:

Example: /api/orders/place-order

Output: Order details


Order History

Endpoint: /api/orders/history

Method: GET

Description: Get the order history for an authenticated user.

Example: /api/orders/history

Order Details

Endpoint: /api/orders/:orderId

Method: GET

Description: Get detailed information about a specific order by its ID.


###Authentication
  - Authentication is required for some endpoints. Ensure you include the user's authentication token in the request headers for those routes that require it.
Example: /api/orders/123
