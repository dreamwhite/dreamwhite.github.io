import type { ComponentType } from 'react';
import { CartridgeStoreProjectPage } from '@/components/cartridge-store-project-page';
import { EmporionProjectPage } from '@/components/emporion-project-page';
import { EventBridgeProjectPage } from '@/components/event-bridge-project-page';
import { LinuxServerPlaybookProjectPage } from '@/components/linux-server-playbook-project-page';
import { OpenSourceSystemsProjectPage } from '@/components/open-source-systems-project-page';
import { Prg32ProjectPage } from '@/components/prg32-project-page';
import { SpottedTrainProjectPage } from '@/components/spotted-train-project-page';
import type { Project, ProjectSlug } from '@/content/projects';

export type ProjectPageProps = { project: Project };
export type ProjectPageComponent = ComponentType<ProjectPageProps>;

/** Maps stable project slugs to their composed case-study renderer. */
export const projectPageRegistry = {
  prg32: Prg32ProjectPage,
  emporion: EmporionProjectPage,
  'event-driven-mqtt': EventBridgeProjectPage,
  'spotted-train': SpottedTrainProjectPage,
  'cartridge-store': CartridgeStoreProjectPage,
  'open-source-systems': OpenSourceSystemsProjectPage,
  'linux-server-playbook': LinuxServerPlaybookProjectPage,
} satisfies Partial<Record<ProjectSlug, ProjectPageComponent>>;
