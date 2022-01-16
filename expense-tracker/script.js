const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -300},
    { id: 2, text: 'Food', amount: -675},
    { id: 3, text: 'Books', amount: -760},
    { id: 4, text: 'Salary', amount: 1260},
    { id: 5, text: 'Camera', amount: 2360},
];

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);
    const income = amounts
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);
    const expense = (amounts
                        .filter(item => item < 0)
                        .reduce((acc, item) => (acc += item), 0) * -1
                        ).toFixed(2);
    balance.innerText = `₴${total}`;
    moneyPlus.innerText = `₴${income}`;
    moneyMinus.innerText = `₴${expense}`;
}

function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        
        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

function generateID() {
    return Math.floor(Math.random() * 100000000)
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = ''

    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();


form.addEventListener('submit', addTransaction);