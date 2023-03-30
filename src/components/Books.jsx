import { useState, useEffect } from "react";
import Container from "./Container";


const Books = () => {
    const [conversionRates, setConversionRates] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [conversionAmount, setConversionAmount] = useState(1);
    const [sortedRates, setSortedRates] = useState([]);
    const [bitcoinAmount, setBitcoinAmount] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');


    useEffect(() => {
        const fetchConversionRates = async () => {
            const response = await fetch(
                'https://api.coindesk.com/v1/bpi/currentprice.json'
            );
            const data = await response.json();
            setConversionRates(data.bpi);
            setSortedRates(Object.entries(data.bpi));
        };
        fetchConversionRates();
    }, []);

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };
    
    const handleAmountChange = (event) => {
        const enteredAmount = event.target.value;
        setConversionAmount(enteredAmount);
    };

    const handleConvertClick = () => {
        const selectedCurrencyRate = conversionRates[selectedCurrency].rate_float;
        const convertedAmount = conversionAmount/selectedCurrencyRate;
        setBitcoinAmount(convertedAmount);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    }

    const sortRates = (sortOrder) => {
        let sortedArray = sortedRates;
        if (sortOrder === 'asc') {
            sortedArray.sort((a,b) => a[1].rate_float - b[1].rate_float);
        }
        else if (sortOrder === 'desc') {
            sortedArray.sort((a,b) => b[1].rate_float - a[1].rate_float);
        }
        setSortedRates(sortedArray);
    }

    return (
        <Container>
            <h1 className="display-6">Conversions</h1>
            <br/>
            {conversionRates ? (
                <div className="container py-3">
                    <label className="form-label">Select Currency:</label>
                    <select id="currency-select" onChange={handleCurrencyChange}>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                    <br/>
                    <div className="container">
                        <label className="form-label">Enter Amount</label>
                        <input id="amount-input" type="number" min="1" value={conversionAmount} onChange={handleAmountChange} className="form-control w-25"/>
                        <button onClick={handleConvertClick} className="btn btn-primary ms-2">Convert!</button>
                        <br/>
                        <button onClick={()=> sortRates("asc")} className="btn btn-success">Sort Ascending</button>
                        <button onClick={()=>sortRates("desc")} className="btn btn-danger">Sort Descending</button>
                    </div>
                    <br />
        <h2>Conversion Results:</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Rate</th>
                    <th>Amount in Bitcoin</th>
                </tr>
            </thead>
            <tbody>
                {sortedRates.map((rate) => (
                    <tr key={rate[0]}>
                        <td>{rate[0]}</td>
                        <td>{rate[1].rate}</td>
                        <td>{(bitcoinAmount * rate[1].rate_float).toFixed(5)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
                </div>
            ) : (
            <div>Loading...</div> 
            )}
        </Container>
    )
}

export default Books;























// import { stringify } from "postcss";
// import { useState, useEffect } from "react";
// import Container from "./Container";
// import ErrorAlert from "./ErrorAlert";

// const Books = () => {
//     const [conversionRates, setConversionRates] = useState(null);
//     const [selectedCurrency, setSelectedCurrency] = useState("USD");
//     const [conversionAmount, setConversionAmount]=useState(1);
//     const [sortedRates, setSortedRates]=useState([]);
//     const [bitcoinAmount, setBitcoinAmount] = useState(0);

//     useEffect(() => {
//         const fetchConversionRates = async () => {
//             const response = await fetch(
//                 "https://api.coindesk.com/v1/bpi/currentprice.json"
//             );
//             const data = await response.json();
//             setConversionRates(data.bpi);
//             setSortedRates(Object.entries(data.bpi));
//         };
//         fetchConversionRates();
//     }, []);

//     const handleCurrencyChange = (event) => {
//         setSelectedCurrency(event.target.value);
//     };

//     const handleAmountChange = (event) => {
//         const enteredAmount = event.target.value;
//         const selectedCurrencyRate = conversionRates[selectedCurrency].rate_float;
//         const convertedAmount = enteredAmount/selectedCurrencyRate;
//         setConversionAmount(enteredAmount);
//         setBitcoinAmount(convertedAmount);
//     };

//     const sortRates = (sortOrder) => {
//         let sortedArray= sortedRates;
//         if (sortOrder === 'asc') {
//             sortedArray.sort((a,b) => a[1].rate_float - b[1].rate_float);
//         } else if (sortOrder === 'desc') {
//             sortedArray.sort((a,b) => b[1].rate_float - a[1].rate_float);
//         }
//         setSortedRates(sortedArray);
//     }

//     return (
//         <Container>
//             <h1 className="display-6">Conversions</h1>
//             <br/>
//             {conversionRates ? (
//                 <div className="container py-3">
//                     <label className="form-label">Select Currency:</label>
//                     <select id="currency-select" onChange={handleCurrencyChange}>
//                         <option>USD</option>
//                         <option>EUR</option>
//                         <option>GBP</option>
//                     </select>
//                     <br />
//                     <div>
//                     <label className="form-label">Enter Amount</label>
//                     <input id="amount-input" type="number" min="1" value={conversionAmount} onChange={handleAmountChange} className="form-control w-25 "/>
//                     <div className="d-grid gap-2 py-3 w-25">
//                     <button onClick={()=> sortRates("asc")} className="btn btn-success">Sort Ascending</button>

//                     <button onClick={()=>sortRates("desc")} className="btn btn-danger">Sort Descending</button>
//                     </div>
//                     <div>
//                         <label className="form-label">Converted to BTC:</label>
//                         {bitcoinAmount} BTC
//                     </div>
//                     <ul className="list-group">
//                     {sortedRates.map(([currency, rates]) => {
//                         const selectedCurrencyRate = rates[selectedCurrency];
//                         if (!selectedCurrencyRate) {
//                             return null;
//                         }
//                         return (
//                                 <li key={currency} className="list-group-item">
//                                     {conversionAmount} {selectedCurrency} = {" "}
//                                     {(conversionAmount/selectedCurrencyRate.rate_float).toFixed(2)}{" "} BTC ({rates[currency].rate}{currency})
//                                 </li>
//                         );
//                     })}
//                     </ul>
//                     </div>
//                 </div>
//             ) : (
//                 <div>Loading...</div> 
//             )}
//         </Container>
//     );
// };

// export default Books;