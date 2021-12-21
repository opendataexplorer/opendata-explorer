import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';

import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// Components

import Dashboard from "../dashboard/Dashboard"

// Forms

import form_dimensions from "../forms/dimensions.json"

// Headless UI, Icons
import { Menu } from '@headlessui/react'
import {
  ChevronDoubleLeftIcon,
  InformationCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/outline'


const Tables = () => {

  const [cubes, setCubes] = useState()
  const [currentCube, setCurrentCube] = useState()
  const [sliceStart, setSliceStart] = useState(0)
  const [sliceEnd, setSliceEnd] = useState(20)
  const [filters, setFilters] = useState()
  const [display, setDisplay] = useState(true)

  const [showDetails, setShowDetails] = useState(false)



  const subjects = ["Government",
    "Income, pensions, spending and wealth",
    "International trade",
    "Health",
    "Labour",
    "Languages",
    "Manufacturing",
    "Population and demography",
    "Prices and prices indexes",
    "Statistical methods",
    "Retail and wholesale",
    "Business and consumer services and culture",
    "Information and communications technology",
    "Housing"]

  useEffect(() => {
    fetch(`/data/metadata.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => {
        setCubes(data)
      })


  }, [])


  const changeSliceArray = ({ selected }) => {

    setSliceStart(selected * 20)
    setSliceEnd(selected * 20 + 20)
  }

  const handlePage = (e) => {
    setCurrentCube(parseInt(e.currentTarget.id))
    setDisplay(false)
  }



  const handleSelectSubject = (e) => {
    setFilters(prevFilter => ({
      ...prevFilter,
      subject: e.target.name
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }

  const handleDisplay = () => {
    setDisplay(prevDisplay => {
      return (!prevDisplay)
    })
    setCurrentCube()
  }


  const onDimensionSelect = (item) => {
    setFilters(prevFilter => ({
      ...prevFilter,
      dimensions: item.name
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }


  const handleShowDetails = () => {
    setShowDetails(prevDetails => !prevDetails)
  }


  const handleFilterTitle = (e) => {
    setFilters(prevFilter => ({
      ...prevFilter,
      title: e.target.value
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }

  const handleClearTitle = () => {
    setFilters(prevFilter => ({
      ...prevFilter,
      title: undefined
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }

  const handleClearSubject = () => {
    setFilters(prevFilter => ({
      ...prevFilter,
      subject: undefined
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }

  const handleClearDimension = () => {
    setFilters(prevFilter => ({
      ...prevFilter,
      dimensions: undefined
    }))
    setSliceStart(0)
    setSliceEnd(20)
  }

  const pageLength = cubes &&
    cubes
      .filter(point => filters && filters.subject ? point.subject.map(subject => subject.name).includes(filters.subject) : point)
      .filter(point => filters && filters.dimensions ? point.dimensions.map(dimension => dimension.dimensionNameEn).includes(filters.dimensions) : point)
      .filter(point => filters && filters.title ? point.cubeTitleEn.toLowerCase().includes(filters.title) : point)
      .filter(point => point.available).length / 20

  return (
    <div className="px-5">




      {cubes && display ?

        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 200px)" }}>


          <div className="flex items-center">
            {
              filters && (filters.subject || filters.title || filters.dimensions) ?
              <p className="py-2 mr-2">Filters:</p>:
              <p className="py-2 invisible">Filters:</p>
            }

            <div className="flex">
              {filters && filters.title && <p className="mr-2 p-1 bg-gray-100 rounded cursor-pointer" onClick={handleClearTitle}>{filters.title}</p>}
              {filters && filters.subject && <p className="mr-2 p-1 bg-gray-100 rounded cursor-pointer" onClick={handleClearSubject}>{filters.subject}</p>}
              {filters && filters.dimensions && <p className="mr-2 p-1 bg-gray-100 rounded cursor-pointer" onClick={handleClearDimension}>{filters.dimensions}</p>}

            </div>

          </div>


          <div className="align-middle inline-block w-full">
            <div className="overflow-x-auto border border-gray-200 rounded overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>

              <table className="min-w-full divide-y divide-gray-200 table-fixed border-separate" style={{ borderSpacing: 0 }}>
                <thead className="sticky top-0">

                  <tr className="border-b">
                    <th className="text-left px-2 font-medium bg-white tracking-wider w-1/2 border-b">
                      <div className="flex items-center border rounded max-w-min p-2 cursor-pointer hover:bg-gray-50">

                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="flex items-center">
                            <p className="font-medium mr-2">Title</p>
                            <ChevronDownIcon className="ml-2 w-4 h-4 opacity-50" />
                          </Menu.Button>
                          <Menu.Items disabled className="z-50 overflow-y-auto absolute origin-bottom-left -left-2 top-10 xl:w-96 lg:w-80 md:w-64 sm:w-36 xs:w-24 w-32 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="m-4">
                              <input
                                type="text"
                                className="focus:outline-none border w-full h-8"
                                value={filters && filters.title && filters.title}
                                onInput={handleFilterTitle} />
                            </div>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </th>
                    <th className="text-left px-2 py-4 font-medium bg-white tracking-wider w-1/8 border-b">
                      <div className="flex items-center border rounded max-w-min p-2 cursor-pointer hover:bg-gray-50">
                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="flex items-center">
                            <p className="font-medium mr-2">Subject</p>
                            <ChevronDownIcon className="ml-2 w-4 h-4 opacity-50" />
                          </Menu.Button>
                          <Menu.Items className="z-50 overflow-y-auto absolute origin-bottom-left -left-2 top-10 xl:w-96 lg:w-80 md:w-64 sm:w-36 xs:w-24 w-32 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                              {subjects.map(subject => {
                                return (
                                  <Menu.Item>
                                    <button
                                      name={subject}
                                      onClick={handleSelectSubject}
                                      className="group flex text-left justifyrounded-md w-full px-2 py-2 text-sm hover:bg-gray-50">
                                      {subject}
                                    </button>
                                  </Menu.Item>
                                )
                              })}
                            </div>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </th>
                    <th className="text-left px-2 py-4 font-medium bg-white tracking-wider w-1/8 border-b">
                      <div className="flex items-center border rounded max-w-min p-2 cursor-pointer hover:bg-gray-50">
                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="flex items-center">
                            <p className="font-medium mr-2">Source</p>
                            <ChevronDownIcon className="ml-2 w-4 h-4 opacity-50" />
                          </Menu.Button>
                          <Menu.Items className="z-50 overflow-y-auto absolute origin-bottom-left -left-2 top-10 xl:w-96 lg:w-80 md:w-64 sm:w-36 xs:w-24 w-32 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1">
                              <Menu.Item>
                                <button
                                  className="group flex text-left justifyrounded-md w-full px-2 py-2 text-sm hover:bg-gray-50">
                                  Statistics Canada
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </th>
                    <th className="text-left px-2 font-medium bg-white tracking-wider border-b w-1/4">
                      <div className="flex items-center border rounded max-w-min p-2 cursor-pointer hover:bg-gray-50">

                        <Menu as="div" className="relative inline-block">
                          <Menu.Button className="flex items-center">
                            <p className="font-medium mr-2">Dimensions</p>
                            <ChevronDownIcon className="ml-2 w-4 h-4 opacity-50" />
                          </Menu.Button>
                          <Menu.Items className="z-50 absolute origin-bottom-right -right-2 top-10 xl:w-96 lg:w-80 md:w-64 sm:w-36 xs:w-24 w-32 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="m-4 max-h-max">
                              <ReactSearchAutocomplete
                                styling={{ borderRadius: "2px", zIndex: 49, height: "30px" }}
                                items={form_dimensions}
                                showIcon={false}
                                onSelect={onDimensionSelect}
                              />
                            </div>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </th>
                  </tr>
                </thead>

                {
                  cubes
                    .filter(point => filters && filters.subject ? point.subject.map(subject => subject.name).includes(filters.subject) : point)
                    .filter(point => filters && filters.dimensions ? point.dimensions.map(dimension => dimension.dimensionNameEn).includes(filters.dimensions) : point)
                    .filter(point => filters && filters.title ? point.cubeTitleEn.toLowerCase().includes(filters.title) : point)
                    .filter(point => point.available)
                    .slice(sliceStart, sliceEnd)
                    .map(point => {
                      return (
                        <tr className={`hover:bg-gray-100 cursor-pointer ${currentCube === point.productId && "bg-gray-100"}`} id={point.productId} onClick={handlePage}>
                          <td className="p-2 border-b overflow-x-auto">{point.cubeTitleEn}</td>
                          <td className="p-2 border-b overflow-x-auto">{point.subject && point.subject.map(subject => { return (<p>{subject.name}</p>) })}</td>
                          <td className="p-2 border-b overflow-x-auto">Statistics Canada</td>
                          <td className="p-2 border-b overflow-x-auto">
                            <div className="flex flex-wrap">
                              {point.dimensions &&
                                point.dimensions.map(dimension => {
                                  return (
                                    <p className="text-sm bg-gray-200 p-1 rounded m-1">
                                      {dimension.dimensionNameEn}
                                    </p>
                                  )
                                })}

                            </div>
                          </td>
                        </tr>
                      )
                    })
                }




              </table>
            </div>
          </div>

          <div className="mx-1 p-1">
            <ReactPaginate
              previousLabel={'previous'}
              previousClassName={'flex-grow'}
              previousLinkClassName={'flex-grow relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 cursor-pointer'}
              nextLabel={'next'}
              nextClassName={'flex-grow text-right'}
              nextLinkClassName={'flex-grow relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 cursor-pointer'}
              breakLabel={'...'}
              breakLinkClassName={'relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer'}
              pageLinkClassName={'bg-white border-gray-300 text-gray-500 inline-flex relative items-center p-2 px-4 text-sm font-medium hover:bg-gray-100 cursor-pointer'}
              pageCount={pageLength}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              containerClassName={'flex justify-between'}
              onPageChange={changeSliceArray}
              activeLinkClassName={'z-10 bg-gray-50 relative inline-flex items-center px-4 py-2  text-sm font-medium'}
              forcePage={sliceStart / 20}
            />
          </div>
        </div>

        : cubes &&
        <div className="flex justify-between">
          <div className="flex m-2 p-2 rounded hover:bg-gray-100 bg-gray-50 cursor-pointer items-center" onClick={handleDisplay}>
            <ChevronDoubleLeftIcon className="w-4 h-4 mr-2" />
            <p>Back to Dataset Selection</p>
          </div>
          <button onClick={handleShowDetails} className={`rounded hover:bg-gray-100 bg-gray-50 p-2 m-2 ${showDetails && "bg-gray-100"}`}>
            <div className="flex items-center">
              <InformationCircleIcon className="w-4 h-4 mr-2" />
              <p>Info</p>
            </div></button>
        </div>
      }
      {/* {<pre>Cube:{JSON.stringify(cubes.filter(cube => cube.productId === currentCube)[0], null, 2)}</pre>} */}
      {cubes && <Dashboard metadata={cubes.filter(cube => cube.productId === currentCube)[0]} details={showDetails} />}

    </div>
  )
}

export default Tables