import React from 'react'
import ReactEcharts from 'echarts-for-react'
import styles from './chart.less'

function clientStaticsComponent ({ data }) {
  let clientData = []
  let clientMount = []
  data.forEach((value, index) => {
    clientData.push(`${value.period}月期`)
  })
  for (let i = 0; i < data.length; i++) {
    clientMount.push({ value: data[i].amount, name: `${data[i].period}月期` })
  }

  const option = {
    title: {
      text: '本月成交金额',
      subtext: '投资期限分布图',
      x: 'center',
      textStyle: {
        fontWeight: 'bold',
        fontSize: '16'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}月期 : {c}万元 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: clientData,
    },
    series: [
      {
        name: '成交金额',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: clientMount,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
    color: ['#50CB74', '#3ECBCB', '#9760E4', '#F2637B']
  }

  const hasData = clientData && clientData.length > 0 && clientMount && clientMount.length > 0
  return (
    <div className={styles.chartwrap}>
      <div className="parent">
        {
          hasData &&
          <ReactEcharts
            option={option}
            style={{ height: 350 }}
          />
        }
        {
          !hasData &&
          <div className={styles.clientNoData}>
            <h2>本月成交金额</h2>
            <div>暂无数据</div>
          </div>
        }

      </div>
    </div>
  )
}

export default clientStaticsComponent
