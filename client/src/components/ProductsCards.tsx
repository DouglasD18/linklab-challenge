import { request } from "@/services/api";
import { Product } from "@/types/Product";
import { useState } from "react"
import { ProductCard } from "./ProductCard";
import { ShowToast, ToastProps } from "@/infos/ToastMessage";

export function ProductsCards() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useState(async () => {
    ShowToast({ message: "Please await...", type: "loading" });

    try {
      const response = await request();
      setProducts(response);
      ShowToast({ type: "success", message: "Success" });
    } catch (error) {
      ShowToast({ type: "error", message: "Something went wrong" });
    }
  })

  return (
    <div className="products-cards">
      <h2>PRODUTOS</h2>
      { products ? products.map(product => (
        <ProductCard product={ product } key={ product.name } />
      )) : 'Carregando...' }
    </div>
  )
}