# triveous-assignment
This repository contains API documentation for Triveous E-commerce-backend

# Tech-Stack-Used
<p align = "center">

<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
  
</p>


# API Endpoints
  #### Home
  ```` javascript
  GET https://trivious-cfu1.onrender.com/
  ````
  ## User

  #### Signup
  ```` javascript
  POST https://trivious-cfu1.onrender.com/api/user/register
  ````
````javascript
  {
    name: string (required),
    email: demoo@gmail.com in email format (required),
    password: 123456
  }
````
```` javascript
200 (Ok): { msg: "user already exist" }
201 (ok): { msg: "signup has been done"}
````

#### Login
```` javascript
  POST https://trivious-cfu1.onrender.com/api/user/login
  ````
````javascript
  {
    
    email: demoo@gmail.com in email format (required),
    password: 123456,
    
  }
````
```` javascript
200 (Ok): { msg: "login successful", token }
401 (account does not exists): {msg: 'user not found'  }
````

## Product

#### GetProduct By Category
```` javascript
  GET https://trivious-cfu1.onrender.com/api/products/category/:categoryId
  ````

```` javascript
res.status(200).send({ products: products })
res.status(500).send({ msg: "something went wrong try again " })
````

#### GetProduct By id
```` javascript
  GET https://trivious-cfu1.onrender.com/api/products/:productId
  ````


  

```` javascript
res.status(200).send({ products: products })
res.status(500).send({ msg: "something went wrong try again " })
````

#### Category Listing

```` javascript
  GET https://trivious-cfu1.onrender.com/api/categories
  ````


  

```` javascript
res.status(201).send({ category:category });
res.status(500).send({ msg: "something went wrong try again " })
````
## In all below endpoints provide token
````
   ex - headers:Bearer token ( In token userID is added so no need to add userID below anywhere )
   ````

## Cart
#### Add to Cart
```` javascript
  POST https://trivious-cfu1.onrender.com/api/cart/add
  ````

````Input
  productId (string) - Product ID

  quantity (number, optional) - Quantity (default: 1)
  

  

```` javascript
res.status(204).send({ "msg": "product already exist in your cart" })
res.status(500).send({ msg: "something went wrong try again " })
res.status(201).send({ msg: "product has been added in cart" });
````

#### Remove From Cart

```` javascript
  DELETE https://trivious-cfu1.onrender.com/api/cart/remove/:cartItemId
  ````



  

```` javascript
res.status(204).send({ msg: "product has been removed from cart" });
res.status(500).send({ msg: "something went wrong try again " })

````

#### Update Cart Product 
```` javascript
  PUT https://trivious-cfu1.onrender.com/api/cart/update/:cartItemId
  ````



  

```` javascript
res.status(204).send({ msg: "product has been updated in cart" });
res.status(500).send({ msg: "something went wrong try again " })

````

#### Get Cart Products

```` javascript
  GET https://trivious-cfu1.onrender.com/api/cart
  ````



  

```` javascript
res.status(200).send(AllCartProducts);
res.status(500).send({ msg: "something went wrong try again " })

````

## Order
#### Order place
```` javascript
  POST https://trivious-cfu1.onrender.com/api/orders/place-order
  ````



  

```` javascript
res.status(201).send({ "msg": "order has been placed" })
res.status(500).send({ msg: "something went wrong try again " })

````

#### Get All Order History
```` javascript
  GET https://trivious-cfu1.onrender.com/api/orders/history
  ````



  

```` javascript
res.status(200).send(AllOrderProducts)
res.status(500).send({ msg: "something went wrong try again " })

````

#### Get Order Details
```` javascript
  GET https://trivious-cfu1.onrender.com/api/orders/:orderId
  ````



  

```` javascript
res.status(200).send(orderDetails)
res.status(500).send({ msg: "something went wrong try again " })
res.status(404).send({ "msg": "Did not placed any order" })

````


















  




 
