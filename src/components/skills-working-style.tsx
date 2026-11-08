import { Layers3, Network, ShieldCheck } from 'lucide-react';

const workingModes = [
  {
    title: 'Build',
    description: 'Product surfaces, services and interfaces with clear ownership and boundaries.',
    icon: Layers3,
  },
  {
    title: 'Connect',
    description: 'Firmware, mobile clients and integrations where data crosses systems and devices.',
    icon: Network,
  },
  {
    title: 'Make reliable',
    description: 'Testing, deployment, debugging and documentation that keep the next change safe.',
    icon: ShieldCheck,
  },
];

export function SkillsWorkingStyle() {
  return (
    <section className="skills-working-style" aria-labelledby="skills-working-style-title">
      <header className="skills-working-style-heading">
        <div>
          <p className="skills-kicker">How I work</p>
          <h2 id="skills-working-style-title">Tools are only the surface.</h2>
        </div>
        <p>The map shows the areas. Underneath them is a consistent way of breaking down, connecting and finishing technical work.</p>
      </header>
      <div className="skills-working-style-list">
        {workingModes.map(({ title, description, icon: Icon }, index) => (
          <div className="skills-working-style-item" key={title}>
            <span className="skills-working-style-index">0{index + 1}</span>
            <span className="skills-working-style-icon"><Icon size={19} strokeWidth={1.7} /></span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
