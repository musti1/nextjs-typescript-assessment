import React from "react";
import {Progress, Icon} from 'antd';
import 'antd/dist/antd.css';

const MarketName = (symbol: string, date: string) => {
    if (symbol === 'APL') {
        return `Apple (APL) ${date} Stock`;
    }
    if (symbol === 'FB') {
        return `FACEBOOK (FB) ${date} Stock`;
    }
    if (symbol === 'MSFT') {
        return `MICROSOFT (MSFT) ${date} Stock`;
    }
    if (symbol === 'AMZN') {
        return `AMAZON (AMZN) ${date} Stock`;
    }
    if (symbol === 'NFLX') {
        return `NETFLIX (NFLX) ${date} Stock`;
    }
    if (symbol === 'TWTR') {
        return `TWITTER (TWTR) ${date} Stock`;
    }
    if (symbol === 'IBM') {
        return `INTERNATIONAL BUSINESS MACHINES (IBM) ${date} Stock`;
    }
    if (symbol === 'UBER') {
        return `UBER ${date} Stock`;
    }
    return '';
};

type ActionComponentProps = { stockData?: any | undefined } & React.HTMLProps<HTMLDivElement>;

const ActionComponent = (props: ActionComponentProps) => {
    const {symbol, date, open, high, close, low, volume} = props.stockData;
    const pivotPoint = ((Number(high)+Number(low)+Number(close))/3).toFixed(2);
    const firstResistance = ((2*Number(pivotPoint)) - Number(low)).toFixed(2);
    const firstSupport = (((2*Number(pivotPoint)) - Number(high))).toFixed(2);
    const secondResistance = (Number(pivotPoint) + (Number(high) - Number(low))).toFixed(2);
    const secondSupport = (Number(pivotPoint) - (Number(high) - Number(low))).toFixed(2);
    const thirdResistance = (Number(high) + (Number(pivotPoint) - Number(low))).toFixed(2);
    const thirdSupport = (Number(low) - (Number(high) - Number(pivotPoint))).toFixed(2);
    let marketName = MarketName(symbol, date);

    return (
        <>
            <p className="text-center font-bold text-3xl">
                {marketName}
            </p>

            <div className="rounded overflow-hidden shadow-lg flex mb-6">
                <div className="w-1/3 bg-gray-400 p-2 flex">
                    <div className="w-1/2 bg-gray-500">
                        <p className="font-bold text-black text-2xl" style={{marginBottom: 0}}>
                            Open:
                        </p>
                    </div>
                    <div className="w-1/2 bg-gray-500">
                        <p className="text-black text-2xl" style={{marginBottom: 0}}>
                            ${parseFloat(open).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="w-1/3 bg-gray-500 h-12 p-2 flex">
                    <div className="w-1/2 bg-gray-500">
                        <p className="font-bold text-black text-2xl" style={{marginBottom: 0}}>
                            Low:
                        </p>
                    </div>
                    <div className="w-1/2 bg-gray-500">
                        <p className="text-black text-2xl" style={{marginBottom: 0}}>
                            ${parseFloat(low).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="w-1/3 bg-gray-400 h-12 p-2 flex">
                    <div className="w-1/2 bg-gray-500">
                        <p className="font-bold text-black text-2xl" style={{marginBottom: 0}}>
                            High:
                        </p>
                    </div>
                    <div className="w-1/2 bg-gray-500">
                        <p className="text-black text-2xl" style={{marginBottom: 0}}>
                            ${parseFloat(high).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg flex mb-6">
                <div className="w-1/3 bg-gray-400 p-2 flex">
                    <div className="w-1/2 bg-gray-500">
                        <p className="font-bold text-black text-2xl" style={{marginBottom: 0}}>
                            Close:
                        </p>
                    </div>
                    <div className="w-1/2 bg-gray-500">
                        <p className="text-black text-2xl" style={{marginBottom: 0}}>
                            ${parseFloat(close).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="w-1/3 bg-gray-500 h-12 p-2 flex">
                    <div className="w-1/2 bg-gray-500">
                        <p className="font-bold text-black text-2xl" style={{marginBottom: 0}}>
                            Volume:
                        </p>
                    </div>
                    <div className="w-1/2 bg-gray-500">
                        <p className="text-black text-2xl" style={{marginBottom: 0}}>
                            {volume}
                        </p>
                    </div>
                </div>

            </div>

            <div className="rounded overflow-hidden shadow-lg">
                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Support 1:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{firstSupport}</p>
                        </div>
                        <Progress percent={firstSupport} showInfo={false}/>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Resistance 1:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{firstResistance}</p>
                        </div>
                        <Progress percent={firstResistance} showInfo={false}/>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-500 p-4 text-center">
                        <p className="font-bold text-black text-lg">Short-Term Trend: </p>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-4">
                        <div className="flex text-black text-lg">
                            <Icon style={{fontSize: 20, color: "orange"}} className="p-1 font-bold text-center"
                                  type="arrow-down"/><p>DOWNTREND</p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500  p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Support 2:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{secondSupport}</p>
                        </div>
                        <Progress percent={secondSupport} showInfo={false}/>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-2">

                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Resistance 2:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{secondResistance}</p>
                        </div>
                        <Progress percent={secondResistance} showInfo={false}/>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-500 p-4 text-center">
                        <p className="font-bold text-black text-lg">Medium-Term Trend: </p>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-4 flex">
                        <div className="flex text-black text-lg">
                            <Icon style={{fontSize: 20, color: "orange"}} className="p-1 font-bold text-center"
                                  type="arrow-down"/><p>DOWNTREND</p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Support 3:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{thirdSupport}</p>
                        </div>
                        <Progress percent={thirdSupport} showInfo={false}/>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Resistance 3:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>{thirdResistance}</p>
                        </div>
                        <Progress percent={thirdResistance} showInfo={false}/>

                    </div>
                    <div className="w-1/4 h-16 bg-gray-500 p-4 text-center">
                        <p className="font-bold text-black text-lg">High-Term Trend: </p>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-4">
                        <div className="flex text-black text-lg">
                            <Icon style={{fontSize: 20, color: "orange"}} className="p-1 font-bold text-center"
                                  type="arrow-down"/><p>DOWNTREND</p>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 h-16 bg-gray-500 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Week to Date %:</p>
                        </div>
                        <div className="flex float-right">
                            <p className="text-lg text-black" style={{marginBottom: 0}}>0.00%</p>
                        </div>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-2">
                        <div className="flex float-left">
                            <p className="font-bold text-lg text-black" style={{marginBottom: 0}}>Year to Date:</p>
                        </div>
                        <div className="flex float-right">
                            <Icon style={{color: "orange"}} className="p-1 text-center" type="caret-down"/>
                            <p className="text-lg text-black" style={{marginBottom: 0}}>-31.98%</p>
                        </div>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-500 p-5 text-center">
                        <p className="font-bold text-black text-lg">Month to Date %:</p>
                    </div>
                    <div className="w-1/4 h-16 bg-gray-400 p-5 flex">
                        <div className="flex text-black text-lg">
                            <Icon style={{fontSize: 20, color: "orange"}} type="caret-down"/><p>-17.61%</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default ActionComponent;
