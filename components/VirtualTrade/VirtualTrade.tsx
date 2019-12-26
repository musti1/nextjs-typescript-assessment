import React, {useState, useEffect} from "react";
import {getCurrentStockData} from "../../services/stockApi";
import {Button, Table} from 'antd';
import 'antd/dist/antd.css';

const TIME_SERIES = 'TIME_SERIES_INTRADAY';

const columns = [
    {
        title: 'Buy Date',
        dataIndex: 'lastRefreshed',
        key: 'lastRefreshed',
    },
    {
        title: 'Buy Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Broker Commission',
        dataIndex: 'brokerCommission',
        key: 'brokerCommission',
    },
    {
        title: 'Transaction Fee',
        dataIndex: 'transactionFee',
        key: 'transactionFee',
    },
    {
        title: 'Sell Price',
        dataIndex: 'sellPrice',
        key: 'sellPrice',
    },
    {
        title: 'Profit',
        dataIndex: 'profit',
        key: 'profit',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    }
];

const MarketName = (symbol: string) => {
    if (symbol === 'APL') {
        return `Apple (APL) Current Stock`;
    }
    if (symbol === 'FB') {
        return `FACEBOOK (FB) Current Stock`;
    }
    if (symbol === 'MSFT') {
        return `MICROSOFT (MSFT) Current Stock`;
    }
    if (symbol === 'AMZN') {
        return `AMAZON (AMZN) Current Stock`;
    }
    if (symbol === 'NFLX') {
        return `NETFLIX (NFLX) Current Stock`;
    }
    if (symbol === 'TWTR') {
        return `TWITTER (TWTR) Current Stock`;
    }
    if (symbol === 'IBM') {
        return `INTERNATIONAL BUSINESS MACHINES (IBM) Current Stock`;
    }
    if (symbol === 'UBER') {
        return `UBER Current Stock`;
    }
    return '';
};

const reformedData = async (timeSeries: string, symbol: string | undefined) => {
    if (typeof symbol !== "undefined" && symbol !== '') {
        const currentStockData = await getCurrentStockData(timeSeries, symbol);
        const open = currentStockData['Time Series (5min)'][currentStockData["Meta Data"]["3. Last Refreshed"]]['1. open'];
        const brokerCommission = (currentStockData['Time Series (5min)'][currentStockData["Meta Data"]["3. Last Refreshed"]]['1. open'] / 100) * 5;
        const transactionFee = (currentStockData['Time Series (5min)'][currentStockData["Meta Data"]["3. Last Refreshed"]]['1. open'] / 100) * 8;
        const tax = (currentStockData['Time Series (5min)'][currentStockData["Meta Data"]["3. Last Refreshed"]]['1. open'] / 100) * 10;
        const total = Number(open) + Number(brokerCommission) + Number(transactionFee) + Number(tax);
        return {
            "lastRefreshed": currentStockData["Meta Data"]["3. Last Refreshed"],
            "open": open,
            "brokerCommission": brokerCommission,
            "transactionFee": transactionFee,
            "tax": tax,
            "total": total,
        }

    }
    return {
        "lastRefreshed": "",
        "open": "",
        "brokerCommission": "",
        "transactionFee": "",
        "tax": "",
        "total": ""
    };
};

