import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory'
import data from '../data/data.json'
import Select from 'react-select'

const fullName = {
  TBW: 'Total Body Water',
  BFM: 'Body Fat Mass',
  WEIGHT: 'Weight',
  SSM: 'Skeleton Muscle Mass',
  BMI: 'Body Mass Index',
  PBF: 'Percentage of Body Fat',
  WHR: 'Waist Hip Ratio'
}

const options = Object.keys(data[0])
  .filter(d => d !== 'week')
  .map(key => {
    return {
      value: key,
      label: fullName[key] || key
    }
  })

function showValue(value) {
  ReactDOM.render(
    <App value={value}/>,
    document.querySelector('#app')
  )
}
const handleSelectChange = (val) => {
  const value = val ? val.value : 'WEIGHT'
  showValue(value)
}

const App = ({value}) => {
  return (
    <div>
      <Select
        name="form-field-name"
        onChange={handleSelectChange}
        options={options}
        value={value}
        />
      <VictoryChart
        width={500}
        >
        <VictoryLine
          animate={{ duration: 500, easing: 'quadInOut' }}
          data= {data}
          x={function(d) { return d.week } }
          y={function(d) { return d[value] } }
          />
        <VictoryAxis
          label="Week"
          padding={75}
          tickValues={data.map(d => d.week) }
          />
        <VictoryAxis dependentAxis
          label={fullName[value] || value}
          padding={75}
          />
      </VictoryChart>
    </div>
  )
}

App.propTypes = {
  value: PropTypes.string.isRequired
}
showValue('WEIGHT')
