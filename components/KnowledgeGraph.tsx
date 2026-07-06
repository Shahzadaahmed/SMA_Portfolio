'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { getGraphData, GraphNode, GraphLink } from '@/data/graphData';

// ─── Force Simulation Hook ───────────────────────────────────────────────────
const useForceSimulation = (nodes: GraphNode[], links: GraphLink[]) => {
  const [simNodes, setSimNodes] = useState<(GraphNode & { x: number; y: number; z: number })[]>([]);

  useEffect(() => {
    // Initial random positions
    const initialNodes = nodes.map(n => ({
      ...n,
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
      z: (Math.random() - 0.5) * 40,
      vx: 0,
      vy: 0,
      vz: 0,
    }));

    // Simple iterative force simulation
    let currentNodes = [...initialNodes];
    for (let i = 0; i < 100; i++) {
      // 1. Repulsion
      for (let a = 0; a < currentNodes.length; a++) {
        for (let b = a + 1; b < currentNodes.length; b++) {
          const dx = currentNodes[a].x - currentNodes[b].x;
          const dy = currentNodes[a].y - currentNodes[b].y;
          const dz = currentNodes[a].z - currentNodes[b].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          const force = 2 / (dist * dist);
          currentNodes[a].vx += (dx / dist) * force;
          currentNodes[a].vy += (dy / dist) * force;
          currentNodes[a].vz += (dz / dist) * force;
          currentNodes[b].vx -= (dx / dist) * force;
          currentNodes[b].vy -= (dy / dist) * force;
          currentNodes[b].vz -= (dz / dist) * force;
        }
      }

      // 2. Attraction (links)
      links.forEach(link => {
        const source = currentNodes.find(n => n.id === link.source);
        const target = currentNodes.find(n => n.id === link.target);
        if (source && target) {
          const dx = source.x - target.x;
          const dy = source.y - target.y;
          const dz = source.z - target.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          const force = (dist - 5) * 0.05;
          source.vx -= (dx / dist) * force;
          source.vy -= (dy / dist) * force;
          source.vz -= (dz / dist) * force;
          target.vx += (dx / dist) * force;
          target.vy += (dy / dist) * force;
          target.vz += (dz / dist) * force;
        }
      });

      // 3. Center gravity
      currentNodes.forEach(n => {
        n.vx -= n.x * 0.01;
        n.vy -= n.y * 0.01;
        n.vz -= n.z * 0.01;
      });

      // 4. Update positions
      currentNodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        n.vx *= 0.9;
        n.vy *= 0.9;
        n.vz *= 0.9;
      });
    }

    setSimNodes(currentNodes);
  }, [nodes, links]);

  return simNodes;
};

// ─── Individual Node Component ───────────────────────────────────────────────
const Node = ({ node, isHovered, onHover }: { node: any; isHovered: boolean; onHover: (id: string | null) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const colors = {
    user: '#0ea5e9',
    category: '#f97316',
    project: '#a855f7',
    tech: '#10b981',
    experience: '#6366f1',
    education: '#f43f5e'
  };

  const color = colors[node.group as keyof typeof colors] || '#94a3b8';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={[node.x, node.y, node.z]}
        onPointerOver={() => onHover(node.id)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[node.val / 15, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : color}
          emissive={color}
          emissiveIntensity={isHovered ? 2 : 0.5}
          transparent
          opacity={0.9}
        />
        <Text
          position={[0, node.val / 10 + 0.5, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {node.label}
        </Text>
      </mesh>
    </Float>
  );
};

// ─── Main Graph Scene ────────────────────────────────────────────────────────
const GraphScene = () => {
  const { nodes, links } = useMemo(() => getGraphData(), []);
  const simNodes = useForceSimulation(nodes, links);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const lines = useMemo(() => {
    if (simNodes.length === 0) return [];
    return links.map((link, idx) => {
      const source = simNodes.find(n => n.id === link.source);
      const target = simNodes.find(n => n.id === link.target);
      if (!source || !target) return null;

      const isRelated = hoveredNode === link.source || hoveredNode === link.target;

      return (
        <Line
          key={idx}
          points={[[source.x, source.y, source.z], [target.x, target.y, target.z]]}
          color={isRelated ? '#ffffff' : '#475569'}
          lineWidth={isRelated ? 2 : 0.5}
          transparent
          opacity={isRelated ? 0.8 : 0.2}
        />
      );
    }).filter(Boolean);
  }, [simNodes, links, hoveredNode]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={10} maxDistance={100} autoRotate autoRotateSpeed={0.5} />
      
      {simNodes.map(node => (
        <Node 
          key={node.id} 
          node={node} 
          isHovered={hoveredNode === node.id} 
          onHover={setHoveredNode} 
        />
      ))}
      
      {lines}
    </>
  );
};

// ─── Exported Component ──────────────────────────────────────────────────────
const KnowledgeGraph = () => {
  return (
    <section id="graph" className="relative w-full h-[600px] bg-slate-950/50 my-20 overflow-hidden rounded-3xl border border-white/5">
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <h2 className="text-4xl font-bold text-white mb-2">Knowledge Graph</h2>
        <p className="text-slate-400 max-w-md">
          Explore the interconnected map of my technical skills, projects, and professional journey in 3D space.
        </p>
      </div>
      
      <div className="absolute bottom-10 right-10 z-10 text-xs text-slate-500 uppercase tracking-widest">
        Drag to rotate • Scroll to zoom • Hover for details
      </div>

      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <React.Suspense fallback={null}>
          <GraphScene />
        </React.Suspense>
      </Canvas>
    </section>
  );
};

export default KnowledgeGraph;
