/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/Product"

export interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, image, note, value } = product;

  return (
    <div className="product-card">
      <img style={{ width: "18vw" }} src={ `data:image/svg+xml;utf8,${encodeURIComponent(image)}` } alt={ `${name} image` } />
      <div className="infos">
        <div>
          <p>{ name }</p>
          <p className="note">Nota: { `${note.toFixed(1)}` }</p>
        </div>
        <div>
          <p>R$ { `${value.toFixed(2).replace(".", ",")}` }</p>
        </div>
      </div>
    </div>
  )
}