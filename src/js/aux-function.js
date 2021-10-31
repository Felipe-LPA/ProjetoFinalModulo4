// Formata o texto e retorna o mesmo padronizado
export const formatText = (text) => {
  return text
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();
};

// recebe um objeto e retorna outro somente com as informações necessárias
// para dar tratamento.
export const formatArrProperties = (arrProperties) => {
  return arrProperties.map((prop) => {
    const address = getAddress(
      prop.link.data,
      prop.listing.address.stateAcronym
    );
    const {
      link: { name },
    } = prop;
    const area = getArea(prop.listing);
    const {
      listing: { amenities },
    } = prop;
    const pricingInfos = getPricingInfos(prop.listing.pricingInfos);
    const {
      medias: [{ url: imgUrl }],
    } = prop;
    return { address, name, area, amenities, pricingInfos, imgUrl };
  });
};

const getAddress = ({ street, streetNumber, neighborhood, city }, state) => {
  return `${street}, ${streetNumber} - ${neighborhood}, ${city} - ${state}`;
};

// faz o tratamento de plural e quantidade e retorna um objeto com as informações
// organizadas
const getArea = (data) => {
  const {
    usableAreas: [usableAreas],
    bedrooms: [bedrooms],
    bathrooms: [bathrooms],
    parkingSpaces: [parkingSpaces],
  } = data;
  const validBedrooms = `Quarto${verifyPlural(bedrooms)}`;
  const validBathrooms = `Banheiro${verifyPlural(bathrooms)}`;
  const validParkingSpaces = `Vaga${verifyPlural(parkingSpaces)}`;
  return [
    {
      title: "m²",
      value: usableAreas,
    },
    {
      title: validBedrooms,
      value: verifyNull(bedrooms),
    },
    {
      title: validBathrooms,
      value: verifyNull(bathrooms),
    },
    {
      title: validParkingSpaces,
      value: verifyNull(parkingSpaces),
    },
  ];
};

const verifyPlural = (qtd) => (qtd > 1 ? "s" : "");

const verifyNull = (qtd) => {
  if (!qtd || qtd === 0) return "-";
  return qtd;
};
// verifica se existe condominio e retorna um obj com as informações do preço
const getPricingInfos = ([priceobj]) => {
  if (!priceobj.hasOwnProperty("monthlyCondoFee")) {
    return {
      price: priceobj.price,
      monthlyCondoFee: false,
    };
  }
  return {
    price: priceobj.price,
    monthlyCondoFee: priceobj.monthlyCondoFee,
  };
};

// faz uma verificação no obj para retornar o nome da cidade e a sigla do estado
export const getCityAndStateName = (data) => {
  const {
    listing: {
      address: { city, stateAcronym: state },
    },
  } = data;
  return { city, state };
};

// utiliza o dicionario para traduzir os amenities
export const translateAmenities = (amenity, dicionaryAmenities) => {
  return dicionaryAmenities
    .filter((item) => amenity === item.word)
    .reduce((ac, item) => item.translated, "");
};
// cria um "timer" para que a função não seja executada a todo momento.
let debounceTimer;
export const debounce = (e, search, timer) => {
  //context, func, delay
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    search(e.target.value);
  }, timer);
};
