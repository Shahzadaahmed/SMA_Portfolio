import { projects as portfolioProjects, skills, experience, education } from './portfolio-data';
import projectsJson from './projects.json';

export interface GraphNode {
  id: string;
  label: string;
  group: 'user' | 'category' | 'project' | 'skill' | 'experience' | 'education' | 'tech';
  val: number;
  color?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export const getGraphData = () => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // 1. Root Node
  nodes.push({ id: 'root', label: 'Muhammad Haris', group: 'user', val: 20 });

  // 2. Categories
  const categories = ['Web', 'Mobile', 'Backend', 'Automation'];
  categories.forEach(cat => {
    nodes.push({ id: `cat-${cat}`, label: cat, group: 'category', val: 15 });
    links.push({ source: 'root', target: `cat-${cat}` });
  });

  // 3. Projects from projects.json (more detailed)
  projectsJson.forEach((p: any) => {
    const projectId = `proj-${p.name.replace(/\s+/g, '-').toLowerCase()}`;
    nodes.push({ id: projectId, label: p.name, group: 'project', val: 10 });
    
    // Link project to its main category
    let catId = 'cat-Web';
    if (p.category?.includes('mobile')) catId = 'cat-Mobile';
    if (p.category?.includes('backend')) catId = 'cat-Backend';
    if (p.category?.includes('n8n')) catId = 'cat-Automation';
    links.push({ source: catId, target: projectId });

    // 4. Skills/Tags for this project
    p.tags?.forEach((tag: string) => {
      const skillId = `skill-${tag.toLowerCase()}`;
      if (!nodes.find(n => n.id === skillId)) {
        nodes.push({ id: skillId, label: tag, group: 'tech', val: 8 });
      }
      links.push({ source: projectId, target: skillId });
    });
  });

  // 5. Experience
  experience.forEach(exp => {
    const expId = `exp-${exp.company.replace(/\s+/g, '-').toLowerCase()}`;
    nodes.push({ id: expId, label: exp.company, group: 'experience', val: 12 });
    links.push({ source: 'root', target: expId });

    // Try to link experience to relevant categories or skills
    // For simplicity, link to root for now, but we could add more logic
  });

  // 6. Education
  education.forEach(edu => {
    const eduId = `edu-${edu.institution.replace(/\s+/g, '-').toLowerCase()}`;
    nodes.push({ id: eduId, label: edu.institution, group: 'education', val: 10 });
    links.push({ source: 'root', target: eduId });
  });

  return { nodes, links };
};