type VirtualTradeProps = { symbol?: any | undefined } & React.HTMLProps<HTMLDivElement>;
const VirtualTrade = (props: VirtualTradeProps) => {
    const symbol = props.symbol;
    let marketName = MarketName(symbol);
    const [currentStockData, setcurrentStockData] = useState({
        "lastRefreshed": "",
        "open": "",
        "brokerCommission": "",
        "transactionFee": "",
        "tax": "",
        "total": ""
    });

    const [buyFlag, setBuyFlag] = useState(false);

    const [localStorageData, setLocalStorageData] = useState({
        buy: [],
        balance: 10000
    });

    const handleSell = (key: number) => {
        const local = JSON.parse(localStorage.getItem('stockData') as string);
        // @ts-ignore
        const sellPrice = local.buy[key].sellPrice;
        delete local.buy[key];
        setLocalStorageData({
            buy: localStorageData.buy,
            balance: Number(local.balance) + Number(sellPrice)
        });
        localStorage.setItem('stockData', JSON.stringify({
            buy: localStorageData.buy,
            balance: Number(local.balance) + Number(sellPrice)
        }))
    };

    const handleBuy = () => {
        setBuyFlag(true);
        // @ts-ignore
        const sellPrice = (currentStockData.total / 100) * 3;
        // @ts-ignore
        const setData = {
            // @ts-ignore
            "lastRefreshed": currentStockData.lastRefreshed,
            // @ts-ignore
            "price": parseFloat(currentStockData.total).toFixed(2),
            // @ts-ignore
            "brokerCommission": parseFloat(currentStockData.brokerCommission).toFixed(2),
            // @ts-ignore
            "transactionFee": parseFloat(currentStockData.transactionFee).toFixed(2),
            // @ts-ignore
            "sellPrice": parseFloat((Number(sellPrice) + Number(currentStockData.total))).toFixed(2),
            // @ts-ignore
            "profit": parseFloat((Number(sellPrice))).toFixed(2)
        };
        const list = [...localStorageData.buy, setData];
        const updatedData = list.map((data, index) => {
            // @ts-ignore
            data.key = index;
            // @ts-ignore
            data.action = (
                <Button type="primary" shape="round" size='small' onClick={() => handleSell(index)}>
                    Sell
                </Button>);
            return data
        });
        // @ts-ignore
        setLocalStorageData({
            buy: updatedData,
            balance: Number(localStorageData.balance) - Number(currentStockData.total)
        });
        localStorage.setItem('stockData', JSON.stringify({
            buy: updatedData,
            balance: Number(localStorageData.balance) - Number(currentStockData.total)
        }));
    };

    useEffect(() => {
        if (localStorage.getItem('stockData')) {
            const local = JSON.parse(localStorage.getItem('stockData') as string);
            // @ts-ignore
            const updatedData = local.buy.map((data, index) => {
                // @ts-ignore
                data.key = index;
                // @ts-ignore
                data.action = (
                    <Button type="primary" shape="round" size='small' onClick={() => handleSell(index)}>
                        Sell
                    </Button>);
                return data;
            });
            // @ts-ignore
            setLocalStorageData({buy: updatedData, balance: local.balance});
            localStorage.setItem('stockData', JSON.stringify({buy: updatedData, balance: local.balance}))
        } else {
            localStorage.setItem('stockData', JSON.stringify(localStorageData))
        }
    }, []);
    useEffect(() => {
        async function ReformedData() {
            const data = await reformedData(TIME_SERIES, symbol);
            // @ts-ignore
            setcurrentStockData(data);
        }

        ReformedData()
    }, []);
    return (
        <>
            <p className="text-center font-bold text-3xl">
                {marketName}
            </p>
            <div className="max-w-sm h-12 rounded overflow-hidden text-center shadow-lg flex mb-6">
                <div className="w-full bg-gray-500">
                    <p className="font-bold text-black text-2xl pl-2" style={{marginBottom: 0}}>
                        Balance:
                    </p>
                </div>
                <div className="w-full bg-gray-500">
                    <p className="text-black text-2xl" style={{marginBottom: 0}}>
                        ${parseFloat(localStorageData.balance).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg mt-10 pb-6">
                <div className="flex">
                    <div className="w-1/3 h-16 bg-gray-500  p-5">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Last Refreshed
                                Date:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>{currentStockData.lastRefreshed}</p>
                        </div>
                    </div>
                    <div className="w-1/5 h-16 bg-gray-400 p-5">

                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Current Price:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>${parseFloat(currentStockData.open).toFixed(2)}</p>
                        </div>

                    </div>
                </div>
                <div className="flex">

                    <div className="w-1/4 h-16 bg-gray-400 p-5">

                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Broker Commission
                                5%:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>${parseFloat(currentStockData.brokerCommission).toFixed(2)}</p>
                        </div>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-5">

                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Transaction Fee
                                8%:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>${parseFloat(currentStockData.transactionFee).toFixed(2)}</p>
                        </div>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-500  p-5">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Tax 10%:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>${parseFloat(currentStockData.tax).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500 p-5">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Buy Price:</p>
                        </div>
                        <div className="flex float-left pl-2">
                            <p className="text-lg text-black"
                               style={{marginBottom: 0}}>${parseFloat(currentStockData.total).toFixed(2)}</p>
                        </div>
                    </div>

                </div>
                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500 p-5">
                        {buyFlag ?
                            <Button type="primary" shape="round" size='large' onClick={handleBuy} disabled>
                                Buy
                            </Button> :
                            <Button type="primary" shape="round" size='large' onClick={handleBuy}>
                                Buy
                            </Button>
                        }

                    </div>
                </div>

            </div>
            <div className="mt-10">
                <Table dataSource={localStorageData.buy} columns={columns}/>
            </div>
        </>
    )
};

export default VirtualTrade;