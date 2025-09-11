import React from 'react'
import Hero from './Hero'
import WorldMap from './WorldMap'
import DataPortal from './DataPortal'
import ProcessOverview from './ProcessOverview'
import FileUploader from './FileUploader'

const Home = () => {
  return (
    <div>
        <Hero/>
        <WorldMap/>
        <DataPortal/>
        <ProcessOverview/>
        <FileUploader/>
    </div>
  )
}

export default Home