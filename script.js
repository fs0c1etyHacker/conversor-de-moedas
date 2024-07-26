document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    convertCurrency(amount, fromCurrency, toCurrency);
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = '81b9cb1d9300cee44eee188e';  // Sua chave de API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'error') {
                document.getElementById('conversion-result').textContent = `Erro: ${data['error-type']}`;
                return;
            }

            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = amount * rate;

            document.getElementById('conversion-result').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('conversion-result').textContent = 'Erro ao converter a moeda.';
        });
}
