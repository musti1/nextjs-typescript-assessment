import * as React from "react";
import "../styles/index.css";
import Header from "../components/Common/Header";
import NavBar from "../components/Common/NavBar";
import ActionComponent from "../components/VirtualTrade/Action";

type Query = {symbol?: string; date?: string; open?: number; high?: number; low?: number; close?: number; volume?: number; }
type Url = {query?: Query}
type ActionProps = { url?: Url } & React.HTMLProps<HTMLDivElement>;
export default (props: ActionProps ) => {
    // @ts-ignore
    const data = (typeof props.url.query !== "undefined")? props.url.query: "";
    return (
    <div className="font-sans antialiased h-screen">

        <Header/>
        <div id="main" className="pt-0">
            <NavBar/>

            <div className="bg-grey-light h-10 p-10">
                <ActionComponent stockData={data}/>
            </div>
        </div>
    </div>
)};
