<template>
  <div id="kLinePopup">
    <div class="title">
        <p class="title-content1">
            <span class="title-name">个股案例</span>
            <span class="title-stock">{{successCode['code'] + '  ' + successCode['name']}}</span>
        </p>
        <p class="title-content2">
            <span class="title-dsc">{{successCode.time + '选出  ，' + successCode.top + '%'}}</span>
        </p>
    </div>
    <div style="width:700px;height:calc(400px - 48px);background:rgba(25, 25, 27, 1)" id="KlinePopchart"></div>
  </div>
</template>
<script>
// import axios from "@/function/request";
import axios from "axios";
// import _ from '@/function/function'
export default {
  name: "kLinePopup",
  props:['successCode'],
  data(){
    return{
      chart:void 0,
      interval: void 0,
      bottomLine: 0,
      topLine: 0,
      barData: [],
      lineData: [],
      markPointData: [],
    }
  },
  computed: {
    // successCode(){
    //     return this.$store.state.alldata.successCode
    // },
  },
  watch: {
    successCode(val,oldval){
      if(val['code']){
        // this.starChart()
        this.getZhibiao()
      }
    }
  },
  methods:{
    axiosGet(params){
        axios.timeout =  60000; //! 
        axios.defaults.withCredentials=true;
        let url = '//gpc.10jqka.com.cn/gpcapi/aistock/getsuccess'
        return new Promise(function(resolve,reject){
            axios.get(url,{"params":params})
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    setbarData(num){
        if(num > 3){
            return {
                z: num,
                n: 3, 
                m: num - 3
            }
        }else{
            return {
                z: num,
                n: num,
                m: 0
            }
        }
    },
    getZhibiao(){
      const s = this
      let param = {
        code:this.successCode['code'],
        date: this.successCode['time'].replace(/-/g,'')
      }
      this.axiosGet(param)
      .then(({ data } = {}) => {
          if(data.code == 0){
              for(let i in data.data){
                  s.barData.push(s.setbarData(data.data[i]['jghyd']['4328120']))
                  s.lineData.push({n:data.data[i]['zlld']['17435130'],m:data.data[i]['zlld']['21629434']})
                  if(s.bottomLine > data.data[i]['zlld']['17435130']){
                      s.bottomLine = data.data[i]['zlld']['17435130']
                  }
                  if(s.bottomLine > data.data[i]['zlld']['21629434']){
                      s.bottomLine = data.data[i]['zlld']['21629434']
                  }
                  if(s.topLine < data.data[i]['zlld']['17435130']){
                      s.topLine = data.data[i]['zlld']['17435130']
                  }
                  if(s.bottomLine < data.data[i]['zlld']['21629434']){
                      s.topLine = data.data[i]['zlld']['21629434']
                  }
              }
              for(let i in data.data){
                    let position,position2
                    if(s.bottomLine > -100){
                        position = s.bottomLine
                    }else{
                        position = -100
                    }
                    if(s.topLine < 80){
                        position2 = s.topLine
                    }else{
                        position2 = 80
                    }
                    if(data.data[i]['zlld']['16911130'] == 1){
                        s.markPointData.push(
                            {
                                'symbol': {
                                    'type': 'none',
                                },
                                'label': {
                                    'normal': {
                                        'show': true,
                                        'style': {
                                            'fill': 'rgb(204,0,204)',
                                            'position':[0,0]
                                        },
                                        'formatter': (d) => {
                                            return '升'
                                        }
                                    },
                                },
                                'xIndex': i,
                                'yValue': position + 40,
                            }
                        )
                    }
                    if(data.data[i]['zlld']['9046522'] == 1){
                        s.markPointData.push(
                            {
                                'symbol': {
                                    'type': 'none',
                                },
                                'label': {
                                    'normal': {
                                        'show': true,
                                        'style': {
                                            'fill': 'rgb(204,0,204)',
                                            'position':[0,-10]
                                        },
                                        'formatter': (d) => {
                                            return '顶'
                                        }
                                    },
                                },
                                'xIndex': i,
                                'yValue': position2,
                            }
                        )
                    }
                    if(data.data[i]['zlld']['12716826'] == 1){
                        s.markPointData.push(
                            {
                                'symbol': {
                                    'type': 'none',
                                },
                                'label': {
                                    'normal': {
                                        'show': true,
                                        'style': {
                                            'fill': 'rgb(204,0,204)',
                                            'position':[0,0]
                                        },
                                        'formatter': (d) => {
                                            return '底'
                                        }
                                    },
                                },
                                'xIndex': i,
                                'yValue': position,
                            }
                        )
                    }
              }
              s.starChart()
          }
      })
      .catch((e) => {
        console.log(e)
      })
    },
    starChart(){
      const s = this
        let option;
        let idx;
        var klinePrice_tooltip = D3Charts.hqHelper.klinePrice_tooltip;
        var filterNum = D3Charts.hqHelper.filterNum;

        var code = 'hs_' + this.successCode['code'];
        var day = this.successCode['time'].replace(/-/g,'')

        var color = {
            axisLine: '#2e2e2e',
            abAxis: '#de422e',
            beAxis: '#3e9663',
            eqAxis: '#999',
            ma5: '#1F6195',
            ma10: '#E0AC58',
            ma20: '#9C73AF',
            ma60: '#c66ac9',
            // 悬停十字线
            hoverLine: '#A0A0A0'
        }
        document.getElementById('KlinePopchart').style.border = '1px solid ' + color.axisLine;

        // kline数据配置
        var klinedata = {
            type: 'klineCommon',
            code: code,
            dType: 'qfqDay',
            ma: [5, 10, 20, 60],
        };

        // 获得数据
        var dataProvider = D3Charts.getDataPool().register(klinedata);
        D3Charts.getDataPool().onAction(dataProvider, 'PROVIDER_UPDATE.myproject', function (d) {

            if (d.fetchStatus.msg !== 'success') return;
            var needConvertoShou = d.data.stockType.needConvertoShou;
            var keepLen = d.data.stockType.keepLen;
            var orikData = d.data.dataArray;

            // 处理k-line数据
            let k = []
            let start
            let end
            let kLen = orikData.length
            idx = kLen- 1
            // 为了减少循环，从最后一个开始
            for (let i = kLen - 1; i > 0; i--) {
                if (orikData[i].t == day) {
                    idx = i
                    break
                }
            }
            let diff = kLen - idx
            let sup = 0
            if (diff >= 21) {
                end = idx + 21
            } else {
                end = kLen
                sup = 21 - diff
            }
            start = idx - 9 - sup
            for (let j = start - 1; j < end; j++) {
                k.push(orikData[j])
                if(j == idx){
                  idx = k.length - 1
                }
            }
            var kData = k.filter(item => item)
            for (let i = 0; i < kData.length; i++) {
                let flag
                // 收盘价 >= 开盘价
                if (kData[i].c >= kData[i].o) {
                    flag = 1
                } else { // 收盘价 < 开盘价
                    flag = 2
                }
                s.$set(s.barData[i],'f',flag)
            }
            option = {
                axis: [{
                        position: 'bottom',
                        type: 'band',
                        $gridIndex: [0, 1, 2],
                        xOrY: 'x',
                        $dataIndex: 0,
                        dataKey: 't',
                        paddingInner: 0.3,
                        paddingOuter: 0.3,
                        barGap: 0,
                        tickValues: function (domain) {
                            var n = domain.length - 1;
                            var split = n / 6;
                            return [domain[Math.round(n / 6)], domain[Math.round(n * 3 / 6)],
                                domain[Math.round(n * 5 / 6)]
                            ];
                        },
                        splitLine: {
                            show: true,
                            style: {
                                stroke: color.axisLine,
                                lineDash: [3, 4],
                                lineWidth: 1
                            }
                        },
                        label: {
                            padding: 4,
                            inRange: true,
                            style: {
                                fill: color.eqAxis
                            },
                            formatter: function (d) {
                                return d.substr(0, 4) + '-' + d.substr(4, 2) + '-' + d.substr(6, 2);
                            }
                        },
                        line: {
                            show: false
                        },
                        tick: {
                            show: false
                        }
                    },
                    {
                        position: 'right',
                        type: 'linear',
                        space: [10, 20],
                        $gridIndex: 0,
                        xOrY: 'y',
                        tickValues: function (domain) {
                            var min = domain[0];
                            var max = domain[1];
                            var detar = max - min;
                            return [domain[0], detar / 4 + domain[0], detar * 2 / 4 + domain[0],
                                detar * 3 / 4 + domain[0], domain[1]
                            ];
                        },
                        label: {
                            padding: 4,
                            inRange: true,
                            style: {
                                fill: color.eqAxis
                            },
                        },
                        line: {
                            show: false
                        },
                        tick: {
                            show: false
                        }
                    },
                    {
                        position: 'right',
                        type: 'linear',
                        $gridIndex: 2,
                        domainScale: 1.5,
                        min: 0,
                        splitNumber: 3,
                        xOrY: 'y',
                        label: {
                            padding: 4,
                            inRange: true,
                            style: {
                                fill: color.eqAxis
                            },
                            formatter: function (v) {
                                return v.toFixed(1)
                            }
                        },
                        line: {
                            show: false
                        },
                        tick: {
                            show: false
                        }
                    },
                    {
                        position: 'right',
                        type: 'linear',
                        $gridIndex: 1,
                        xOrY: 'y',
                        domainScale: 1.8,
                        splitNumber: 3,
                        label: {
                            padding: 4,
                            inRange: true,
                            style: {
                                fill: color.eqAxis
                            },
                            formatter: function (v) {
                                return v.toFixed(1)
                            }
                        },
                        line: {
                            show: false
                        },
                        tick: {
                            show: false
                        }
                    }
                ],
                markLine: [{
                    $axisIndex: [0, 2],
                    $seriesIndex: 1,
                    data: [{
                            points: [{
                                    x: 'left',
                                    yValue: 6
                                },
                                {
                                    x: 'right',
                                    yValue: 6
                                },
                            ],
                            lineStyle: {
                                normal: {
                                    show: true,
                                    stroke: 'rgb(204,0,204)',
                                    lineDash: [4, 3]
                                }
                            }
                        },
                        {
                            points: [{
                                    x: 'left',
                                    yValue: 3
                                },
                                {
                                    x: 'right',
                                    yValue: 3
                                },
                            ],
                            lineStyle: {
                                normal: {
                                    show: true,
                                    stroke: 'rgb(255,0,0)',
                                }
                            }
                        },
                        {
                            points: [{
                                    x: 'left',
                                    yValue: 1.56
                                },
                                {
                                    x: 'right',
                                    yValue: 1.56
                                },
                            ],
                            lineStyle: {
                                normal: {
                                    show: true,
                                    stroke: 'rgb(255,255,255)',
                                    lineDash: [4, 3]
                                }
                            }
                        }
                    ]
                }, {
                    show: true,
                    $axisIndex: [0, 3],
                    $seriesIndex: 8,
                    data: [{
                        points: [{
                                x: 'left',
                                yValue: 0
                            },
                            {
                                x: 'right',
                                yValue: 0
                            },
                        ],
                        lineStyle: {
                            normal: {
                                show: true,
                                stroke: 'rgb(0,204,204)',
                                lineWidth: 1.5
                            }
                        }
                    }]
                }],
                grid: [{
                        left: 0,
                        top: 0,
                        right: 50,
                        bottom: '50%',
                        background: {
                            show: true,
                            borderEnable: [1, 1, 1, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        },
                        topPlaceHolder: {
                            show: true,
                            borderEnable: [0, 1, 0, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        }
                    },
                    {
                        left: 0,
                        top: '50%',
                        right: 50,
                        bottom: '25%',
                        background: {
                            show: true,
                            borderEnable: [1, 1, 0, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        },
                        topPlaceHolder: {
                            show: true,
                            borderEnable: [0, 1, 0, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        },
                    },
                    {
                        left: 0,
                        top: '75%',
                        right: 50,
                        bottom: 0,
                        background: {
                            show: true,
                            borderEnable: [1, 1, 0, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        },
                        bottomPlaceHolder: {
                            show: true,
                            borderEnable: [1, 1, 0, 0],
                            style: {
                                stroke: color.axisLine,
                            }
                        }
                    }
                ],
                axisPointer: [{
                        $axisIndex: [1, 2, 3],
                        line: {
                            style: {
                                stroke: color.hoverLine,
                                lineDash: [2, 3],
                                lineWidth: 1
                            }
                        },
                        label: {
                            gap: 0,
                            style: {
                                fill: 'white',
                                textBorderRadius: 0,
                                textBackgroundColor: '#555'
                            },
                        }
                    },
                    {
                        $axisIndex: 0,
                        line: {
                            style: {
                                stroke: color.hoverLine,
                                lineDash: [2, 3],
                                lineWidth: 1
                            }
                        },
                        label: {
                            gap: 0,
                            style: {
                                fill: 'white',
                                textBorderRadius: 0,
                                textBackgroundColor: '#555'
                            },
                        }
                    }
                ],
                tooltip: [{
                        trigger: 'axis',
                        $axisIndex: 0,
                        position: [0, 0],
                        alwaysShowContent: true,
                        formatter: function (d) {
                            return klinePrice_tooltip(kData[d.series[0].dataIndex], {
                                needConvertoShou: needConvertoShou,
                                keepLen: keepLen
                            }, function (d) {
                                var tpl = d.tpl;
                                var maTpl = d.maTpl;
                                var result = d.result;
                                var data = d.data;
                                return (tpl + maTpl).replace(/<%([^%>]+)?%>/g, function (s0,
                                    s1) {
                                    if (s1 === 'status' ||
                                        s1 === 'openPStatus' ||
                                        s1 === 'maxPStatus' ||
                                        s1 === 'minPStatus') {
                                        return color[result[s1] + 'Axis'];
                                    } else if (/^(ma[{0-9}]+Status)$/.test(s1)) {
                                        return color[s1.slice(0, -6)];
                                    } else if (/^(ma[{0-9}]+)$/.test(s1)) {
                                        return parseFloat(data[s1]).toFixed(
                                            keepLen);
                                    } else {
                                        return result[s1];
                                    }
                                })
                            })
                        },
                        // 浮窗的css样式
                        style: {
                            position: 'absolute',
                            zIndex: 99999,
                            backgroundColor: undefined,
                            borderRadius: '0px',
                            padding: '2px',
                            color: '#999',
                            fontSize: '12px',
                            display: 'none',
                        }
                    },
                    {
                        trigger: 'axis',
                        $axisIndex: 0,
                        alwaysShowContent: true,
                        position: function (d) {
                            var gridModel = s.chart.getModel('grid', 2);
                            return {
                                x: gridModel.position.left,
                                y: gridModel.position.top
                            }
                        },
                        formatter: function (d) {
                            let v
                            try {
                                v = s.barData[d.series[0].dataIndex].n.toFixed(2)
                            } catch (error) {
                                console.log(error,s.barData,d.series[0].dataIndex)
                            }
                            let jtColor = 'rgb(255,255,255)'
                            let jt = ''
                            if (v >= 1.56) {
                                jtColor = 'rgb(255,0,0)'
                                jt = '↑'
                            } else {
                                jtColor = 'rgb(0,204,204)'
                                jt = '↓'
                            }
                            return `
                                <span style="color: rgb(255,255,255)">AI机构活跃度 生命线:+1.56</span>
                                <span style="color: rgb(255,0,0)">强势线:+3.00</span>
                                <span style="color: rgb(204,0,204)">大牛线:+6.00</span>
                                <span style="color: rgb(0,204,204)">机构活跃度:${v}</span>
                                <span style="color: ${jtColor}">${jt}</span>
                            `
                        },
                        // 浮窗的css样式
                        style: {
                            position: 'absolute',
                            zIndex: 99999,
                            backgroundColor: undefined,
                            borderRadius: '0px',
                            padding: '2px',
                            color: '#999',
                            fontSize: '12px',
                            display: 'none',
                        }
                    },
                    {
                        trigger: 'axis',
                        $axisIndex: 0,
                        alwaysShowContent: true,
                        position: function (d) {
                            var gridModel = s.chart.getModel('grid', 1);
                            return {
                                x: gridModel.position.left,
                                y: gridModel.position.top
                            }
                        },
                        formatter: function (d) {
                            var zhuli = s.lineData[d.series[0].dataIndex].n.toFixed(2)
                            var sanhu = s.lineData[d.series[0].dataIndex].m.toFixed(2)
                            let jt1 = ''
                            let jt2 = ''
                            if(d.series[0].dataIndex != 0){
                                if(s.lineData[d.series[0].dataIndex].m >= s.lineData[d.series[0].dataIndex - 1].m){
                                    jt1 = '↑'
                                }else{
                                    jt1 = '↓'
                                }

                                if(s.lineData[d.series[0].dataIndex].n >= s.lineData[d.series[0].dataIndex - 1].n){
                                    jt2 = '↑'
                                }else{
                                    jt2 = '↓'
                                }
                            }
                            return `
                                <span style="color: rgb(0,102,255)">主力雷达</span>
                                <span style="color: rgb(0,204,204)">主力:${zhuli} ${jt2}</span>
                                <span style="color: rgb(255,0,0)">散户:${sanhu} ${jt1}</span>
                            `
                        },
                        // 浮窗的css样式
                        style: {
                            position: 'absolute',
                            zIndex: 99999,
                            backgroundColor: undefined,
                            borderRadius: '0px',
                            padding: '2px',
                            color: '#999',
                            fontSize: '12px',
                            display: 'none',
                        }
                    }
                ],
                series: [{
                        type: 'hqbar',
                        name: '价格',
                        hqbarType: 'kline',
                        $axisIndex: [0, 1],
                        $dataIndex: 0,
                    },
                    {
                        type: 'bar',
                        stack: '活跃度',
                        $axisIndex: [0, 2],
                        $dataIndex: 1,
                        dataKey: 'n',
                        itemStyle: {
                            normal: function (d) {
                                let sty = {}
                                let idx = d[0]
                                let val = d[1]
                                if (val === 3) {
                                    sty = {
                                        fill: 'rgb(255,0,0)',
                                        stroke: 'rgb(255,0,0)',
                                        lineWidth: 1
                                    }
                                } else {
                                    // 活跃度小于3大于等于1.56
                                    if (val >= 1.56 && val < 3) {
                                        // 收盘价大于等于开盘价
                                        if (s.barData[idx].f === 1) {
                                            sty = {
                                                fill: 'rgb(0,0,0)',
                                                stroke: 'rgb(255,0,0)',
                                                lineWidth: 1
                                            }
                                        }
                                        // 收盘价小于开盘价
                                        else {
                                            sty = {
                                                fill: 'rgb(0,0,0)',
                                                stroke: 'rgb(0,204,102)',
                                                lineWidth: 1
                                            }
                                        }
                                    }
                                    // 活跃度小于1.56
                                    else {
                                        // 收盘价大于等于开盘价
                                        if (s.barData[idx].f === 1) {
                                            sty = {
                                                fill: 'rgb(0,0,0)',
                                                stroke: 'rgb(255,255,255)',
                                                lineWidth: 1
                                            }
                                        }
                                        // 收盘价小于开盘价
                                        else {
                                            sty = {
                                                fill: 'rgb(0,204,102)',
                                                stroke: 'rgb(0,204,102)',
                                                lineWidth: 1
                                            }
                                        }
                                    }
                                }

                                return sty
                            }
                        },
                    },
                    {
                        type: 'bar',
                        stack: '活跃度',
                        $axisIndex: [0, 2],
                        $dataIndex: 1,
                        dataKey: 'm',
                        itemStyle: {
                            normal: function (d) {
                                let sty = {}
                                let val = d[1]
                                if (val === 0) {
                                    sty = {
                                        fill: 'rgb(204,0,204)',
                                    }
                                } else {
                                    sty = {
                                        fill: 'rgb(204,0,204)',
                                        stroke: 'rgb(204,0,204)',
                                        lineWidth: 1
                                    }
                                }
                                return sty
                            }
                        },
                    },
                    {
                        type: 'line',
                        $dataIndex: 1,
                        $axisIndex: [0, 2],
                        dataKey: 'z',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: 'rgb(0,204,204)',
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        aliasType: 'hqline',
                        $dataIndex: 0,
                        dataKey: 'ma5',
                        name: 'ma5',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: color.ma5,
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        aliasType: 'hqline',
                        $dataIndex: 0,
                        dataKey: 'ma10',
                        name: 'ma10',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: color.ma10,
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        aliasType: 'hqline',
                        $dataIndex: 0,
                        dataKey: 'ma20',
                        name: 'ma20',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: color.ma20,
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        aliasType: 'hqline',
                        $dataIndex: 0,
                        dataKey: 'ma60',
                        name: 'ma60',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: color.ma60,
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        // name: '主力',
                        $dataIndex: 2,
                        $axisIndex: [0, 3],
                        dataKey: 'n',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: 'rgb(0,204,204)',
                                    lineWidth: 1
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        // name: '散户',
                        $dataIndex: 2,
                        $axisIndex: [0, 3],
                        dataKey: 'm',
                        line: {
                            show: true,
                            style: {
                                normal: {
                                    stroke: 'rgb(255,0,0)',
                                    lineWidth: 1
                                }
                            }
                        }
                    }
                ],
                markPoint: [{
                    $axisIndex: [0, 1],
                    $seriesIndex: 0,
                    symbol: {
                      type:
                        "path://M65,63.6L24.7,14.7l6.2-4.2c0.7-0.5,0.5-1.5-0.3-1.7L2.3,1.2C1.6,1.1,1,1.7,1.2,2.4l7.6,28.3  c0.2,0.8,1.2,1,1.7,0.3l4-6.1l48.9,40.3C64.5,66.1,66,64.6,65,63.6z",
                      size: [20, 20],
                      offset: [10, 10],
                      style: {
                        // 标记样式
                        normal: {
                          fill: "red"
                        }
                      }
                    },
                    data: [
                      {
                        xIndex: idx,
                        yValue: kData[idx]["i"]
                      }
                    ]
                  },{
                    $axisIndex: [0, 3],
                    $seriesIndex: 9,
                    enableSelect: false,
                    data:s.markPointData,
                    // data: [{
                    //     symbol: {
                    //         type: 'none',
                    //     },
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             style: {
                    //                 fill: 'rgb(204,0,204)'
                    //             },
                    //             formatter: (d) => {
                    //                 return '升'
                    //             }
                    //         },
                    //     },
                    //     xValue: '20190710'
                    // }, {
                    //     symbol: {
                    //         type: 'none',
                    //     },
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             style: {
                    //                 fill: 'rgb(204,0,204)'
                    //             },
                    //             formatter: (d) => {
                    //                 return '底'
                    //             }
                    //         },
                    //     },
                    //     type: 'min'
                    // }]
                }],
                animation: false,
                data: [{
                        originData: kData
                    },
                    {
                        originData: s.barData
                    },
                    {
                        originData: s.lineData
                    },
                ],
            };

            s.chart.setOption(option);

            // 鼠标离开时，触发最后一个点信息作tooltip
            var axisModel = s.chart.getModel('axis', 0);
            s.chart.registerAction(axisModel, 'AXIS_OUT', function (d) {
                if (d.lastData) {
                    var tooltipModels = s.chart.getModel('tooltip');

                    for (var i = 0; i < tooltipModels.length; i++) {
                        var tooltipView = s.chart.getViewOfComponentModel(tooltipModels[i]);

                        tooltipView.showTooltip(tooltipModels[i], d.lastData);
                    }

                }
            })
        });
  },
  },
  mounted() {
    const s = this
    this.chart = D3Charts.init("KlinePopchart");
    // this.starChart()
    this.getZhibiao()
  }
};
</script>
<style scoped>

    .title{
        height: 48px;
        text-align: left;
        padding: 4px 0 0 0px;
        border: 1px solid #2e2e2e;
        border-bottom: 0px;
        background:rgba(25, 25, 27, 1)
    }

    .title-content1{
        border-bottom: 1px solid #2e2e2e;
    }

    .title-content1,
    .title-content2 {
        padding-left: 17px;
        line-height:23px;
    }

    .title-name{
        color: #f9f9f9;
        font-size: 14px;
    }

    .title-stock{
        margin-left: 11px;
        color: #e5e5e5;
        font-size: 14px;
    }

</style>
