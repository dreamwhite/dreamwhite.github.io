'use client';

import { useState } from 'react';
import { BriefcaseBusiness, Boxes, Check, Code2, Cpu, Database, Laptop, Server } from 'lucide-react';
import { skillCatalog, type SkillCatalogGroup } from '@/content/skill-catalog';

const skillIcons = {
  code: Code2,
  web: Boxes,
  data: Database,
  systems: Server,
  embedded: Cpu,
  platform: Laptop,
  quality: Check,
  teaching: BriefcaseBusiness,
} as const;

const nodePositions = [
  { left: '14%', top: '17%' },
  { left: '39%', top: '11%' },
  { left: '75%', top: '17%' },
  { left: '88%', top: '49%' },
  { left: '75%', top: '81%' },
  { left: '39%', top: '89%' },
  { left: '14%', top: '81%' },
  { left: '14%', top: '49%' },
];

const connectorPoints = [
  { x: 120, y: 90 },
  { x: 335, y: 58 },
  { x: 645, y: 90 },
  { x: 760, y: 255 },
  { x: 645, y: 420 },
  { x: 335, y: 445 },
  { x: 120, y: 420 },
  { x: 120, y: 255 },
];

const mapCenter = { x: 430, y: 265 };

function categoryLabel(group: SkillCatalogGroup) {
  const labels: Record<string, string> = {
    'Languages & fundamentals': 'Languages',
    'Web & application engineering': 'Web & apps',
    'Data & backend systems': 'Data & backend',
    'Systems & infrastructure': 'Systems',
    'Embedded & connected systems': 'Embedded',
    'Apple, desktop & mobile': 'Apple & mobile',
    'Quality & delivery': 'Quality',
    'Teaching & communication': 'Teaching',
  };

  return labels[group.title] ?? group.title;
}

export function SkillMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = skillCatalog[activeIndex];
  const ActiveIcon = skillIcons[activeGroup.icon];

  return (
    <section className="skills-map" id="skills-catalog">
      <header className="skills-map-header">
        <div>
          <p className="skills-kicker">Skill map</p>
          <h2>What connects the work.</h2>
        </div>
        <p>Each point is an area I have used in practice. Select a branch to see the tools and situations behind it.</p>
      </header>

      <div className="skills-map-workspace">
        <div className="skills-map-canvas" role="group" aria-label="Interactive map of Ivan Cafiero's skills">
          <svg className="skills-map-lines" viewBox="0 0 860 520" aria-hidden="true" preserveAspectRatio="none">
            {connectorPoints.map((point, index) => <line className={`skills-map-line${index === activeIndex ? ' active' : ''}`} key={`${point.x}-${point.y}`} x1={mapCenter.x} x2={point.x} y1={mapCenter.y} y2={point.y} />)}
            {connectorPoints.map((point, index) => <circle className={`skills-map-line-dot${index === activeIndex ? ' active' : ''}`} cx={point.x} cy={point.y} key={`dot-${point.x}-${point.y}`} r={index === activeIndex ? 5 : 3.5} />)}
          </svg>

          <div className="skills-map-core" aria-hidden="true">
            <span>DW</span>
            <strong>Software<br />&amp; systems</strong>
            <small>from Naples</small>
          </div>

          {skillCatalog.map((group, index) => {
            const Icon = skillIcons[group.icon];
            const active = index === activeIndex;
            return (
              <button
                className={`skills-map-node${active ? ' active' : ''}`}
                key={group.title}
                style={nodePositions[index]}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
              >
                <span className="skills-map-node-icon"><Icon size={16} strokeWidth={1.8} /></span>
                <span className="skills-map-node-copy"><strong>{categoryLabel(group)}</strong><small>{String(group.skills.length).padStart(2, '0')} skills</small></span>
              </button>
            );
          })}
        </div>

        <aside className="skills-map-detail" aria-live="polite">
          <div className="skills-map-detail-heading">
            <span className="skills-map-detail-icon"><ActiveIcon size={18} strokeWidth={1.8} /></span>
            <div><p>{activeGroup.title}</p><span>{String(activeGroup.skills.length).padStart(2, '0')} areas</span></div>
          </div>
          <p className="skills-map-detail-description">{activeGroup.description}</p>
          <ul>
            {activeGroup.skills.map((skill) => <li key={skill.name}><span className="skills-map-skill-dot" /><div><strong>{skill.name}</strong><small>{skill.context}</small></div></li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
