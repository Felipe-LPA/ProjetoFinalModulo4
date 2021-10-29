export const getPropertiesData = async([{state, city}]) => {
    try {
        const reponse = await axios(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`)
        // console.log(reponse.data)
        return reponse.data.search
    } catch (error) {
        return false
    }
}