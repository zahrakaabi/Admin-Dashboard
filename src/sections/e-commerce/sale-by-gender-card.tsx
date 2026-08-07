/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import { CardTitle } from "@/components/cards";
import { RadialChart } from "@/components/charts";

/* -------------------------------------------------------------------------- */
/*                        SALE BY GENDER CARD COMPONENT                       */
/* -------------------------------------------------------------------------- */
function SaleByGenderCard() {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-lg">
        <CardTitle title="Sale by Gender" />
        <RadialChart 
          data={[84, 97, 61]} 
          labels={['Woman', 'Man', 'Kids']}
          colors={["#00A76F", "#FFAB00", "#FF5630"]}
          height={280} 
        />
    </div>
  )
};

export default SaleByGenderCard;