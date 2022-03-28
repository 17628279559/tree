<script setup>
import { ref, onMounted } from 'vue';
// import Axios from 'axios';
import { pie } from './pie'

window.arc = {};
window.selectArc ={};
const svgRef1 = ref(null);
const svgRef2 = ref(null);
const svgRef3 = ref(null);
const svgRef4 = ref(null);

let get_random_data	= limit=>{
	let data = [];		
    let getRandomInt = (min, max)=> Math.floor(Math.random() * (max - min + 1)) + min;
	for(let i = 0; i < limit; i++)
	{
		data.push({
			index: i,
			name: `test${i+1}`,
			value: getRandomInt(0,500)
		});
	}
	return data;
}

let fakedata= [{'name': '香港', 'today_confirm': 686, 'total_confirm': 284081}, {'name': '湖北', 'today_confirm': 0, 'total_confirm': 68391}, {'name': '吉林', 'today_confirm': 1090, 'total_confirm': 25518}, {'name': '台湾', 'today_confirm': 330, 'total_confirm': 22896}, {'name': '广东', 'today_confirm': 10, 'total_confirm': 6546}, {'name': '上海', 'today_confirm': 60, 'total_confirm': 5293}, {'name': '陕西', 'today_confirm': 4, 'total_confirm': 3218}, {'name': '河南', 'today_confirm': 10, 'total_confirm': 2785}, {'name': 
'福建', 'today_confirm': 12, 'total_confirm': 2746}, {'name': '浙江', 'today_confirm': 7, 'total_confirm': 2660}, {'name': '山东', 'today_confirm': 8, 'total_confirm': 2556}, {'name': '黑龙江', 'today_confirm': 11, 'total_confirm': 2363}, {'name': '云南', 'today_confirm': 1, 'total_confirm': 2058}, {'name': '江苏', 'today_confirm': 3, 'total_confirm': 2002}, {'name': '河北', 'today_confirm': 7, 'total_confirm': 1935}, {'name': '天津', 'today_confirm': 8, 'total_confirm': 1773}, {'name': '北京', 'today_confirm': 2, 'total_confirm': 1759}, {'name': '内蒙古', 'today_confirm': 0, 'total_confirm': 1681}, {'name': '四川', 'today_confirm': 12, 'total_confirm': 1660}, {'name': '辽宁', 'today_confirm': 12, 'total_confirm': 1556}, {'name': '广西', 'today_confirm': 15, 'total_confirm': 1447}, {'name': '湖南', 'today_confirm': 3, 'total_confirm': 1319}, {'name': '江西', 'today_confirm': 1, 'total_confirm': 1033}, {'name': '安徽', 'today_confirm': 3, 'total_confirm': 1031}, {'name': '新疆', 'today_confirm': 0, 'total_confirm': 996}, {'name': '重庆', 'today_confirm': 0, 'total_confirm': 688}, {'name': '甘肃', 'today_confirm': 1, 'total_confirm': 681}, {'name': '山西', 'today_confirm': 0, 'total_confirm': 303}, {'name': '海南', 'today_confirm': 0, 'total_confirm': 193}, {'name': '贵州', 'today_confirm': 0, 'total_confirm': 172}, {'name': '宁夏', 'today_confirm': 0, 'total_confirm': 122}, {'name': '澳门', 'today_confirm': 0, 'total_confirm': 82}, {'name': '青海', 'today_confirm': 0, 'total_confirm': 32}, {'name': '西藏', 'today_confirm': 0, 'total_confirm': 1}]

const get_today_confirm = data =>{
    let i = 0;
    return data.map(item=>{ 
        return {index:i++,name:item['name'],value:item['today_confirm']}
    })
}

const get_total_confirm = data =>{
    let i = 0;
    return data.map(item=>{ 
        return {index:i++,name:item['name'],value:item['total_confirm']}
    })
}



const pie1={
    group_data:1,
    radius_inner:0
}

const pie2={
    group_data:1,
    radius_inner:150,
    useConstcolor:true
}

onMounted(() => {
    pie(1,svgRef1,get_today_confirm(fakedata), pie1);
    pie(2,svgRef2,get_total_confirm(fakedata), pie2);
    pie(3,svgRef3,get_random_data(34), pie1);
    pie(4,svgRef4,get_random_data(17), pie2);
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
#all{
    width:100%;
    height: 100%;
}
.center{    
    display: block;
    background: #f5f5f5;
    margin: 50px;
    float: left;
}
</style>
