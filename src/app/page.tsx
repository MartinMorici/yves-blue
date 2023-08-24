import { useState } from 'react';
import DATA from '../data.json';


export interface ImpactAssessmentData {
  "Company Name":                     string;
  "Total Revenue":                    string;
  "Company Market Cap":               string;
  "Women Managers":                   number;
  "Women Employees":                  number;
  "ESG Score":                        number;
  "CO2 Scope 1 & 2 Adjusted":         number | string;
  "CO2 Scope 1 & 2 Revenue Adjusted": number | string;
  "CO2 Scope 3 Adjusted":             number | string;
  "CO2 Scope 3 Revenue Adjusted":     number | string;
}


export default function Home() {
  const [sort, setSort] = useState<keyof ImpactAssessmentData >("Company Name")
  return (
    <main>
      <h1>Impact Assessment Data</h1>
      <table cellSpacing={3} className='tabla'>
        <thead>
          <tr>
            <th colSpan={3}></th>
            <th className='border-b px-3' colSpan={2}>WOMEN (PER 100)</th>
            <th className='border-b px-3' colSpan={2}>CO2 SCOPE 1 & 2</th>
            <th className='border-b px-3' colSpan={2}>CO2 SCOPE 3</th>
            <th colSpan={2}></th>
          </tr>
          <tr>
            <th className='border-b px-3'>COMPANY NAME</th>
            <th className='border-b px-3'>TOTAL COMPANY REVENUE</th>
            <th className='border-b px-3'>MARKET CAPITALIZATION</th>
            <th className='border-b px-3'>MANAGERS</th>
            <th className='border-b px-3'>EMPLOYEES</th>
            <th className='border-b px-3'>TOTAL</th>
            <th className='border-b px-3'>REV ADJ</th>
            <th className='border-b px-3'>TOTAL</th>
            <th className='border-b px-3'>REV ADJ</th>
            <th className='border-b px-3'>ESG SCORE</th>
          </tr>
        </thead>
        <tbody>
          {DATA.map((data) => <tr>
            <td className='px-3'>{data['Company Name']}</td>
            <td className='px-3'>{data['Total Revenue']}</td>
            <td className='px-3'>{data['Company Market Cap']}</td>
            <td className='px-3'>{data['Women Managers']}</td>
            <td className='px-3'>{data['Women Employees']}</td>
            <td className='px-3'>{data['CO2 Scope 1 & 2 Adjusted']}</td>
            <td className='px-3'>{data['CO2 Scope 1 & 2 Revenue Adjusted']}</td>
            <td className='px-3'>{data['CO2 Scope 3 Adjusted']}</td>
            <td className='px-3'>{data['CO2 Scope 3 Revenue Adjusted']}</td>
            <td className='px-3'>{data['ESG Score']}</td>
          </tr>)}
        </tbody>
      </table>
    </main>
  );
}
