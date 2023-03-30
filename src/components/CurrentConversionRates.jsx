import Container from "./Container";
import { useEffect,useState } from "react";

const CurrentConversionRates = () => {
    const [conversionRates, setConversionRates] = useState(null);
    const [bitcoinValue, setBitcoinValue] = useState(null);

  useEffect(() => {
    const fetchConversionRates = async () => {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      setConversionRates(data.bpi);
    };
    fetchConversionRates();
  }, []);

  useEffect(() =>{
    if(conversionRates) {
      const usdToBTC= 1/conversionRates.USD.rate_float;
      const eurToBTC= 1/conversionRates.EUR.rate_float;
      const gbpToBTC= 1/conversionRates.GBP.rate_float;
      setBitcoinValue({usdToBTC, eurToBTC, gbpToBTC});
    }
  }, [conversionRates]);

  if (!conversionRates || !bitcoinValue) {
    return <div className="container">Loading...</div>;
  }

  return (
    <Container>
    <div className="card w-50">
      <div className="card-body">
        <h2 className="card-header">Current Conversion Rates</h2>
        <ul className="list-group text-center">
          <li className="list-group-item">
            $1 USD = {bitcoinValue.usdToBTC} BTC
            <br />
            1 BTC = ${conversionRates.USD.rate} USD
          </li>
          <li className="list-group-item">
          €1 EUR = {bitcoinValue.eurToBTC} BTC
            <br />
          1 BTC = €{conversionRates.EUR.rate} EUR
          </li>
          <li className="list-group-item">
          £1 GBP = {bitcoinValue.gbpToBTC} BTC
            <br />
          1 BTC = £{conversionRates.GBP.rate} GBP
          </li>
        </ul>
      </div>
    </div>
    </Container>
  );
}

export default CurrentConversionRates;