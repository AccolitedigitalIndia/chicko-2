export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  onSale?: boolean;
  salePrice?: number;
  stock?: number;
  relatedProducts?: number[];
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
      "https://images.pexels.com/photos/30468634/pexels-photo-30468634.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "dresses",
    name: "Dresses",
    image:
      "https://images.pexels.com/photos/34812886/pexels-photo-34812886.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "bottoms",
    name: "Bottoms",
    image:
      "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "accessories",
    name: "Accessories",
    image:
      "https://images.pexels.com/photos/8365688/pexels-photo-8365688.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Silk Blend Tunic",
    price: 89.5,
    image:
      "https://images.pexels.com/photos/4659798/pexels-photo-4659798.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4659798/pexels-photo-4659798.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "tops",
    description:
      "Elegant silk blend tunic with delicate details. Perfect for both casual and formal occasions.",
    rating: 5,
    reviews: 128,
    colors: ["Ivory", "Blush", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    stock: 15,
    relatedProducts: [2, 3],
  },
  {
    id: 2,
    name: "Cotton Summer Dress",
    price: 129.0,
    image:
      "https://images.pexels.com/photos/1887465/pexels-photo-1887465.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1887465/pexels-photo-1887465.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7148444/pexels-photo-7148444.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "dresses",
    description:
      "Breathable cotton summer dress with a flattering silhouette. Ideal for warm weather.",
    rating: 4.5,
    reviews: 95,
    colors: ["White", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    onSale: true,
    salePrice: 99.0,
    stock: 8,
    relatedProducts: [1, 5],
  },
  {
    id: 3,
    name: "Linen Wide Leg Pants",
    price: 79.5,
    image:
      "https://images.pexels.com/photos/8989581/pexels-photo-8989581.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/8989581/pexels-photo-8989581.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "bottoms",
    description:
      "Comfortable linen wide leg pants with an elastic waistband. Effortlessly chic.",
    rating: 4.8,
    reviews: 76,
    colors: ["Beige", "Black", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    relatedProducts: [1, 4],
  },
  {
    id: 4,
    name: "Statement Earrings",
    price: 95.0,
    image:
      "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3266706/pexels-photo-3266706.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "accessories",
    description:
      "Elegant statement earrings with intricate design. Perfect accessory to elevate any outfit.",
    rating: 5,
    reviews: 142,
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["One Size"],
    isNew: true,
    stock: 25,
    relatedProducts: [3, 5],
  },
  {
    id: 5,
    name: "Maxi Floral Dress",
    price: 149.0,
    image:
      "https://images.pexels.com/photos/20883861/pexels-photo-20883861.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/20883861/pexels-photo-20883861.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7148426/pexels-photo-7148426.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    category: "dresses",
    description:
      "Flowing maxi dress with vibrant floral print. Perfect for summer events and vacations.",
    rating: 4.7,
    reviews: 89,
    colors: ["Floral Multi", "Navy Floral", "Pink Floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 3,
    relatedProducts: [2, 4],
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
