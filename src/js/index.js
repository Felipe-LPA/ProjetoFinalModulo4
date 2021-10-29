import { getPropertiesData } from "./api-request.js";
import { setError, buildlistProperties } from "./html-handler.js";
import { formatText, formatArrProperties, getCityAndStateName } from "./auxFunction.js";
const dicionaryStateCity = [
  {
    city: "sao-paulo",
    state: "sp",
  },
  {
    city: "rio-de-janeiro",
    state: "rj",
  },
];
const testando = "Rio de Janeiro";
const testando1 = "Sao Paulo ";
console.log();
// console.log()

// console.log(dicionaryStateCity);

const teste = async (city) => {
  const formatedCity = formatText(city);
  const cityAndStateNameAPI = dicionaryStateCity.filter(
    (item) => item.city === formatedCity
  );
//   console.log(cityAndStateName);
  if (cityAndStateNameAPI.length !== 1) {
    setError();
    return;
  }
  const propertiesData = await getPropertiesData(cityAndStateNameAPI);
  if (!propertiesData) {
    setError();
    return;
  }
  const arrformatedObjProperties = formatArrProperties(
    propertiesData.result.listings
  );
  const amountProperties = propertiesData.totalCount;
//   console.log(amountProperties);
const cityAndState = getCityAndStateName(propertiesData.result.listings[0])
  buildlistProperties(arrformatedObjProperties, amountProperties, cityAndState)
};

teste(testando1);
