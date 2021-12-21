import React, { useState, useEffect } from 'react'

//Firebase
import app from "../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage"

// Components
import LineChart from "./charts/LineChart"
import BarChart from "./charts/BarChart"


import {
    ExternalLinkIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'

const storage = getStorage(app)

const Dashboard = ({ metadata, details }) => {

    const pid = metadata && metadata.productId

    const [dashboardData, setData] = useState()

    const [filters, setFilters] = useState()

    useEffect(() => {
        pid ?
            Promise.all([
                getDownloadURL(ref(storage, `${pid}.json`))
                    .then(url => {
                        fetch(url)
                            .then(response => response.json())
                            .then(data => { setData(data) })
                    })
                    .catch(err => console.log(err)),
                getDownloadURL(ref(storage, `${pid}-filters.json`))
                    .then(url => {
                        fetch(url)
                            .then(response => response.json())
                            .then(data => setFilters(data))
                    })
                    .catch(err => console.log(err))

            ])
            :
            setData()
        setFilters()

    }, [pid])



    const filteredData = dashboardData && filters && dashboardData.filter(point => {
        return filters.every(object => {
            return object.filters.filter(value => value.filter).map(value => value.name).includes(point[object.col])
        })
    })


    const handleFilterChange = (e) => {


        const id = e.currentTarget.id
        const name = e.currentTarget.name


        setFilters(prevFilter => {
            return (
                prevFilter.map(object => {
                    return ({
                        ...object,
                        filters: object.filters.map(value => {
                            if (object.pivot && id === value.name) {
                                return ({
                                    "name": value.name,
                                    "filter": !value.filter
                                })
                            } else if (!object.pivot) {
                                if (id === value.name) {
                                    return ({
                                        "name": value.name,
                                        "filter": value.filter ? true : true
                                    })

                                } else if (name === object.col) {
                                    return ({
                                        "name": value.name,
                                        "filter": false
                                    })

                                } else {
                                    return ({
                                        "name": value.name,
                                        "filter": value.filter
                                    })
                                }
                            } else {
                                return ({
                                    "name": value.name,
                                    "filter": value.filter
                                })
                            }
                        })
                    })

                })
            )
        })
    }

    const handlePivotChange = (e) => {
        const name = e.target.name
        setFilters(prevFilter => {
            return (
                prevFilter.map(object => {
                    return ({
                        ...object,
                        pivot: object.col === name ? true : false,
                        filters: object.filters.map((value, index) => {
                            if ((object.col === name && index < 11) || index === 0) {
                                return ({
                                    "name": value.name,
                                    "filter": true
                                })
                            } else {
                                return ({
                                    "name": value.name,
                                    "filter": false
                                })
                            }
                        })
                    })
                })
            )
        })
    }



    // Fetch the Current Unit of Measurement

    const uom = filters && filters.filter(object => object.col === 'uom')[0].filters.filter(uom => uom.filter === true)[0].name

    const countUnique = (iter) => {
        return new Set(iter).size
    }

    return (

        filteredData && metadata ?
            <div>
                {details &&
                    <div className="p-1 z-50 mx-10 max-h-96 overflow-y-auto absolute right-0 origin-top-right bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <table>
                            <tr className="border-b">
                                <th className="text-left p-2 m-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Table Details</th>
                                <th className="text-left p-2 m-2 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2"></th>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Source</td>
                                <td className="p-2 m-2">Statistics Canada</td>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Source Identification Code</td>
                                <td className="p-2 m-2">
                                    <div className="flex">
                                        <p>{metadata.productId}</p>
                                        <a href={`https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=${metadata.productId}01`} target="_blank" rel="noreferrer">
                                            <ExternalLinkIcon className="w-4 h-4" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Surveys</td>
                                <td className="p-2 m-2">{metadata.surveyCode && metadata.surveyCode.map(survey => { return (<p>{survey}</p>) })}</td>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Frequency</td>
                                <td className="p-2 m-2">Monthly</td>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Active or Archived</td>
                                <td className="p-2 m-2">{metadata.archived && metadata.archived === 2 ? "Active" : "Archived"}</td>
                            </tr>
                            <tr>
                                <td className="p-2 m-2">Release Date</td>
                                <td className="p-2 m-2">{metadata.releaseTime && metadata.releaseTime.slice(0, 10)}</td>
                            </tr>
                        </table>
                    </div>}


                <div className="grid grid-cols-4 grid-rows-8" style={{ height: "calc(100vh - 200px" }}>


                    <h2 className="col-span-3 row-span-1">{metadata.cubeTitleEn}</h2>

                    <div className="row-span-3 overflow-y-auto bg-gray-50 rounded" >


                        {
                            filters.map(object => {
                                return (
                                    <div className="flex flex-col">
                                        <div className="flex items-center m-2">
                                            <ChevronDownIcon className="h-4 w-4 min-w-max ml-2" />

                                            <button onClick={handlePivotChange} className={`${object.pivot ? "bg-gray-800": "bg-gray-200"} bg-gray-800 font-semibold mx-2 text-left hover:bg-gray-400 p-2 rounded`} name={object.col}>
                                            </button>
                                            <p>{object.name}</p>
                                        </div>

                                        <div className="p-1 m-1 rounded">





                                            {
                                                object.filters.map(value => {
                                                    return (
                                                        <div className="flex items-center m-2 ml-8">
                                                            <button className={`${value.filter ? "bg-gray-800": "bg-gray-200"} m-2 p-2 rounded`} onClick={handleFilterChange} name={object.col} id={value.name}>
                                                            </button>
                                                            <p>{value.name}</p>
                                                        </div>

                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="col-span-3 row-span-7">
                        {countUnique(filteredData.map(point => point.ref_date)) > 1 ?
                            <LineChart data={filteredData} uom={uom} filters={filters} /> :
                            <BarChart data={filteredData} uom={uom} filters={filters} />}

                    </div>
                </div>
                <div>
                </div>
            </div> :
            pid ?
                <div className="flex" style={{ height: "calc(100vh - 300px)" }}>
                    <div style={{ borderTopColor: "transparent" }}
                        className="w-16 h-16 m-auto border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
                </div> :
                null


    )
}

export default Dashboard