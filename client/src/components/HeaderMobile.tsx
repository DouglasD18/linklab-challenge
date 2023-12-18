import Image from "next/image"
import Logo from "@/../public/images/logo.svg"
import Painel from "@/../public/images/painel.svg"
import Hamburguer from "@/../public/images/hamburguer.svg"

import { useState } from "react"
import { HeaderProducts } from "./HeaderProducts"

export function HeaderMobile() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const onClick = () => {
    setShowSideBar(!showSideBar);
  }

  function onFalse() {
    return (
      <div>
        <h3>Qualidade e expertise em produtos <span>químicos e acessórios</span></h3>
        <p>Estamos preparados para te entender e atender da melhor forma para suprir todas as suas demandas em químicos e similares.</p>
      </div>
    )
  }

  function onTrue() {
    return (
      <div>
        <h2>Navegue por nosso site</h2>
        <div>
          <p>Início</p>
          <p>Laudos</p>
          <p>Sobre nós</p>
          <p>Certificações</p>
          <p>Contato</p>
        </div>
        <HeaderProducts />
      </div>
    )
  }

  return (
    <div className="header-mobile">
      <div className="header-navbar">
        <Image src={Logo} alt={"Logo e nome da empresa"} />
        <div>
          <Image src={ Painel } alt={"Imagem de um painel"} />
          <Image src={ Hamburguer } alt={"Menu hamburguer"} onClick={() => onClick()} />
        </div>
      </div>
      <div className="header-content">
        { showSideBar ? onFalse() : onTrue() }
      </div>
    </div>
  )
}