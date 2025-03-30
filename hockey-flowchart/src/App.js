import React, { useState, useCallback } from 'react';
import ReactFlow, { Controls, MiniMap, Background, Handle } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Hockey Skills' }, type: 'default', parent: null },
];

const initialEdges = [];

const nodeHierarchy = {
  '1': ['skating', 'shooting', 'stickhandling'],
  skating: ['fundamentals_skating', 'metrics_skating', 'conditioning_skating'],
  fundamentals_skating: ['stride', 'crossovers', 'starts', 'stops', 'turns', 'transitions', 'edge_control', 'stride_efficiency'],
  stride: ['forward_stride', 'backward_stride'],
  crossovers: ['stride_push', 'windup', 'release', 'follow_through', 'return', 'x_push'],
  starts: ['forward_starts'],
  turns: ['mohawks'],
  transitions: ['forward_backward', 'backward_forward'],
  edge_control: ['inside_edges', 'outside_edges'],
  metrics_skating: ['output', 'technique'],
  output: ['speed', 'explosiveness', 'acceleration', 'stride_rate', 'power', 'efficiency', 'agility', 'symmetry'],
  technique: ['stride_length', 'stride_width'],
  conditioning_skating: ['leg_strength', 'core_strength', 'balance'],

  shooting: ['fundamentals_shooting', 'metrics_shooting', 'conditioning_shooting'],
  fundamentals_shooting: ['wrist_shot', 'snap_shot', 'slap_shot', 'backhand_shot'],
  metrics_shooting: ['shot_speed', 'shot_power', 'release_time', 'spin', 'contact_time', 'accuracy'],

  stickhandling: ['fundamentals_stickhandling', 'metrics_stickhandling', 'conditioning_stickhandling'],
  metrics_stickhandling: ['spin_stickhandling', 'rate_stickhandling'],
};

const labels = {
  skating: 'Skating',
  shooting: 'Shooting',
  stickhandling: 'Stickhandling',
  fundamentals_skating: 'Fundamentals',
  stride: 'Stride',
  crossovers: 'Crossovers (Forward & Backward)',
  starts: 'Starts',
  forward_starts: 'Forward Starts',
  stops: 'Stops',
  turns: 'Turns',
  transitions: 'Transitions & Pivots',
  edge_control: 'Edge Control',
  stride_efficiency: 'Stride Efficiency',
  forward_stride: 'Forward Stride',
  backward_stride: 'Backward Stride',
  stride_push: 'Stride Push',
  windup: 'Windup',
  release: 'Release',
  follow_through: 'Follow-Through',
  return: 'Return',
  x_push: 'X-Push & Repeat',
  mohawks: 'Mohawks',
  forward_backward: 'Forward-to-Backward',
  backward_forward: 'Backward-to-Forward',
  inside_edges: 'Inside Edges',
  outside_edges: 'Outside Edges',

  output: 'Output',
  technique: 'Technique',
  speed: 'Speed',
  explosiveness: 'Explosiveness',
  acceleration: 'Acceleration',
  stride_rate: 'Stride Rate Turnover',
  power: 'Power',
  efficiency: 'Efficiency',
  agility: 'Agility',
  symmetry: 'Symmetry',
  stride_length: 'Stride Length',
  stride_width: 'Stride Width',

  leg_strength: 'Leg Strength',
  core_strength: 'Core Strength',
  balance: 'Balance',

  fundamentals_shooting: 'Fundamentals',
  wrist_shot: 'Wrist Shot',
  snap_shot: 'Snap Shot',
  slap_shot: 'Slap Shot',
  backhand_shot: 'Backhand Shot',
  shot_speed: 'Speed',
  shot_power: 'Power',
  release_time: 'Release Time',
  spin: 'Spin',
  contact_time: 'Contact Time',
  accuracy: 'Accuracy',

  fundamentals_stickhandling: 'Fundamentals',
  metrics_stickhandling: 'Attributes / Metrics',
  spin_stickhandling: 'Spin',
  rate_stickhandling: 'Rate',
  conditioning_skating: 'Strength and Conditioning',
  conditioning_shooting: 'Strength and Conditioning',
  conditioning_stickhandling: 'Strength and Conditioning',
};

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const toggleNode = useCallback((event, node) => {
    event.preventDefault();

    const children = nodeHierarchy[node.id];

    if (!children) return;

    setNodes((nds) => {
      const expanded = nds.some((n) => n.parent === node.id);

      if (expanded) {
        return nds.filter((n) => n.parent !== node.id);
      }

      const newNodes = children.map((childId, idx) => ({
        id: childId,
        data: { label: labels[childId] || childId },
        position: { x: node.position.x + 200, y: node.position.y + idx * 60 },
        parent: node.id,
      }));

      return [...nds, ...newNodes];
    });

    setEdges((eds) => {
      const expanded = eds.some((e) => e.source === node.id);

      if (expanded) return eds.filter((e) => e.source !== node.id);

      const newEdges = children.map((childId) => ({
        id: `${node.id}-${childId}`,
        source: node.id,
        target: childId,
      }));

      return [...eds, ...newEdges];
    });
  }, []);

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={toggleNode}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
