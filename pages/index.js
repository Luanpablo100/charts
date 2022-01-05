import Head from 'next/head'

import { useState } from 'react';

import { Chart } from "react-google-charts";

export default function Home() {

  const [options, setOptions] = useState({
    title: 'Gráfico de Pizza',
  })

  async function getUsers() {
    const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
    const newUsers = {
      name: users[1].name,
      geo: users[1].address.geo
    }

    const userContry = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newUsers.geo.lat},${newUsers.geo.lng}&key=AIzaSyB3o-bJxcxHUls1973PoaBcMkKkg2wx5w8`)).json()

    console.log(newUsers)
    console.log(userContry)
  }

  const [data, setData] = useState([
    ['País', 'Pessoas'],
    ['Brazil', 100],
    ['United States', 50],
  ])

  getUsers()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Charts
        </h1>
        <div>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="GeoChart"
            data={data}
            options={options}
          />
        </div>
      </main>
    </div>
  )
}
