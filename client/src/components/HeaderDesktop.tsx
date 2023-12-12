import Image from "next/image"
import Logo from "@/../public/images/logo.svg"
import Painel from "@/../public/images/painel.svg"
import { useState } from "react"
import { HeaderProducts } from "./HeaderProducts";

export function HeaderDesktop() {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const onClick = () => {
    setShowProducts(!showProducts);
  }

  return (
    <div className="header-desktop">
      <nav className="header-navbar">
        <div>
          <Image src={ Logo } alt={"Logo e nome da empresa"} />
          <div>Início</div>
          <div onClick={ () => onClick() }>
            Products
            <p>{ showProducts ? "^" : "ˇ"}</p>
          </div>
          <div>Laudos</div>
          <div>Sobre nós</div>
          <div>Certificações</div>
          <div>Contato</div>
        </div>
        <div>
          <Image src={ Painel } alt={"Imagem de um painel"} />
          Orçamento
        </div>
      </nav>
      { showProducts ? <HeaderProducts /> : "" }
    </div>
  )
}