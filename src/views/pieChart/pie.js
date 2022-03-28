import * as d3 from 'd3';


const constcolor = ["#FF3333", "#FF0000", "#FF44AA", "#FF0088", "#FFFF33", "#FFFF00", "#CCFF33", "#BBFF00", "#99FF33", "#77FF00", "#33FF33", "#00FF00", "#33FFAA", "#00FF99", "#33FFDD", "#00FFCC", "#33FFFF", "#00FFFF", "#33CCFF", "#00BBFF", "#5599FF", "#0066FF", "#5555FF", "#0000FF", "#7744FF", "#5500FF", "#9955FF", "#7700FF", "#B94FFF", "#9900FF", "#E93EFF", "#CC00FF", "#FF3EFF", "#FF00FF"]

let pie = (id, svgRef, data, options) => {
    let svg = d3.select(svgRef.value);
    const chart_width = 600,
        chart_height = 600,
        PI = 3.1415926;


    let chart_size = d3.min([chart_width, chart_height]),
        colorScale = d3.scaleLinear().domain([0, data.length / 3, data.length * 2 / 3, data.length]).range(['#4158D0', '#C850C0', '#FFCC70', "#FF0000"]),
        donut, piee, parameter,
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

    const getPercentage = i => {
        (settings.getvalue(data[i]) / data_size) * 100
    };

    // 合并data中占比小于group_data的元素
    const group_data = data => {
        let removed_data_size = 0;

        for (let i = data.length - 1; i >= 0; i--)
            if (getPercentage(i) < settings.group_data)
                removed_data_size += settings.getvalue(data.splice(i, 1)[0]);

        if (removed_data_size > 0)
            data.push({ index: 0, name: 'Other', value: removed_data_size });
        return data;
    };
    if (settings.group_data != 0)
        data = group_data(data);


    let nowAngle = 0
    for (let i = 0; i < data.length; i++) {
        data[i]['lableAngle'] = nowAngle + ((settings.getvalue(data[i]) / data_size) * 100 / 100) * PI;
        nowAngle += ((settings.getvalue(data[i]) / data_size) * 100 / 100) * PI * 2;
    }
    // 更新settings
    for (parameter in options)
        settings[parameter] = options[parameter];

    donut = svg
        .append('g')
        .attr('class', 'donut')
        .attr('transform', `translate(${chart_size / 2},${chart_size / 2})`);

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
        .attr('id', item => `_${id}_path${item.index}`)
        .style('fill', (item, index) => {
            if (!settings.useConstcolor)
                return constcolor[item.index];
            else return settings.color(item.data, index);
        })
        .attr('d', window.arc[`arc${id}`])
        .on('mouseover', (item, index) => {
            d3.select(`#_${id}_path${index.index}`)
                .transition()
                .duration(50)
                .attr('fill-opacity', 0.5)
                .attr('d', window.selectArc[`arc${id}`]);
            d3.select(`#_${id}_text${index.index}`)
                .transition()
                .duration(50)
                .text(index.data.value)
                .attr('transform', `translate(${Math.sin(index.data.lableAngle) * (settings.radius_label + 20)},${-(Math.cos(index.data.lableAngle) * (settings.radius_label + 20))})`)
        })
        .on('mouseout', (item, index) => {
            d3.select(`#_${id}_path${index.index}`)
                .transition()
                .duration(200)
                .attr('fill-opacity', 1)
                .attr('d', window.arc[`arc${id}`]);
            d3.select(`#_${id}_text${index.index}`)
                .transition()
                .duration(50)
                .text(index.data.name)
                .attr('transform', item => `translate(${Math.sin(item.lableAngle) * settings.radius_label},${-(Math.cos(item.lableAngle) * settings.radius_label) + 8})`)
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


    return svg;
};

export { pie };