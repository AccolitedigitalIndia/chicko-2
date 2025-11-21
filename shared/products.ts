export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "tops",
    name: "Tops",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a8a2c6008052338846cae6bec260590dfa3e5cde?width=192",
  },
  {
    id: "dresses",
    name: "Dresses",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860",
  },
  {
    id: "bottoms",
    name: "Bottoms",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a8a2c6008052338846cae6bec260590dfa3e5cde?width=192",
  },
  {
    id: "accessories",
    name: "Accessories",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/64dac7f003ea8759ac412708d9bdc40543b88157?width=860",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Silk Blend Tunic",
    price: 89.5,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/8af39074281630082168c452fc72bdaf2138be53?width=366",
    category: "tops",
    description:
      "Elegant silk blend tunic with delicate details. Perfect for both casual and formal occasions.",
    rating: 5,
    reviews: 128,
    colors: ["Ivory", "Blush", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Cotton Summer Dress",
    price: 129.0,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2ddc134b0c58a62bf03b2ecd3b5e270e5274f2e9?width=366",
    category: "dresses",
    description:
      "Breathable cotton summer dress with a flattering silhouette. Ideal for warm weather.",
    rating: 4.5,
    reviews: 95,
    colors: ["White", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Linen Wide Leg Pants",
    price: 79.5,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/f67f230abffed2738ae3cbc3d943655440eb1c74?width=366",
    category: "bottoms",
    description:
      "Comfortable linen wide leg pants with an elastic waistband. Effortlessly chic.",
    rating: 4.8,
    reviews: 76,
    colors: ["Beige", "Black", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Embroidered Blouse",
    price: 95.0,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/49a02839c723043613b28fac743b3b2ce108ed73?width=366",
    category: "tops",
    description:
      "Beautifully embroidered blouse with intricate patterns. A statement piece for any wardrobe.",
    rating: 5,
    reviews: 142,
    colors: ["White", "Cream", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Maxi Floral Dress",
    price: 149.0,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/791488612b362212273f22e8ab46080f3cebb267?width=366",
    category: "dresses",
    description:
      "Flowing maxi dress with vibrant floral print. Perfect for summer events and vacations.",
    rating: 4.7,
    reviews: 89,
    colors: ["Floral Multi", "Navy Floral", "Pink Floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    price: 185.0,
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/e581d93ee8ebe8e7bf849403f2ec4c3a7e861f9e?width=351",
    category: "accessories",
    description:
      "Premium leather crossbody bag with adjustable strap. Stylish and functional.",
    rating: 4.9,
    reviews: 203,
    colors: ["Tan", "Black", "Cognac"],
    sizes: ["One Size"],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};
