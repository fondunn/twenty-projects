const API_KEY = '2d4b3762f4ce2a183d295906'
const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`
const currencies = ['EUR','GBP','JPY','PLN','RUB','UAH','USD']


const currencyOne = document.getElementById('currency-one')
const amountCurrencyOne = document.getElementById('amount-one')

const currencyTwo = document.getElementById('currency-two')
const amountCurrencyTwo = document.getElementById('amount-two')

const rate = document.getElementById('rate')
const swap = document.getElementById('swap')

function initCurrencies(select) {
    currencies.forEach(el => {
        const option = document.createElement('option')
        option.value = el
        option.innerHTML = el
        select.appendChild(option)
    })
}
initCurrencies(currencyOne)
initCurrencies(currencyTwo)

function calculate() {
    const currency_one = currencyOne.value
    const currency_two = currencyTwo.value
    
    fetch(URL+currency_one)
    .then(res => res.json())
    .then(data => {
        const rateData = data.conversion_rates[currency_two]
        rate.innerText = `1 ${currency_one} = ${rateData} ${currency_two}`
        amountCurrencyTwo.value = (amountCurrencyOne.value * rateData).toFixed(2)
    })
}

currencyOne.addEventListener('change', calculate)
amountCurrencyOne.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountCurrencyTwo.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    calculate()
})

calculate()