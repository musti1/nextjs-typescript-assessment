import React, {useState, useEffect} from "react";
import {getHistoricData} from "../../services/stockApi";
import TableDisplay from "./TableDisplay";
import ChartDisplay from "./ChartDisplay";

const TIME_SERIES = 'TIME_SERIES_MONTHLY';

const MarketName = (symbol: string | undefined) => {
    if (symbol === 'APL') {
        return 'Apple (APL)';
    }
    if (symbol === 'FB') {
        return 'FACEBOOK (FB)';
    }
    if (symbol === 'MSFT') {
        return 'MICROSOFT (MSFT)';
    }
    if (symbol === 'AMZN') {
        return 'AMAZON (AMZN)';
    }
    if (symbol === 'NFLX') {
        return 'NETFLIX (NFLX)';
    }
    if (symbol === 'TWTR') {
        return 'TWITTER (TWTR)';
    }
    if (symbol === 'IBM') {
        return 'INTERNATIONAL BUSINESS MACHINES (IBM)';
    }
    if (symbol === 'UBER') {
        return 'UBER';
    }
    return '';
};

const reformedData = async (timeSeries: string, symbol: string | undefined) => {
    let data: { "key": number; "date": string; "open": any; "high": any; "low": any; "close": any; "volume": any; }[] = [];
    if (typeof symbol !== "undefined" && symbol !== '') {
        const historicData = await getHistoricData(timeSeries, symbol);
        data = Object.keys(historicData['Monthly Time Series']).map((key, index) => {
            return {
                "key": index,
                "date": key,
                "open": historicData['Monthly Time Series'][key]['1. open'],
                "high": historicData['Monthly Time Series'][key]["2. high"],
                "low": historicData['Monthly Time Series'][key]["3. low"],
                "close": historicData['Monthly Time Series'][key]["4. close"],
                "volume": historicData['Monthly Time Series'][key]["5. volume"]
            }


        });
    }
    return data;
};

type StockMarketProps = { message?: string, symbol?: string } & React.HTMLProps<HTMLDivElement>;

const StockMarket = (props: StockMarketProps) => {
    const symbol = props.symbol;
    let marketName = MarketName(symbol);
    const [historicData, setHistoricData] = useState([]);

    useEffect ( ()=> {
        async function ReformedData() {
            const data = await reformedData(TIME_SERIES, symbol);
            // @ts-ignore
            setHistoricData(data);
        }
        ReformedData()
    }, []);
    return (
        <>
            <p className="text-center font-bold text-3xl">
                {marketName}
            </p>
            <ChartDisplay historicData={historicData}/>
            <TableDisplay dataSource={historicData}/>
        </>
    )
};

export default StockMarket;
