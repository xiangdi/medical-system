import React from 'react'
import ReactEcharts from 'echarts-for-react'
import _ from 'lodash'
import { formatNumber } from '../../../utils/'
import styles from './chart.less'

function dealCurveComponent ({ data }) {
  let dealData = []
  let clinchData = []
  let clincnMount = []
  let maxInterval, maxIntervalPeople

  data.forEach((value, index) => {
    dealData.push(value.yearMonth)
    clinchData.push(value.userCount)
    clincnMount.push(formatNumber(value.amount, 2))
  })
  maxInterval = _.max(clincnMount) || 0
  maxIntervalPeople = _.max(clinchData) || 0

  const option = {
    title: {
      text: '交易曲线图',
      x: 'left',
      textStyle: {
        fontWeight: 'bold',
        fontSize: '16'
      }
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '24%',
      bottom: '10%'
    },
    legend: {
      data:['成交金额(万元)', '成交人数(人)'],
      right: '0'
    },
    xAxis: [
      {
        type: 'category',
        data: dealData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: function(value){
          return Math.ceil(value.max/5)*5
        },
        interval: Math.ceil(maxInterval/5),
        name: '成交金额(万元)',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        min: 0,
        max: function(value){
          return Math.ceil(value.max/5)*5
        },
        interval: Math.ceil(maxIntervalPeople/5),
        name: '成交人数(人)',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '成交金额(万元)',
        type: 'line',
        data: clincnMount,
        areaStyle: {
          normal: {
            color: '#9760E4'
          }
        }
      },
      {
        name: '成交人数(人)',
        yAxisIndex: 1,
        type: 'bar',
        barWidth: '40%',
        areaStyle: { normal: {} },
        data: clinchData,
      }
    ],
    color: ['#9760E4', '#3FA9FF']
  }

  return (
    <div className={styles.chartwrap}>
      <div className="parent">
        <ReactEcharts
          option={option}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
          theme="macarons"
        />
      </div>
    </div>
  )
}

export default dealCurveComponent
