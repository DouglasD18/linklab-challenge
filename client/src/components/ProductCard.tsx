import { Product } from "@/types/Product"
import Image from "next/image"

export interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, image, note, value } = product;

  return (
    <div>
      <Image src={ image } alt={ `${name} image` } />
      <div>
        <div>
          <p>{ name }</p>
          <p>Nota: { `${note.toFixed(1)}` }</p>
        </div>
        <div>
          <p>R$ { `${value.toFixed(2).toLocaleString()}` }</p>
        </div>
      </div>
    </div>
  )
}