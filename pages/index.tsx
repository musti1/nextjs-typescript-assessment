import * as React from "react";
import "../styles/index.css";
import Header from "../components/Common/Header";
import StockMarket from "../components/StockMarket/StockMarket";

const navOptions = ["APL", "FB", "MSFT", "UBER", "AMZN", "NFLX", "ATVI", "TWTR", "IBM", "KRX"].map((key, index) => {
    return (
        <div key={index} className="group relative sidebar-item with-children">
            <a href={`?key=${key}`}
               className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-transparent hover:bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                     className="h-6 w-6 text-grey-darker fill-current xl:mr-2">
                    <path
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"
                        className="heroicon-ui"></path>
                </svg>
                <div className="text-white text-xs">{key}</div>
            </a>
        </div>
    )
});
type Query = {key?: string}
type Url = {query?: Query}
type HomeProps = { url?: Url } & React.HTMLProps<HTMLDivElement>;
export default (props: HomeProps ) => {
    // @ts-ignore
    const key = (typeof props.url.query.key !== "undefined")? props.url.query.key: "";
    return (
    <div className="font-sans antialiased h-screen">

        <Header/>
        <div id="main" className="pt-0">
            <div className="bg-grey-darkest relative h-full min-h-screen">
                <div className="xl:py-2">
                    <div className="hidden xl:block uppercase font-bold text-grey-darker text-xs px-4 py-2">
                        Main
                    </div>
                    {navOptions}
                </div>
            </div>

            <div className="bg-grey-light h-10 p-10">
                <StockMarket symbol={key}/>
            </div>
        </div>
    </div>
)};
