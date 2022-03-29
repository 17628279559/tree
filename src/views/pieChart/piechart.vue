<script setup>
import { ref, onMounted } from 'vue';
import Axios from 'axios';
import pie from './pie.js'


window.arc = {};
window.selectArc = {};
const svgRef1 = ref(null);
const svgRef2 = ref(null);
const svgRef3 = ref(null);
const svgRef4 = ref(null);
const getdataApi = "/api/getcovie"

let get_random_data = limit => {
  let data = [];
  let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < limit; i++) {
    data.push({
      index: i,
      name: `test${i + 1}`,
      value: getRandomInt(0, 500)
    });
  }
  return data;
}

let data;

const get_confirm = (data,field) => {
  let i = 0;
  let tmpdata = data.map(item => {
    return { index: 0, name: item['name'], value: item[field] }
  })
  tmpdata.sort((a,b)=> b.value - a.value )
  return tmpdata.map(item=>{ 
      return { index: i++, name: item['name'], value: item['value'] }
  })
}



const pie1 = {
  group_data: 0,
  radius_inner: 0,
}

const pie2 = {
  group_data: 0.2,
  radius_inner: 150
}
const pie3 = {
  group_data: 0,
  radius_inner: 0,
  useConstcolor: true
}
const pie4 = {
  group_data: 0,
  radius_inner: 190
}

onMounted(() => {
  Axios.get(getdataApi).then(response => {
    data = response.data;
    pie(1, svgRef1, get_confirm(data,'today_confirm'), pie1,"各省今日新增");
    pie(2, svgRef2, get_confirm(data,'total_confirm'), pie2,"各省总数据");
    pie(3, svgRef3, get_random_data(48), pie3,"随机渐变");
    pie(4, svgRef4, get_random_data(17), pie4,"随机圆环");
  });
});




</script>

<template>
  <div id="all">
    <svg class="center"
         width=1000
         height=550
         ref="svgRef1">
    </svg>
    <svg class="center"
         width=1000
         height=550
         ref="svgRef2">
    </svg>
    <svg class="center"
         width=1000
         height=550
         ref="svgRef3">
    </svg>
    <svg class="center"
         width=1000
         height=550
         ref="svgRef4">
    </svg>
  </div>

</template>

<style scoped>
#all {
  width: 100%;
  height: 100%;
}
.center {
  display: block;
  background: #f5f5f5;
  margin: 10px;
  float: left;
}
</style>
