export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  optionsLabel: string;
  options: { [id: string]: ProductOption };
}

export interface ProductOption {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
