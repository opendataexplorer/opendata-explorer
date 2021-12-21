import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ data, uom, filters }) => {

    const pivotfilter = filters.filter(object => object.pivot)[0].col

    // const pivotdata = tidy(
    //     data,
    //     pivotWider({
    //         namesFrom: pivotfilter,
    //         valuesFrom: 'value'
    //     })
    // )


    return (
        <div style={{height: "calc(100vh - 210px)"}}>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <ResponsiveBar
                data={data}
                indexBy={pivotfilter}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'sandwich'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            />
        </div>
    )
}

export default BarChart