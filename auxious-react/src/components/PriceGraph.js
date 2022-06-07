import * as d3 from 'd3';

import { getMaxAndMinValue } from '../utils';

export default function PriceGraph(data) {
  const width = 400;
  const height = 400;
  const barHeight = (height - 100) / data.length;
  const [min, max] = getMaxAndMinValue(data);

  const scale = d3.scaleLinear().domain([min, max]).range([50, 300]);

  const graph = d3
    .select('svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const bar = graph
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', (data, i) => {
      return 'translate(0,' + i * (300 / data.length) + ')';
    });

  bar
    .append('rect')
    .transition()
    .duration(1000)
    .attr('style', 'fill: skyblue;')
    .attr('width', (data) => {
      return scale(data.value);
    })
    .attr('height', barHeight - 1)
    .attr('transform', 'translate(50, 0)');

  bar
    .append('text')
    .attr('x', (data) => {
      return scale(data.value) + 55;
    })
    .attr('y', barHeight / 2)
    .attr('dy', '.35em')
    .text((data) => {
      return data.value;
    });

  bar
    .append('text')
    .attr('style', 'color: white;')
    .attr('y', barHeight / 2)
    .attr('dy', '.35em')
    .text((data) => {
      return data.name;
    });

  return <div id='graph'></div>;
}
