import type { ProjectMediaItem } from '@/content/project-media';

export const projectSlugs = [
  'prg32',
  'emporion',
  'spotted-train',
  'event-driven-mqtt',
  'open-source-systems',
  'linux-server-playbook',
  'cartridge-store',
] as const;

export type ProjectSlug = typeof projectSlugs[number];

/** Identifies a composed case-study renderer without coupling route code to content slugs. */
export type ProjectRenderer =
  | 'prg32'
  | 'emporion'
  | 'event-driven-mqtt'
  | 'spotted-train'
  | 'cartridge-store'
  | 'open-source-systems'
  | 'linux-server-playbook';

export type Project = {
  slug: ProjectSlug;
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  technologies: string[];
  challenge: string;
  links: { label: string; href: string }[];
  categories: ProjectCategory[];
  tier: ProjectTier;
  path?: string;
  media?: ProjectMediaItem[];
  renderer?: ProjectRenderer;
  featured?: boolean;
  draft?: boolean;
};

export type ProjectTier = 'flagship' | 'specialist' | 'supporting';

/** The smaller, presentation-focused shape used by the project browser. */
export type ProjectCardData = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  technologies: string[];
  categories: ProjectCategory[];
  href: string;
  tier: ProjectTier;
  draft?: boolean;
};

export type ProjectCategory = 'product' | 'embedded' | 'mobile' | 'systems' | 'platform' | 'academic' | 'tooling';

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'product', label: 'Product & web' },
  { id: 'embedded', label: 'Embedded & hardware' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'systems', label: 'Systems & infrastructure' },
  { id: 'platform', label: 'Apple & Hackintosh' },
  { id: 'academic', label: 'Academic' },
  { id: 'tooling', label: 'Developer tooling' },
];

