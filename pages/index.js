import Head from 'next/head'

import { useState, useEffect } from 'react';

import { Chart } from "react-google-charts";

export default function Home() {

  const [options, setOptions] = useState({
    title: 'Gráfico de Geo',
    region: '005'
  })

  const countrys = ["BR","AR","CO","PE","CL","VE","BO","UY","GY","SR","PY","TT","EC"]

  let population = [
    ['Country', 'Population'],
  ]

  const [data, setData] = useState([
    ['Country', 'Population'],
  ])

  const getCountys = async () => {
    countrys.map(async (country) => {

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

      const formatedCountrie = [
        newCountries.nome,
        parseInt(newCountries.population['2020'])
      ]

      population.push(formatedCountrie)
    })

  }

  useEffect(() => {
    getCountys().then(setData(population))

  }, [])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Gráficos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-screen flex-1 text-center">
        <h1 className="text-3xl lg:text-6xl font-bold mb-2">
          População da América Latina
        </h1>
        <div className='p-2 w-screen md:w-auto'>
          <Chart
            width={'auto'}
            height={'auto'}
            chartType="GeoChart"
            data={data}
            options={options}
          />
        </div>
        <p>Dados IBGE 2020</p>
      </main>
    </div>
  )
}
