import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Legend,
    Sector,
    Cell,
    ResponsiveContainer,
} from 'recharts';

//PieChartComponent라는 함수형 컴포넌트 선언. apiData를 props로 받아옴
function PieChartComponent({ apiData }) {
    let data = []; //data는 빈 배열

    apiData.map(
        (
            el, //apiData 배열을 돌면서 각 요소를 name과 value를 가진 객체로 배열에 저장함
        ) => data.push({ name: el.category, value: Number(el.hours) }),
    ); //el의 category이름을 name에, el의 hours를 숫자로 변환하여 value에 넣고 data배열에 push함.

    const COLORS = ['#F9D6FF', '#E2BBE9', '#9B86BD', '#7776B3', '#5A639C']; //색을 순서대로 할당

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <div>
                {/* <h1>Favorite Beverages - technostuf.com</h1> */}
                {/* <hr /> */}
                <div className="col-md-8">
                    <ResponsiveContainer
                        width={300}
                        height={300}
                        className="text-center"
                    >
                        <PieChart width={200} height={200}>
                            <Legend
                                layout="vertical"
                                verticalAlign="top"
                                align="top"
                            />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="40%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
export default PieChartComponent;
