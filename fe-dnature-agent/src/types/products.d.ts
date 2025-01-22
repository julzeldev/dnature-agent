export interface Product {
  productName: string;
  category: string;
  categorySlug: string;
  urlSlug: string;
  medida: string;
  precio: number;
  preciosPorUnidad: number;
  rating: number;
  imageCollection: {
    items: {
      title: string;
      url: string;
    }[];
  };
  sys: {
    id: string;
  };
}

export interface ProductCollection {
  productCollection: {
    items: Product[];
  };
}
