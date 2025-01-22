import React from "react";
import { getProducts } from "../../services/products.service";
import { Product } from "../../types/Products";

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.sys.id}>
            <h2>{product.productName}</h2>
            <p>{product.category}</p>
            <p>{product.medida}</p>
            <p>{product.precio}</p>
            {/* <p>{product.preciosPorUnidad}</p> */}
            <p>{product.rating}</p>
            {product.imageCollection && product.imageCollection.items[0] && (
              <img
                width={200}
                src={product.imageCollection.items[0].url}
                alt={product.imageCollection.items[0].title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
