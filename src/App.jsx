import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'

export default function App() {
  const [price, setPrice] = useState('Loading...');

  useEffect(() => {
    const fetchPrice = () => {
      axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
        .then(response => {
          setPrice(response.data.data.amount);
        })
        .catch(error => {
          console.error('Error fetching Bitcoin price:', error);
          setPrice('Error loading price');
        });
    };

    fetchPrice();
    // Fetch price every 3 seconds
    const interval = setInterval(fetchPrice, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Bitcoin Price</h1>
      <p>${price} USD</p>
    </div>
  );
}
