import React from 'react'

import groupBy from 'json-groupby'

import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data, uom, filters }) => {

    const pivotfilter = filters.filter(object => object.pivot)[0].col

    const pivotdatagroup = groupBy(data, [pivotfilter])

    const pivotdata = Object.keys(pivotdatagroup).map(key => ({ id: key, data: pivotdatagroup[key].map(point => ({ x: point.ref_date, y: point.value })) }))

    return (
        // <pre>{JSON.stringify(pivotdata, null, 2)}</pre>
        <div style={{height: "calc(100vh - 210px)"}}>
            <ResponsiveLine
                data={pivotdata}
                margin={{ top: 50, right: 200, bottom: 50, left: 80 }}
                xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day', useUTC: false }}
                xFormat="time:%Y-%m-%d"
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: '%Y',
                    legend: 'date',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: uom,
                    legendOffset: -70,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                enableCrosshair={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 12,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                
                tooltip={(point) => (
                    <div
                        style={{
                            
                            color: 'black',
                            background: 'white',
                            borderRadius: 5,
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            border: `1px solid ${point.point.serieColor}`,
                            display: 'flex',
                            alignItems: 'stretch',
                            fontSize: 12
                        }}>
                        <p style={{maxWidth:250, padding: 6}}>{point.point.serieId}</p>

                        <p style={{padding:6, alignSelf:"stretch"}}>{point.point.data.xFormatted.slice(0,7)}</p>
                        <p style={{borderLeft:`1px solid ${point.point.serieColor}`, padding: 6, alignSelf:"stretch"}}>{point.point.data.y}</p>
                        
                        
                    </div>
                )}
                />
        </div>
    )


}
export default LineChart