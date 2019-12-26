import * as React from "react";
import "../styles/index.css";
import Header from "../components/Common/Header";
import NavBar from "../components/Common/NavBar";
import VirtualTrade from "../components/VirtualTrade/VirtualTrade";

type Query = {symbol?: string; }
type Url = {query?: Query}
type ActionProps = { url?: Url } & React.HTMLProps<HTMLDivElement>;
export default (props: ActionProps ) => {
    // @ts-ignore
    const symbol = (typeof props.url.query.symbol !== "undefined")? props.url.query.symbol: "";
    return (
    <div className="font-sans antialiased h-screen">

        <Header/>
        <div id="main" className="pt-0">
            <NavBar/>

            <div className="bg-grey-light h-10 p-10">
                <VirtualTrade symbol={symbol}/>
            </div>
        </div>
    </div>
)};
