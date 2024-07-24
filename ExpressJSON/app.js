const { products } = require("./products");
const express = require("express");
const PORT = 8000;
const app = express();
app.get("/api/products", (req, res) => {
  const mappedProducts = products.map((product) => {
    const { name, brand, price, rating } = product;
    return { name, brand, price, rating };
  });
  res.json(mappedProducts);
});

// app.get("/api/product/1", (req, res) => {
//   const productWithIDOne = products.find((product) => {
//     return product.id === 1;
//   });
//   console.log(productWithIDOne);
//   res.json(productWithIDOne);
// });

app.get("/api/product/:productID", (req, res) => {
  console.log(req.params);
  console.log(req.params.productID);
  res.status(200).send("hello");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
