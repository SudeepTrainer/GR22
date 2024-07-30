const { products } = require("./products");
const express = require("express");
const logger = require("./logger");
const authenticate = require("./authenticate");
const morgan = require("morgan");
const PORT = 8000;
const app = express();

// middleware
// app.use([logger,authenticate]);
app.use(morgan("tiny"));

// routing methods150
app.get("/api/products", (req, res) => {
  const mappedProducts = products.map((product) => {
    const { name, brand, price, rating } = product;
    return { name, brand, price, rating };
  });
  //   res.json(mappedProducts);
  console.log(req.query);
  let sortedProducts = [...mappedProducts];
  const { query, limit } = req.query;
  if (query) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.brand.startsWith(query);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, limit);
  }
  if (sortedProducts.length > 1) {
    res.status(200).json(sortedProducts);
  } else {
    res
      .status(200)
      .json({ data: [], message: `No results found for ${query}` });
  }
});

app.get("/api/product/:productID", (req, res) => {
  console.log(req.params);
  console.log(req.params.productID);
  const foundProduct = products.find((product)=>{
    return product.id === Number(req.params.productID);
  });
  if(foundProduct){
    res.status(200).json(foundProduct);
  }else{
    res
        .status(200)
        .json({data:[],message:`Product with ID ${req.params.productID} not found`});
  }
});

// app.get("/api/v1/search", (req, res) => {
//   console.log(req.query);
//   let sortedProducts = [...products];
//   const { query, limit } = req.query;
//   if (query) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.brand.startsWith(query);
//     });
//   }
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, limit);
//   }
//   if (sortedProducts.length > 1) {
//     res.status(200).json(sortedProducts);
//   } else {
//     res
//       .status(200)
//       .json({ data: [], message: `No results found for ${query}` });
//   }
// });

// app.get("/api/product/1", (req, res) => {
//   const productWithIDOne = products.find((product) => {
//     return product.id === 1;
//   });
//   console.log(productWithIDOne);
//   res.json(productWithIDOne);
// });
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