export const projects: Project[] = [
  {
    slug: 'prg32',
    title: 'PRG32',
    eyebrow: 'Embedded systems / RISC-V education',
    summary:
      'An open-source educational runtime for teaching RISC-V assembly and C through native game cartridges on ESP32-C6 hardware and QEMU.',
    role: 'Contributor · UniParthenope',
    technologies: ['RV32IMAC', 'ESP32-C6', 'C / Assembly', 'QEMU', 'Python'],
    challenge:
      'Make low-level programming tangible without hiding the engineering boundaries: firmware, cartridge ABI, hardware, emulator, and web tooling all need to agree.',
    categories: ['embedded', 'academic'],
    tier: 'flagship',
    links: [
      { label: 'Project repository', href: 'https://github.com/riscv-prg32/PRG32' },
      { label: 'Cartridge Store', href: 'https://store.prg32.uniparthenope.it/' },
      { label: 'Construction Kit', href: 'https://kit.prg32.uniparthenope.it/' },
    ],
    renderer: 'prg32',
    featured: true,
  },
  {
    slug: 'emporion',
    title: 'Emporion',
    eyebrow: 'Commerce platform / systems architecture',
    summary:
      'A TypeScript commerce platform with separate shop and admin frontends, a gateway-led service architecture, and a plugin runtime built for realistic local HTTPS development.',
    role: 'Independent project · architecture and implementation',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'Docker', 'Stripe'],
    challenge:
      'Make the storefront, backoffice, domain services, plugin system, and deployment workflow behave like one platform without collapsing their boundaries.',
    categories: ['product'],
    tier: 'flagship',
    links: [],
    renderer: 'emporion',
    featured: true,
    draft: false,
  },
  {
    slug: 'spotted-train',
    title: 'Spotted Train',
    eyebrow: 'iOS / public academic project',
    summary:
      'An independent iOS transit application for route search, departures, service updates, and frequently used journeys — designed around changing data and imperfect connectivity.',
    role: 'iOS Client Developer · Product Contribution',
    technologies: ['SwiftUI', 'Firebase Cloud Messaging', 'MapKit', 'CoreLocation', 'Async programming'],
    challenge:
      'Make live transit information useful beyond the ideal online scenario: local state, remote services, maps, notifications, and failure handling all need to work together as one mobile experience.',
    categories: ['mobile', 'academic'],
    tier: 'flagship',
    links: [
      { label: 'View on the App Store', href: 'https://apps.apple.com/it/app/spotted-train/id6736531247' },
    ],
    renderer: 'spotted-train',
    featured: false,
    draft: false,
  },
  {
    slug: 'event-driven-mqtt',
    title: 'Event-driven MQTT bridge',
    eyebrow: 'IoT / home automation',
    summary:
      'A small event-driven integration that translates device events into MQTT messages for home-automation systems.',
    role: 'Independent project · integration engineering',
    technologies: ['Python', 'MQTT', 'Linux', 'Docker', 'Home Assistant'],
    challenge:
      'Translate a closed device event model into stable, useful messages that can run reliably in a Linux or containerized environment.',
    categories: ['systems'],
    tier: 'specialist',
    links: [],
    renderer: 'event-driven-mqtt',
    featured: true,
    draft: false,
  },
  {
    slug: 'open-source-systems',
    title: 'Open-source systems',
    eyebrow: 'Linux / tooling / infrastructure',
    summary:
      'A growing collection of practical tools, guides, automation, and systems work across Linux, macOS, networking, and developer workflows.',
    role: 'Independent and collaborative open-source work',
    technologies: ['Linux', 'Python', 'Shell', 'Docker', 'macOS', 'CI'],
    challenge:
      'Small tools are still systems: they need clear assumptions, useful failure modes, and documentation someone else can trust.',
    categories: ['systems', 'tooling'],
    tier: 'supporting',
    links: [
      { label: 'GitHub profile', href: 'https://github.com/dreamwhite' },
      { label: 'Linux server playbook', href: 'https://github.com/dreamwhite/linux-server-playbook' },
    ],
    renderer: 'open-source-systems',
  },
  {
    slug: 'linux-server-playbook',
    title: 'Linux Server Playbook',
    eyebrow: 'Infrastructure / operations / security',
    summary:
      'A reproducible Ubuntu LTS baseline for turning a fresh server into a hardened, Docker-ready Golden Server with explicit validation and recovery paths.',
    role: 'Independent infrastructure work · operational runbook',
    technologies: ['Ubuntu', 'OpenSSH', 'UFW', 'Docker', 'Fail2Ban', 'DNS', 'Shell'],
    challenge:
      'Make server preparation reviewable and repeatable without treating a successful command as proof that the intended security state is actually active.',
    categories: ['systems'],
    tier: 'supporting',
    links: [
      { label: 'Project repository', href: 'https://github.com/dreamwhite/linux-server-playbook' },
    ],
    renderer: 'linux-server-playbook',
    featured: false,
    draft: false,
  },
  {
    slug: 'cartridge-store',
    title: 'PRG32 Cartridge Store',
    eyebrow: 'Fastify / Next.js / platform service',
    summary:
      'A rewritten catalog and service hub for publishing, discovering and distributing PRG32 game cartridges across physical hardware and emulated workflows.',
    role: 'Rewrite · architecture and implementation · PRG32 ecosystem',
    technologies: ['Fastify', 'Next.js PWA', 'TypeScript', 'SQLite', 'WebSocket', 'Docker Compose', 'Traefik'],
    challenge:
      'Replace the legacy Flask path with a typed Fastify service and a Next.js PWA while keeping packages, identity, publication, downloads, telemetry and compatibility contracts coherent across the browser, API, board and emulator.',
    categories: ['product', 'embedded', 'academic'],
    tier: 'flagship',
    links: [
      { label: 'Cartridge Store', href: 'https://store.prg32.uniparthenope.it/' },
      { label: 'Project repository · development', href: 'https://github.com/dreamwhite/CartridgeStore/tree/development' },
    ],
    renderer: 'cartridge-store',
    featured: false,
    draft: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

/** Projects the browser can render as a compact card without case-study-only fields. */
export function toProjectCard(project: Project): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    eyebrow: project.eyebrow,
    summary: project.summary,
    technologies: project.technologies,
    categories: project.categories,
    href: project.path ?? `/projects/${project.slug}/`,
    tier: project.tier,
    draft: project.draft,
  };
}

/** Projects selected for the homepage, projected into the card-only model. */
export const featuredProjectCards: ProjectCardData[] = featuredProjects.map(toProjectCard);

/** The homepage rail has its own editorial order, separate from the broader featured-project set. */
const homepageProjectSlugs: ProjectSlug[] = ['prg32', 'emporion', 'event-driven-mqtt', 'spotted-train'];
export const homepageProjectCards: ProjectCardData[] = homepageProjectSlugs.map((slug) => toProjectCard(projects.find((project) => project.slug === slug)!));

export const projectCards: ProjectCardData[] = [
  ...projects.map(toProjectCard),
  {
    slug: 'hackintosh-work',
    title: 'Eggintosh / Hackintosh work',
    eyebrow: 'Eggintosh / Apple platform / firmware',
    summary: 'Guides, experiments and focused tools around BIOS extraction, ACPI, OpenCore configuration hygiene and hardware troubleshooting.',
    technologies: ['BIOS', 'ACPI / ASL', 'OpenCore', 'Python', 'macOS'],
    categories: ['platform', 'tooling'],
    href: '/hackintosh/',
    tier: 'specialist',
    draft: false,
  },
];

/** Finds a full case study by its stable route slug. */
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
