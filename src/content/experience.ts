export type ExperienceItem = {
  period: string;
  title: string;
  organization: string;
  description: string;
  tag: string;
};

export const experience: ExperienceItem[] = [
  {
    period: '2016 — now',
    title: 'Independent software developer',
    organization: 'Self-employed · Italy',
    description: 'Designing, building, and maintaining web applications, business management systems, and custom software solutions across the full development lifecycle. Primarily working with TypeScript, React, Next.js, Node.js, relational databases, APIs, and self-hosted infrastructure.',
    tag: 'Work experience',
  },
  {
    period: 'Oct 2025 — Jun 2026',
    title: 'Coding Instructor',
    organization: 'NOI — Next Open Innovation · Freelance',
    description: 'Introduced primary and middle-school students to programming, computational thinking, and computer-science fundamentals through practical lessons and interactive activities.',
    tag: 'Work experience',
  },
  {
    period: '2024 — now',
    title: 'Computer Science studies',
    organization: 'Università degli Studi di Napoli Parthenope',
    description: 'Algorithms, data structures, object-oriented programming, operating systems, databases, software engineering, and web technologies.',
    tag: 'Education',
  },
  {
    period: '2019 — 2024',
    title: 'ICT studies',
    organization: 'Università degli Studi di Napoli Federico II',
    description: 'A completed degree path that built the foundation for working across software, systems, and information technologies.',
    tag: 'Education',
  },
  {
    period: 'Jun — Sep 2018',
    title: 'Software Quality Assurance intern',
    organization: 'Kelyon · Digital Health',
    description: 'Contributed to testing and quality assurance for a medical software application supporting pediatric endocrinology workflows, with a focus on functional correctness and reliability.',
    tag: 'Internship',
  },
];
