const API_KEY = "VTYUD4QUWBFNE9DF";
const BASE_URL = "https://www.alphavantage.co/";

export const getHistoricData = async (timeSeries: string, symbol: string) => {
    const url = `${BASE_URL}query?function=${timeSeries}&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    return false;
};
