import Header from './components/Header'
import BarChart from './components/BarChart'
import NFTTable from './components/NFTTable.js'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const saleCountCutoff = 1
  const numberOfCollectionsToShow = 20

  const chart = () => {
    let names = [];
    let saleCounts = [];
    let totalSalesInGwei = [];
    let imageUrls = [];
    let collectionCreationDates = [];
    let tableRows = [];

    axios
      .get("http://3.129.62.178:8080/v1/activity/summary")
      .then(res => {
        // console.log(res)
        const filteredCollections = res.data.collections.filter(collection => collection.count > saleCountCutoff);

        for (let i = 0; i < numberOfCollectionsToShow; i++) {
          const collection = filteredCollections[i];
          let tableRow = [];
          tableRow.push(i+1);

          names.push(collection.name);
          tableRow.push(collection.name);
          tableRow.push(<img src={collection.image_url} alt={collection.name}/>);
          let parsedCollectionCount = parseInt(collection.count);
          saleCounts.push(parsedCollectionCount);
          tableRow.push(parsedCollectionCount);
          let parsedTotalSales = parseInt(collection.total_sales_in_gwei);
          totalSalesInGwei.push(parsedTotalSales);
          tableRow.push(parsedTotalSales/(10**9));
          imageUrls.push(collection.image_url);
          collectionCreationDates.push(collection.created_date);
          tableRows.push(tableRow);
        }
        setChartData({
          labels: names,
          datasets: [
            {
              label: "Number of sales",
              data: saleCounts,
              backgroundColor: 'rgba(24,104,182,1)',
              borderWidth: 2
            }
          ]
        });



        setTableData({
            columns: ['Rank',
                'Collection Name',
                'Collection Logo',
                'Number of Sales in 1 hour',
                'Total Sales in 1 hour (Ξ)'],
            rows: tableRows,
        })
      })
      .catch(err => {
        console.log(err);
      })

    // console.log(names, saleCounts, totalSalesInGwei, imageUrls, collectionCreationDates)
  }

  useEffect(() => {
    chart()
  }, [])

  return (
    <div className='container'>
      <Header title='NFTActions' />
      <div>
          {chartData ? <BarChart chartData={chartData} /> : null}

      </div>
      <div>
          {tableData ? <NFTTable tableData={tableData} />: null}

      </div>
    </div>
  )
}

export default App;
