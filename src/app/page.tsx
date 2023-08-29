'use client';
import { useEffect, useRef, useState } from 'react';
import DATA from '../data.json';

export interface ImpactAssessmentData {
  'Company Name': string;
  'Total Revenue': string;
  'Company Market Cap': string;
  'Women Managers': number;
  'Women Employees': number;
  'ESG Score': number;
  'CO2 Scope 1 & 2 Adjusted': number | string;
  'CO2 Scope 1 & 2 Revenue Adjusted': number | string;
  'CO2 Scope 3 Adjusted': number | string;
  'CO2 Scope 3 Revenue Adjusted': number | string;
}

export default function Home() {
  const [sort, setSort] = useState<keyof ImpactAssessmentData>('Company Name');
  const [orderedData, setOrderedData] = useState<ImpactAssessmentData[]>(DATA);
  const isInitialRender = useRef(true);

  useEffect(() => {
    //Prevenir que el useEffect se ejecute en el primer render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Función para eliminar caracteres no numéricos y convertir a número
    const cleanAndParse = (value: string | number) => {
      if (typeof value === 'string') {
        // Eliminar caracteres no numéricos como "$" y ","
        const cleanedValue = value.replace(/[$,]/g, '');
        // Intentar convertir a número, si falla, devolver 0
        return parseFloat(cleanedValue) || 0;
      } else {
        return value;
      }
    };

    const compareFunction = (a: ImpactAssessmentData, b: ImpactAssessmentData) => {
      if (sort === 'Company Name') {
        return a[sort].localeCompare(b[sort]);
      } else {
        const valueA = cleanAndParse(a[sort]);
        const valueB = cleanAndParse(b[sort]);

        if (valueA < valueB) {
          return 1;
        } else if (valueA > valueB) {
          return -1;
        } else {
          return 0;
        }
      }
    };

    // Ordenar los datos en función de la columna seleccionada
    const sortedData = [...orderedData].sort(compareFunction);
    setOrderedData(sortedData);
  }, [sort]);

  return (
    <main>
      <h1 className='text-center mb-16 mt-8 text-4xl font-semibold'>Impact Assessment Data</h1>
      <table cellSpacing={3} className='tabla w-full'>
        <thead>
          <tr>
            <th colSpan={3}></th>
            <th className='border-b px-3' colSpan={2}>
              WOMEN (PER 100)
            </th>
            <th className='border-b px-3' colSpan={2}>
              CO2 SCOPE 1 & 2
            </th>
            <th className='border-b px-3' colSpan={2}>
              CO2 SCOPE 3
            </th>
            <th colSpan={2}></th>
          </tr>
          <tr>
            <th onClick={() => setSort('Company Name')} className={` ${sort === 'Company Name' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              COMPANY NAME
            </th>
            <th onClick={() => setSort('Total Revenue')} className={` ${sort === 'Total Revenue' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              TOTAL COMPANY REVENUE
            </th>
            <th onClick={() => setSort('Company Market Cap')} className={` ${sort === 'Company Market Cap' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              MARKET CAPITALIZATION
            </th>
            <th onClick={() => setSort('Women Managers')} className={` ${sort === 'Women Managers' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              MANAGERS
            </th>
            <th onClick={() => setSort('Women Employees')} className={` ${sort === 'Women Employees' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              EMPLOYEES
            </th>
            <th onClick={() => setSort('CO2 Scope 1 & 2 Adjusted')} className={` ${sort === 'CO2 Scope 1 & 2 Adjusted' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              TOTAL
            </th>
            <th onClick={() => setSort('CO2 Scope 1 & 2 Revenue Adjusted')} className={` ${sort === 'CO2 Scope 1 & 2 Revenue Adjusted' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              REV ADJ
            </th>
            <th onClick={() => setSort('CO2 Scope 3 Adjusted')} className={` ${sort === 'CO2 Scope 3 Adjusted' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              TOTAL
            </th>
            <th onClick={() => setSort('CO2 Scope 3 Revenue Adjusted')} className={` ${sort === 'CO2 Scope 3 Revenue Adjusted' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              REV ADJ
            </th>
            <th onClick={() => setSort('ESG Score')} className={` ${sort === 'ESG Score' ? 'font-extrabold flechaActiva' : 'font-medium'} relative border-b px-3 cursor-pointer flecha`}>
              ESG SCORE
            </th>
          </tr>
        </thead>
        <tbody>
          {orderedData.map((data, index) => {
            const porcentaje = Math.round(data['ESG Score'])
            const divStyle = {
              width: `${porcentaje}%`,
              backgroundColor: `rgb(93, 143, 214, 0.${porcentaje} )`
            };
            
            return (
              <tr key={`${data['Company Name']}-${index}`}>
                <td className='px-3'>{data['Company Name']}</td>
                <td className='px-3'>{data['Total Revenue']}</td>
                <td className='px-3'>{data['Company Market Cap']}</td>
                <td className='px-3'>{data['Women Managers']}</td>
                <td className='px-3'>{data['Women Employees']}</td>
                <td className='px-3'>{data['CO2 Scope 1 & 2 Adjusted']}</td>
                <td className='px-3'>{data['CO2 Scope 1 & 2 Revenue Adjusted']}</td>
                <td className='px-3'>{data['CO2 Scope 3 Adjusted']}</td>
                <td className='px-3'>{data['CO2 Scope 3 Revenue Adjusted']}</td>
                <td className='px-3 flex justify-between'>
                  <span className='pr-6'>{data['ESG Score'].toFixed(2)}</span>
                  <div className='h-7 w-32 relative'>
                    <div className={`absolutebg-blue-200 h-full`} style={divStyle}></div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
