import * as d3 from 'd3';

import { useRef, useEffect } from 'react';
import { getMinMaxData } from '../utils/graph';

export default function PriceGraph(data) {
  const svgRef = useRef(null);
  const color = [];

  useEffect(() => {
    const width = '100vw';
    const height = 150;
    const barHeight = (height - 20) / 3;
    const [min, max] = getMinMaxData(data);
    const scale = d3.scaleLinear().domain([min, max]).range([50, 210]);

    if (data.data == []) return;
    if (!data.data) return;

    for (let i = 0; i < data.data.length; i++) {
      if (parseInt(data.data[i].value) === max) {
        color.push('#1363DF');
      } else if (parseInt(data.data[i].value) === min) {
        color.push('#7FB5FF');
      } else {
        color.push('#DFF6FF');
      }
    }

    const graph = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', '350px')
      .attr('height', '30vh');

    const bar = graph
      .selectAll('g')
      .join('g')
      .data(data.data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(50, ${i * (height / 3)})`;
      });

    bar
      .append('rect')
      .join('rect')
      .transition()
      .duration(100)
      .attr('style', (d, i) => {
        return `fill: ${color[i]};`;
      })
      .attr('width', (d) => {
        if (isNaN(d.value)) return;
        return scale(parseInt(d.value));
      })
      .attr('height', barHeight - 10)
      .attr('margin', '20')
      .attr('transform', 'translate(10, 5)');

    bar
      .append('text')
      .attr('x', (d) => {
        if (isNaN(d.value)) return;
        return scale(parseInt(d.value)) + 15;
      })
      .attr('y', barHeight / 2)
      .attr('z-index', '100')
      .text((data) => {
        if (isNaN(data.value)) return;
        return parseInt(data.value) / 100 + '억원';
      });

    bar
      .append('text')
      .attr('style', 'color: white;')
      .attr('y', barHeight / 2)
      .attr('x', -50)
      .attr('dy', '.35em')
      .text((d) => {
        if (isNaN(d.value)) return;
        return d.name;
      });

    return () => {
      bar.remove();
    };
  }, [data]);

  return <svg id='graph' width={'350px'} ref={svgRef}></svg>;
}
