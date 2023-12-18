import Image from "next/image";
import Glassware from "@/../public/images/glassware.svg"
import Plastic from "@/../public/images/plastic.svg"
import Tools from "@/../public/images/tools.svg"

export function OptionsCard() {
  return (
    <div className="options-card">
      <div className="options">
        <h3>PRODUTOS</h3>
        <div>
          <Image src={ Glassware } alt={""} />
          <p>Vidrarias e</p>
          <p>Equipamentos</p>
        </div>
      </div>
      <div className="options">
        <h3>QUÍMICOS</h3>
        <div>
          <Image src={ Plastic } alt={""} />
          <p>Materiais</p>
          <p>Químicos</p>
        </div>
      </div>
      <div className="options">
        <h3>LABORATÓRIOS</h3>
        <div>
          <Image src={ Tools } alt={""} />
          <p>Ferramentas</p>
          <p>e utensílios</p>
        </div>
      </div>
    </div>
  )
}