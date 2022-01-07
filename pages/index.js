import Head from 'next/head'

import { useState } from 'react';

import { Chart } from "react-google-charts";

export default function Home() {

  const [options, setOptions] = useState({
    title: 'Gráfico de Geo',
    region: '005'
  })

  const countrys = ["BR","AR","CO","PE","CL","VE","BO","UY","GY","SR","PY","TT","EC"]

  const population = []

  const getCountys = async () => {
    countrys.map(async(country) => {
      const response = await (await fetch(`https://servicodados.ibge.gov.br/api/v1/paises/${country}/indicadores/77849`)).json()

      const newCountries = {
        nome: response[0].series[0].pais.nome,
        population: response[0].series[0].serie[response[0].series[0].serie.length - 1]
      }

      newCountries.nome === 'Brasil' ? newCountries.nome = 'Brazil' : newCountries.nome
      newCountries.nome === 'Paraguai' ? newCountries.nome = 'Paraguay' : newCountries.nome
      newCountries.nome === 'Bolívia' ? newCountries.nome = 'Bolivia' : newCountries.nome
      newCountries.nome === 'Uruguai' ? newCountries.nome = 'Uruguay' : newCountries.nome
      newCountries.nome === 'Colômbia' ? newCountries.nome = 'Colombia' : newCountries.nome
      newCountries.nome === 'Equador' ? newCountries.nome = 'Ecuador' : newCountries.nome
      newCountries.nome === 'Guiana' ? newCountries.nome = 'Guyana' : newCountries.nome
      // newCountries.nome === 'Brasil' ? newCountries.nome = 'Brazil' : null
      // newCountries.nome === 'Brasil' ? newCountries.nome = 'Brazil' : null
      // newCountries.nome === 'Brasil' ? newCountries.nome = 'Brazil' : null
      // newCountries.nome === 'Brasil' ? newCountries.nome = 'Brazil' : null
      console.log(newCountries)
      population.push(newCountries)
    })
  }


  function setNewChart() {
    const formatCountries = population.map(pop => {
      const obj = [pop.nome, pop.population['2020']]
      return obj
    })

    const newData = [
      ['Country', "Popularity"],
      ...formatCountries
    ]

    setData(newData)
  }

  const [data, setData] = useState([
    ['País', 'Pessoas'],
  ])

  getCountys()
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
            width={'700px'}
            height={'500px'}
            chartType="GeoChart"
            data={data}
            options={options}
          />
          <button onClick={setNewChart}>Exibit</button>
        </div>
      </main>
    </div>
  )
}
