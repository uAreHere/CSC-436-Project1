import {useState, useEffect} from 'react';

const FatherTime = () => {
    const [timeData, setTimeData] = useState(null);

    useEffect(() => {
        const fetchTimeData = async () => {
            const response = await fetch (
                'https://api.coindesk.com/v1/bpi/currentprice.json'
            );
            const data = await response.json();
            setTimeData(data.time.updated);
        };
        fetchTimeData()
    }, []);

    const getLocalTime = (utcTime) => {
        return new Date(utcTime).toLocaleString();
    };

    return (
        <div>
            {timeData ? (
                <div>
                    <h3>Conversion Data Current as of:</h3>
                    <p>{timeData}</p>
                    <p>{getLocalTime(timeData)} Local Time</p>
                </div>) : (<div>Loading...</div>)
            }
        </div>
    );
};

export default FatherTime;