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

app.get("/api/v1/search", (req, res) => {
  console.log(req.query);
  let sortedProducts = [...products];
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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
