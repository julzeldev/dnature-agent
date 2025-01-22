import { Product, ProductCollection } from "../types/Products";
import { fetchFromContentful } from "./fetchFromContentful";

const productsQuery = () => `
{
    productCollection {
        items {
            productName
            category
            categorySlug
            urlSlug
            medida
            precio
            preciosPorUnidad
            rating
            imageCollection {
                items {
                    title
                    url
                }
            }
            sys {
                id
            }
        }
    }
}
`;

export const getProducts = async (): Promise<Product[]> => {
  const data = ((await fetchFromContentful(
    productsQuery()
  )) as ProductCollection) || { productCollection: { items: [] } };
  return data.productCollection.items;
};
