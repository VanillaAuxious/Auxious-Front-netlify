import * as d3 from 'd3';

import { useRef, useEffect } from 'react';
import { getMinMaxData } from '../utils/graph';

export default function PriceGraph(data) {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 360;
    const height = 150;
    const barHeight = (height - 20) / 3;
    const [min, max] = getMinMaxData(data);
    const scale = d3.scaleLinear().domain([min, max]).range([50, 300]);

    const graph = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    var bar = graph
      .selectAll('g')
      .join('g')
      .data(data.data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(10, ${i * (height / 3)})`;
      });

    bar
      .append('rect')
      .join('rect')
      .transition()
      .duration(100)
      .attr('style', 'fill: skyblue;')
      .attr('width', (d) => {
        if (isNaN(d.value)) return;
        return scale(parseInt(d.value));
      })
      .attr('height', barHeight - 10)
      .attr('margin', '20')
      .attr('transform', 'translate(10, 0)');

    bar
      .append('text')
      .attr('x', (d) => {
        if (isNaN(d.value)) return;
        return scale(parseInt(d.value)) + 15;
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text((data) => {
        if (isNaN(data.value)) return;
        return parseInt(data.value);
      });

    bar
      .append('text')
      .attr('style', 'color: white;')
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text((d) => {
        if (isNaN(d.value)) return;
        return d.name;
      });

    return () => {
      bar.remove();
    };
  }, [data]);

  return (
    <svg
      style={{ width: '100%', height: '100%' }}
      id='graph'
      ref={svgRef}></svg>
  );
}
