import React from "react";
// @ts-ignore
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries,} from "react-vis"
import '../../node_modules/react-vis/dist/style.css';

type ChartDisplayProps = { historicData?: [] | undefined} & React.HTMLProps<HTMLDivElement>;

const ChartDisplay = (props: ChartDisplayProps) => {
    // @ts-ignore
    const data = props.historicData.map(res => {
        return {
            // @ts-ignore
            x: Date.parse(res.date),
            // @ts-ignore
            y: res.open
        }
    });
    return (
        <>
            <XYPlot width={1200} height={600} xType="time">
                <HorizontalGridLines/>
                <LineSeries data={data} style={{strokeLinejoin: "round"}}/>
                <XAxis title="Date (US/Eastern)"/>
                <YAxis title="Open"/>
            </XYPlot>
        </>
    )
};

export default ChartDisplay;
