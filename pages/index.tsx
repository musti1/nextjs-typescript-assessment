import * as React from "react";
import "../styles/index.css";
import {Button} from 'antd';
import 'antd/dist/antd.css';
import Header from "../components/Common/Header";
import NavBar from "../components/Common/NavBar";
import StockMarket from "../components/StockMarket/StockMarket";

type Query = { key?: string }
type Url = { query?: Query }
type HomeProps = { url?: Url } & React.HTMLProps<HTMLDivElement>;
export default (props: HomeProps) => {
    // @ts-ignore
    const key = (typeof props.url.query.key !== "undefined") ? props.url.query.key : "";
    return (
        <div className="font-sans antialiased h-screen">

            <Header/>
            <div id="main" className="pt-0">
                <NavBar/>

                <div className="bg-grey-light h-10 p-10">

                    <StockMarket symbol={key}/>
                    <div>
                        <Button href={`/virtualTrade?symbol=${key}`} type="primary" shape="round" size="large">
                            Virtual Trade
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
};
