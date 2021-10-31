import {  } from "./event-handler.js";
import { getPropertiesData } from "./api-request.js";
import {
  setError,
  buildlistProperties,
  buildPathResult,
  buildResetButtonAside,
  clearInputSearch,
} from "./html-handler.js";
import {
  formatText,
  formatArrProperties,
  getCityAndStateName,
} from "./aux-function.js";
import { dicionaryStateCity } from "./dicionaries-data.js";


export const search = async (city) => {
  const formatedCity = formatText(city);
  const cityAndStateNameAPI = dicionaryStateCity.filter(
    (item) => item.city === formatedCity || item.state === formatedCity
  );
  if (cityAndStateNameAPI.length !== 1) {
    setError();
    clearInputSearch()
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
  clearInputSearch()
};
