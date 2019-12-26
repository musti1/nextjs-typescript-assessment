import React from "react";
import {Table} from "antd";
import 'antd/dist/antd.css';

type TableDisplayProps = { dataSource?: { "key": number; "date": string; "open": any; "high": any; "low": any; "close": any; "volume": any; action: any; }[] } & React.HTMLProps<HTMLDivElement>;

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Open',
        dataIndex: 'open',
        key: 'open',
    },
    {
        title: 'High',
        dataIndex: 'high',
        key: 'high',
    },
    {
        title: 'Low',
        dataIndex: 'low',
        key: 'low',
    },
    {
        title: 'Close',
        dataIndex: 'close',
        key: 'close',
    },
    {
        title: 'Volume',
        dataIndex: 'volume',
        key: 'volume',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
    }
];

const TableDisplay = (props: TableDisplayProps) => (
    <>
        <Table dataSource={props.dataSource} columns={columns}/>;
    </>
);

export default TableDisplay;
