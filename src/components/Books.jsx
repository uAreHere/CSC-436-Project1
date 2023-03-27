import { useState, useEffect } from "react";
import ErrorAlert from "./componenets/ErrorAlert";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = async () =>{
        const url='https://api.matgargano.com/api/books';
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBooks(response);
        } catch(e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return <>
        {error && <ErrorAlert />}
        {!error && loading && <p>Loading</p>}
        {!error && !loading &&
            <>
                {books.map(book => {
                    return <div key={book.id}>
                        <Link to={`/books/${book.id}`}></Link>
                    </div>
                })}</>
        }    
    </>

}

export default Books;