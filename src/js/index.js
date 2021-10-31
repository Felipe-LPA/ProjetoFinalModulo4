import {} from "./event-handler.js";
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

// função principal para fazer a busca aplicar o tratamento e incluir no DOM as informações
// das propriedades.
export const search = async (city) => {
  // const que recebe o nome da cidade formatado
  const formatedCity = formatText(city);
  // const que verifica se o nome da cidade formatado existe no dicionario
  const cityAndStateNameAPI = dicionaryStateCity.filter(
    (item) => item.city === formatedCity || item.state === formatedCity
  );
  // renderização do erro caso não for encontrada uma cidade compatível
  if (cityAndStateNameAPI.length !== 1) {
    setError();
    clearInputSearch();
    return;
  }
  // const que recebe o objeto da requisição da API
  const propertiesData = await getPropertiesData(cityAndStateNameAPI);
  // caso a api por algum motivo retorne um erro será renderizado um erro na tela.
  if (!propertiesData) {
    setError();
    return;
  }
  // const que recebe as informações necessárias para renderização da propriedade.
  const arrformatedObjProperties = formatArrProperties(
    propertiesData.result.listings
  );
  // const com a quantidade de propriedades recebidas na requisição
  const amountProperties = propertiesData.totalCount;
  // const que recebe um objeto que contem o nome da cidade e estado.
  const cityAndState = getCityAndStateName(propertiesData.result.listings[0]);
  // função que cria e renderiza os componentes a listagem de propriedades.
  buildlistProperties(arrformatedObjProperties, amountProperties, cityAndState);
  // função que cria e renderiza as informações do caminho percorrido até o resultado.
  buildPathResult(cityAndState);
  // função que cria o botão de reset no aside
  buildResetButtonAside(cityAndState);
  // função para limpar o campo de pesquisa.
  clearInputSearch();
};
