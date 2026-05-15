import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, D3Node } from '../types';

interface D3FlowChartProps {
  data: GraphData;
  onNodeClick: (node: D3Node) => void;
}

const D3FlowChart: React.FC<D3FlowChartProps> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current || data.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width || 600;
    const height = svg.node()?.getBoundingClientRect().height || 400;

    svg.selectAll("*").remove(); // Clear previous render

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    
    const g = svg.append("g");

    const simulation = d3.forceSimulation<any>(data.nodes as any)
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#4f46e5")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1.5);

    const nodeGroup = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", "node-group")
      .style("cursor", "pointer")
      .on("click", (event, d) => onNodeClick(d as D3Node))
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    nodeGroup.append("circle")
      .attr("r", 8)
      .attr("fill", "#6366f1")
      .attr("stroke", "rgba(255,255,255,0.1)")
      .attr("stroke-width", 2)
      // Added hover effects to nodes as requested by the user
      .on("mouseover", function() { d3.select(this).attr("fill", "#10b981").attr("r", 10).attr("stroke", "#34d399"); })
      .on("mouseout", function() { d3.select(this).attr("fill", "#6366f1").attr("r", 8).attr("stroke", "rgba(255,255,255,0.1)"); });

    nodeGroup.append("text")
      .text((d) => d.label)
      .attr("x", 12)
      .attr("y", 4)
      .attr("font-size", "10px")
      .attr("fill", "#cbd5e1")
      .attr("font-family", "monospace");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, onNodeClick]);

  return (
    <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '100%' }} />
  );
};

export default D3FlowChart;
