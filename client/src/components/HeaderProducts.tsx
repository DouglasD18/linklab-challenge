import Image from "next/image";
import Equipament from "@/../public/images/equipment.svg"
import Thermometers from "@/../public/images/thermometers.svg"
import Accessories from "@/../public/images/accessories.svg"
import Stell from "@/../public/images/steel.svg"
import Glassware from "@/../public/images/glassware.svg"
import Plastic from "@/../public/images/plastic.svg"
import Porcelain from "@/../public/images/porcelain.svg"

export function HeaderProducts() {
  return (
    <div className="header-products">
      <h2>Catálogo completo de itens para você</h2>
      <div className="options-card">
        <h3>Laborátótio</h3>
        <div className="options">
          <p><Image src={ Equipament } alt={"Equipamentos imagem"} />Equipamentos</p>
          <p><Image src={ Thermometers } alt={"Termômetros imagem"} />Termômetros</p>
          <p><Image src={ Accessories } alt={"Acssórios imagem"} />Acessórios</p>
        </div>
      </div>
      <div className="options-card">
        <h3>Utensílios</h3>
        <div className="options">
          <p><Image src={ Stell } alt={"Equipamentos imagem"} />Inox e Ferragens</p>
          <p><Image src={ Glassware } alt={"Termômetros imagem"} />Vidrarias</p>
          <p><Image src={ Plastic } alt={"Acssórios imagem"} />Plásticos</p>
          <p><Image src={ Porcelain } alt={"Acssórios imagem"} />Porcelanas</p>
        </div>
      </div>
    </div>
  ) 
}