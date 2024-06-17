import axios from "axios";
const productionUrl = "https://strapi-store-server.onrender.com/api";
export const customFetch = axios.create({ baseURL: productionUrl });
export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format((price / 100).toFixed());
  return dollarAmount;
};
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    let amount = index + 1;
    return (
      <option key={index} value={amount}>
        {amount}
      </option>
    );
  });
};



const API_KEY = 'your_openweathermap_api_key';

const fetchWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export default fetchWeather;