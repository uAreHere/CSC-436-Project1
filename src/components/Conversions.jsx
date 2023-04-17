import {useState, useEffect} from 'react';
import CurrentConversionRates from './CurrentConversionRates';

const Conversions = () => {
    const [conversionRates, setConversionRates] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [inputValue, setInputValue] = useState("");
    const [conversionResults, setConversionResults] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
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
        const results = {};
        currencies.forEach((currency) => {
            const conversionRate = conversionRates[currency].rate_float;
            const result = (inputValue/conversionRate).toFixed(8);
            results[currency] = result;
        });
        setConversionResults(results);
    }

    const handleSortClick = () => {
        if(sortOrder === 'asc') {
            setSortOrder('desc');
        } 
        else {
            setSortOrder('asc');
        }
    }

    const sortedCurrencies = [];
    for(let currency in conversionResults) {
        sortedCurrencies.push([currency, conversionResults[currency]]);
    }
    sortedCurrencies.sort((a,b) => {
        if(sortOrder === 'asc') {
            return parseFloat(a[1]) - parseFloat(b[1]);
        }
        else {
            return parseFloat(b[1]) - parseFloat(a[1]);
        }
    });

    if(!conversionRates) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <div className="p-3">
            <label className="form-label">Select a Currency</label>
            <select value={selectedCurrency} onChange={handleCurrencyChange} className="form-control w-25">
                {currencies.map((currency) =>(
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <label className="form-label">Enter An Amount</label>
            <input type="number" value={inputValue} onChange={handleInputChange} className="form-control w-25"/>
            </div>
            <button onClick={handleConvertClick} className="btn btn-primary">Convert!</button>
            {conversionResults && (
               <ul className="list-group w-50 p-3">
                {sortedCurrencies.map((currency) => (
                    <li key={currency} className="list-group-item">
                        {inputValue} {currency} = {conversionResults[currency]} BTC
                    </li>
                ))}
                <div classname="p-3">
                <button onClick={handleSortClick} className="btn btn-secondary">Sort ({sortOrder === 'asc' ? "ascending":"descending"})</button>
                </div>
               </ul>
            )}
        </div>
    );
};

export default Conversions;
