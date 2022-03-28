<script setup>
import { ref, onMounted } from 'vue';
import Axios from 'axios';
import { pie } from './pie'

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

const get_today_confirm = data => {
  let i = 0;
  return data.map(item => {
    return { index: i++, name: item['name'], value: item['today_confirm'] }
  })
}

const get_total_confirm = data => {
  let i = 0;
  return data.map(item => {
    return { index: i++, name: item['name'], value: item['total_confirm'] }
  })
}



const pie1 = {
  group_data: 1,
  radius_inner: 0
}

const pie2 = {
  group_data: 1,
  radius_inner: 150,
  useConstcolor: true
}

onMounted(() => {
  Axios.get(getdataApi).then(response => {
    console.log(response.data);
    data = response.data;
    pie(1, svgRef1, get_today_confirm(data), pie1);
    pie(2, svgRef2, get_total_confirm(data), pie2);
    pie(3, svgRef3, get_random_data(34), pie1);
    pie(4, svgRef4, get_random_data(17), pie2);
  })

});




</script>

<template>
  <div id="all">
    <svg class="center"
         width=600
         height=600
         ref="svgRef1">
    </svg>
    <svg class="center"
         width=600
         height=600
         ref="svgRef2">
    </svg>
    <svg class="center"
         width=600
         height=600
         ref="svgRef3">
    </svg>
    <svg class="center"
         width=600
         height=600
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
  margin: 50px;
  float: left;
}
</style>
