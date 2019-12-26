const API_KEY = "VTYUD4QUWBFNE9DF";
const BASE_URL = "https://www.alphavantage.co/";

export const getStockData = async (timeSeries: string, symbol: string) => {
    const url = `${BASE_URL}query?function=${timeSeries}&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    return false;
};

export const getCurrentStockData = async (timeSeries: string, symbol: string) => {
    const url = `${BASE_URL}query?function=${timeSeries}&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    return false;
};