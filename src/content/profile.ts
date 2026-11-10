export const profile = {
  name: 'Ivan Cafiero',
  handle: 'dreamwhite',
  headline: 'I build software. I understand systems.',
  intro:
    'Computer Science student and software developer working across web applications, integrations, embedded systems, and infrastructure. I like turning complex ideas into reliable, useful software.',
  location: 'Naples, Italy',
  status: 'Computer Science student · UniParthenope',
  availability: 'Open to collaborations',
  philosophy:
    'The interface is only the visible edge of a system. I care about the decisions underneath it: boundaries, failure modes, maintainability, and the small details that make software hold up in the real world.',
  currentFocus: [
    'Web and backend systems with clear boundaries',
    'Embedded computing, MQTT, and home automation',
    'Linux, containers, and self-hosted infrastructure',
  ],
} as const;

export const socials = [
  { label: 'GitHub', value: '@dreamwhite', href: 'https://github.com/dreamwhite' },
  { label: 'LinkedIn', value: 'Ivan Cafiero', href: 'https://www.linkedin.com/in/dreamwhite' },
  { label: 'Email', value: 'ivancafiero@gmail.com', href: 'mailto:ivancafiero@gmail.com' },
] as const;

export const contactSocials = [
  { label: 'X', value: '@dreamwhitedev', href: 'https://x.com/dreamwhitedev' },
  { label: 'Facebook', value: '@dreamwhitedev', href: 'https://www.facebook.com/dreamwhitedev/' },
  { label: 'Instagram', value: '@_ivan_cafiero_', href: 'https://www.instagram.com/_ivan_cafiero_' },
] as const;

export const socialProfileUrls = [
  'https://github.com/dreamwhite',
  'https://www.linkedin.com/in/dreamwhite/',
  'https://x.com/dreamwhitedev',
  'https://www.facebook.com/dreamwhitedev/',
  'https://www.instagram.com/_ivan_cafiero_',
] as const;

export const contactCard = {
  phone: '+39 339 872 5807',
  phoneHref: 'tel:+393398725807',
  email: 'ivancafiero@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dreamwhite',
  x: 'https://x.com/dreamwhitedev',
  facebook: 'https://www.facebook.com/dreamwhitedev/',
  instagram: 'https://instagram.com/_ivan_cafiero_',
  github: 'https://github.com/dreamwhite',
} as const;
