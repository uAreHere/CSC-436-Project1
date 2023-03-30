import {useState, useEffect} from 'react';

const Conversions = () => {
    const [conversionRates, setConversionRates] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [inputValue, setInputValue] = useState("");
    const [conversionResult, setConversionResult] = useState(null);
    const currencies = ["USD", "EUR", "GBP"];

    useEffect(() =>{
        const fetchConversionRates = async() =>{
            const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
            const data = await response.json();
            setConversionRates(data.bpi);
        };
        fetchConversionRates();
    }, []);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    };

    const handleConvertClick = () => {
        const conversionRate = conversionRates[selectedCurrency].rate_float;
        const result = inputValue /conversionRate;
        setConversionResult(result);
    }

    if(!conversionRates) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <h3>Select a Currency</h3>
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
                {currencies.map((currency) =>(
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <h3>Enter An Amount</h3>
            <input type="number" value={inputValue} onChange={handleInputChange}/>
            <button onClick={handleConvertClick}>Convert!</button>
            {conversionResult && (
            <p>
                {inputValue} {selectedCurrency} = {conversionResult} BTC
            </p>
            )}
        </div>
    );
};

export default Conversions;