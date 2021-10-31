
export const formatText = (text) => {
    return text
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(' ', '-')
    .toLowerCase()
}

export const formatArrProperties = (arrProperties) => {
    return arrProperties.map(prop => {
        const address = getAddress(prop.link.data, prop.listing.address.stateAcronym)
        const {link: {name}} = prop
        const area = getArea(prop.listing)
        const {listing: {amenities}} = prop
        const pricingInfos = getPricingInfos(prop.listing.pricingInfos)
        const {medias:[{url: imgUrl}]} = prop
        return {address, name, area, amenities, pricingInfos, imgUrl}
    })
}

const getAddress = ({street, streetNumber, neighborhood, city}, state) => {
    return `${street}, ${streetNumber} - ${neighborhood}, ${city} - ${state}`
}

const getArea = (data) => {
    const {usableAreas:[usableAreas], bedrooms:[bedrooms], bathrooms:[bathrooms], parkingSpaces:[parkingSpaces]} = data
    const validBedrooms = `Quarto${VerifyPlural(bedrooms)}`
    const validBathrooms = `Banheiro${VerifyPlural(bathrooms)}`
    const validParkingSpaces = `Vaga${VerifyPlural(parkingSpaces)}`
    return `${usableAreas} m² ${bedrooms} ${validBedrooms} ${bathrooms} ${validBathrooms} ${parkingSpaces} ${validParkingSpaces}`
}

const VerifyPlural = (qtd) => qtd > 1 ? 's' : ''

const getPricingInfos = ([priceobj]) => {
    // console.log(priceobj)
    if(!priceobj.hasOwnProperty('monthlyCondoFee')) {
        return {
            price: priceobj.price, 
            monthlyCondoFee: false
        }
    }
    return{
        price: priceobj.price,
        monthlyCondoFee: priceobj.monthlyCondoFee
    }
}

export const getCityAndStateName = (data) => {
    // console.log(data)
    const {listing: {address: {city, stateAcronym:state}}} = data
    // console.log(city, ' - ', state)
    return {city, state}
}

export const translateAmenities = (amenity, dicionaryAmenities) => {
    return dicionaryAmenities
        .filter( item =>  amenity === item.word)
        .reduce((ac, item) => item.translated, '')
}
let debounceTimer;
export const debounce = (e, search, timer) => { //context, func, delay
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout( () => {
                search(e.target.value)
            },  timer)

  };