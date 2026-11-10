import { SkillMap } from '../../components/skill-map';
import { SkillsWorkingStyle } from '../../components/skills-working-style';

export const metadata = { title: 'Skills', description: 'Skills and working areas demonstrated across Ivan Cafiero’s software and systems projects.' };

export default function SkillsPage() {
  return (
    <section className="skills-page shell">
      <div className="skills-page-main">
      <header className="skills-header">
        <div>
          <p className="skills-kicker">Skills</p>
          <h1>What I bring to a system.</h1>
          <p className="skills-intro">A practical map of the languages, tools, and engineering habits that show up across my work. No arbitrary percentages — each area is tied to a project, a role, or a real problem I have worked on.</p>
        </div>
      </header>

      <SkillMap />
      <SkillsWorkingStyle />
      </div>
    </section>
  );
}
