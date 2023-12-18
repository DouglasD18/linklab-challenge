import Image from "next/image"
import Logo from "@/../public/images/logo.svg"
import Painel from "@/../public/images/painel.svg"
import Down from "@/../public/images/down.svg"
import Top from "@/../public/images/top.svg"

import { useState } from "react"
import { HeaderProducts } from "./HeaderProducts";

export function Header() {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const onClick = () => {
    setShowProducts(!showProducts);
  }

  return (
    <div className="header">
      <nav className="header-navbar">
        <div className="header-navbar-content">
          <Image src={ Logo } alt={"Logo e nome da empresa"} />
          <div>Início</div>
          <div onClick={ () => onClick() } >
            Products {" "}
            <span>{ showProducts ? <Image src={ Top } alt={"Seta apontando para cima"} /> : <Image src={Down} alt={"Seta apontando para baixo"} />}</span>
          </div>
          <div>Laudos</div>
          <div>Sobre nós</div>
          <div>Certificações</div>
          <div>Contato</div>
        </div>
        <div className="budget">
          <Image src={ Painel } alt={"Imagem de um painel"} />
          Orçamento
        </div>
      </nav>
      { showProducts ? <HeaderProducts /> : "" }
    </div>
  )
}