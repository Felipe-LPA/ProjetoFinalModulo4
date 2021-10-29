const doResultReset = (element) => {
  element.innerHTML = "";
}
;
const createElementWithText = (element, text) => {
  // console.log(element, text)
  const elementEl = document.createElement(element);
  // console.log(elementEl)
  elementEl.innerText = text;
  return elementEl;
};

export const setError = () => {
  const searchResultEl = document.querySelector("#search-result");
  doResultReset(searchResultEl);
  const arrWithErrorMsg = [
    "OOOOPS!",
    "ALGO DEU ERRADO NA SUA BUSCA.",
    "status 500",
    "POR FAVOR, TENTE NOVAMENTE.",
  ];
  const msg = arrWithErrorMsg.map((msg) => {
    const element = createElementWithText('h2', msg )   
    if(msg.includes('status')) element.classList.add('statusErrorMsg')
    element.classList.add('errorMsgFormat')
    return element
});
  const articleEl = document.createElement("article");
  articleEl.append(...msg);
  searchResultEl.append(articleEl);
};


export const buildlistProperties = (arrformatedObjProperties, amountProperties, cityAndState) =>{
    const searchResultEl = document.querySelector("#search-result"); 
    doResultReset(searchResultEl);
    const titleListProperties = setTitleListProperties(amountProperties, cityAndState)
    searchResultEl.append(titleListProperties)
    console.log(arrformatedObjProperties, amountProperties)

}
const setTitleListProperties = (amountProperties, cityAndState) => {
    const articleEl = document.createElement('article')
    const h1El = document.createElement('h1')
    const amountEL = createElementWithText('span', `${amountProperties}`)
    amountEL.classList.add('fw-bold')
    h1El.append(amountEL,` imóveis à venda em ${cityAndState}`)
    h1El.classList.add('title-list-properties')
    console.log(h1El)
    const resetButton = createResetButton(cityAndState)
    resetButton.classList.add('resetButtonTitlelist')
    articleEl.append(h1El, resetButton)
    articleEl.classList.add('first-article-list')
    return articleEl
}
const createResetButton  = (cityAndState) => {
    const spanEl = createElementWithText('span',cityAndState )
    const divEl = document.createElement('div')
    divEl.append(spanEl)
    return divEl
}
