/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/Product"

export interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, image, note, value } = product;

  return (
    <div>
      <img src={ `data:image/svg+xml;utf8,${encodeURIComponent(image)}` } alt={ `${name} image` } />
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