import { getPropertiesData } from "./api-request.js";
import {
  setError,
  buildlistProperties,
  buildPathResult,
  buildResetButtonAside,
} from "./html-handler.js";
import {
  formatText,
  formatArrProperties,
  getCityAndStateName,
} from "./auxFunction.js";
import { dicionaryStateCity } from "./dicionaries-data.js";

const testando = "Rio de Janeiro";
const testando1 = "Sao Paulo ";
console.log();

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
  const cityAndState = getCityAndStateName(propertiesData.result.listings[0]);
  buildlistProperties(arrformatedObjProperties, amountProperties, cityAndState);
  buildPathResult(cityAndState);
  buildResetButtonAside(cityAndState)
};

teste(testando);
