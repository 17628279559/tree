import * as d3 from 'd3';
let constcolor = ["#FFFF33", "#FFFF00", "#CCFF33", "#BBFF00", "#99FF33", "#77FF00", "#FF3333", "#FF0000", "#FF44AA", "#FF0088", "#33FF33", "#00FF00", "#33FFAA", "#00FF99", "#33FFDD", "#00FFCC", "#33FFFF", "#00FFFF", "#33CCFF", "#00BBFF", "#5599FF", "#0066FF", "#5555FF", "#0000FF", "#7744FF", "#5500FF", "#9955FF", "#7700FF", "#B94FFF", "#9900FF", "#E93EFF", "#CC00FF", "#FF3EFF", "#FF00FF"]

Array.prototype.shuffle = function () {
    let array = this;
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let pie = (id, svgRef, data, options, title) => {
    let svg = d3.select(svgRef.value);
    constcolor.shuffle();
    const chart_width = 550,
        chart_height = 550,
        PI = 3.1415926;


    let chart_size = d3.min([chart_width, chart_height]),
        colorScale = d3.scaleLinear().domain([0, data.length / 3, data.length * 2 / 3, data.length]).range(['#4158D0', '#C850C0', '#FFCC70', "#FF0000"]),
        donut, piee, parameter, yScale, new_g,
        data_size = 0;

    let settings = {
        radius_inner: 0,
        radius_outer: chart_size * (2 / 5),
        radius_label: chart_size * (2 / 5) + 20,
        useConstcolor: false,
        label_margin: 10,
        group_data: 0,
        name: item => item.name,
        getvalue: item => item.value,
        color: (item, index) => colorScale(index)
    };
    data.forEach(e => {
        data_size += settings.getvalue(e)
    });

    // 更新settings
    for (parameter in options)
        settings[parameter] = options[parameter];


    // 合并data中占比小于group_data的元素
    const group_data = data => {
        let removed_data_size = 0;

        for (let i = data.length - 1; i >= 0; i--)
            if ((settings.getvalue(data[i]) / data_size) * 100 < settings.group_data)
                removed_data_size += settings.getvalue(data.splice(i, 1)[0]);

        if (removed_data_size > 0)
            data.push({ index: 35, name: 'Other', value: removed_data_size });
        return data;
    };

    if (settings.group_data > 0)
        data = group_data(data);


    let nowAngle = 0;
    for (let i = 0; i < data.length; i++) {
        data[i]['lableAngle'] = nowAngle + ((settings.getvalue(data[i]) / data_size) * 100 / 100) * PI;
        nowAngle += ((settings.getvalue(data[i]) / data_size) * 100 / 100) * PI * 2;
    }



    donut = svg
        .append('g')
        .attr('class', 'donut')
        .attr('transform', `translate(${chart_size / 2},${chart_size / 2})`);

    new_g = svg
        .append('g')
        .attr('class', 'new_g')
        .attr('transform', `translate(${chart_size},20)`);

    window.arc[`arc${id}`] = d3.arc()
        .innerRadius(settings.radius_inner)
        .outerRadius(settings.radius_outer);

    window.selectArc[`arc${id}`] = d3.arc()
        .innerRadius(settings.radius_inner)
        .outerRadius(settings.radius_outer + 20);

    piee = d3.pie()
        .value(settings.getvalue)
        .sort((a, b) => a.index - b.index)(data);


    donut.selectAll('path')
        .data(piee)
        .enter()
        .append('path')
        .attr('id', item => `_${id}_path${item.data.index}`)
        .style('fill', (item, index) => {
            if (!settings.useConstcolor)
                return constcolor[item.index];
            else return settings.color(item.data, index);
        })
        .attr('d', window.arc[`arc${id}`])
        .on('mouseover', (item, index) => {
            d3.select(`#_${id}_path${index.data.index}`)
                .transition()
                .duration(50)
                .attr('fill-opacity', 0.5)
                .attr('d', window.selectArc[`arc${id}`]);
            d3.select(`#_${id}_text${index.data.index}`)
                .transition()
                .duration(50)
                .text(index.data.value)
                .attr('transform', `translate(${Math.sin(index.data.lableAngle) * (settings.radius_label + 20)},${-(Math.cos(index.data.lableAngle) * (settings.radius_label + 20))})`);
            d3.select(`#_${id}_inter${index.data.index}`)
                .transition()
                .duration(50)
                .attr('fill-opacity', 0.5);
        })
        .on('mouseout', (item, index) => {
            d3.select(`#_${id}_path${index.data.index}`)
                .transition()
                .duration(200)
                .attr('fill-opacity', 1)
                .attr('d', window.arc[`arc${id}`]);
            d3.select(`#_${id}_text${index.data.index}`)
                .transition()
                .duration(50)
                .text(index.data.name)
                .attr('transform', item => `translate(${Math.sin(item.lableAngle) * settings.radius_label},${-(Math.cos(item.lableAngle) * settings.radius_label) + 8})`);
            d3.select(`#_${id}_inter${index.data.index}`)
                .transition()
                .duration(50)
                .attr('fill-opacity', 1);
        });

    donut.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(item => item.name)
        .attr('id', item => `_${id}_text${item.index}`)
        .attr('transform', item => `translate(${Math.sin(item.lableAngle) * settings.radius_label},${-(Math.cos(item.lableAngle) * settings.radius_label) + 8})`)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgb(90,90,90)');

    donut.append('text')
        .text(title)
        .attr('transform', `translate(0,${settings.radius_label + 25})`)
        .attr('font-size', `1.3em`)
        .attr('text-anchor', 'middle');

    yScale = d3.scaleLinear()
        .domain([0, 12])
        .range([0, 510])

    new_g.selectAll('.inter')
        .data(piee)
        .enter()
        .append('rect')
        .attr('class', 'inter')
        .attr('id', item => `_${id}_inter${item.data.index}`)
        .attr('width', 100)
        .attr('height', 510 / 12)
        .attr('transform', item => `translate(${(item.index % 4) * 100},${yScale(Math.floor(item.index / 4))})`)
        .style('fill', '#f5f5f5')
        .on('mouseover', (item, index) => {
            d3.select(`#_${id}_path${index.data.index}`)
                .transition()
                .duration(50)
                .attr('fill-opacity', 0.5)
                .attr('d', window.selectArc[`arc${id}`]);
            d3.select(`#_${id}_text${index.data.index}`)
                .transition()
                .duration(50)
                .text(index.data.value)
                .attr('transform', `translate(${Math.sin(index.data.lableAngle) * (settings.radius_label + 20)},${-(Math.cos(index.data.lableAngle) * (settings.radius_label + 20))})`);
            d3.select(`#_${id}_inter${index.data.index}`)
                .transition()
                .duration(50)
                .style('fill', '#8EC5FC');
        })
        .on('mouseout', (item, index) => {
            d3.select(`#_${id}_path${index.data.index}`)
                .transition()
                .duration(200)
                .attr('fill-opacity', 1)
                .attr('d', window.arc[`arc${id}`]);
            d3.select(`#_${id}_text${index.data.index}`)
                .transition()
                .duration(50)
                .text(index.data.name)
                .attr('transform', item => `translate(${Math.sin(item.lableAngle) * settings.radius_label},${-(Math.cos(item.lableAngle) * settings.radius_label) + 8})`);
            d3.select(`#_${id}_inter${index.data.index}`)
                .transition()
                .duration(50)
                .style('fill', '#f5f5f5');
        });



    new_g.selectAll('.inter_rect')
        .data(piee)
        .enter()
        .append('rect')
        .attr('class', 'inter_rect')
        .attr('width', 22)
        .attr('height', 22)
        .attr('transform', item => `translate(${(item.index % 4) * 100 + 10.25},${yScale(Math.floor(item.index / 4)) + 10.25})`)
        .style('fill', (item, index) => {
            if (!settings.useConstcolor)
                return constcolor[item.index];
            else return settings.color(item.data, index);
        })

    new_g.selectAll('.inter_text')
        .data(piee)
        .enter()
        .append('text')
        .attr('class', 'inter_text')
        .text(item => item.data.name)
        .attr('transform', item => `translate(${(item.index % 4) * 100 + 10.25 + 32},${yScale(Math.floor(item.index / 4)) + 10.25 + 17})`)
        .style('font-size', '1em')


    return svg;
};

export default pie;