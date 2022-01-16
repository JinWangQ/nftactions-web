import Header from './components/Header'
import BarChart from './components/BarChart'
import PlaceholderBlock from './components/PlaceholderBlock'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [chartData, setChartData] = useState({});
  const saleCountCutoff = 20

  const chart = () => {
    let names = [];
    let saleCounts = [];
    let totalSalesInGwei = [];
    let imageUrls = [];
    let collectionCreationDates = [];

    axios
      .get("http://3.129.62.178:8080/v1/activity/summary")
      .then(res => {
        console.log(res)
        const filteredCollections = res.data.collections.filter(collection => collection.count > saleCountCutoff)
        for (const collection of filteredCollections) {
          names.push(collection.name)
          saleCounts.push(parseInt(collection.count))
          totalSalesInGwei.push(parseInt(collection.total_sales_in_gwei))
          imageUrls.push(collection.image_url)
          collectionCreationDates.push(collection.created_date)
        }
        setChartData({
          labels: names,
          datasets: [
            {
              label: "Number of sales in 1 hour",
              data: saleCounts,
              backgroundColor: ['rgba(24,104,182,1)'],
              borderWidth: 2
            }
          ]
        })
      })
      .catch(err => {
        console.log(err);
      })

    console.log(names, saleCounts, totalSalesInGwei, imageUrls, collectionCreationDates)
  }

  useEffect(() => {
    chart()
  }, [])

  return (
    <div className='container'>
      <Header title='NFTActions' />
      <div><BarChart chartData={chartData} /></div>      
      <PlaceholderBlock text='This is where the table could be added' />
    </div>
  )
}

export default App;
