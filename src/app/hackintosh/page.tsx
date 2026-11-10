import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Cable,
  CheckCircle2,
  FileCode2,
  Laptop,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';
import { ProjectCaseStudyLayout } from '../../components/project-case-study-layout';
import { CaseStudySection } from '../../components/case-study-section';
import { createPageMetadata } from '../../lib/metadata';

export const metadata = createPageMetadata({
  title: 'Eggintosh / Hackintosh work',
  description: 'Firmware, ACPI, diagnostics and OpenCore tooling from Ivan Cafiero’s public Eggintosh work.',
  path: '/hackintosh/',
});

const toc = [
  { id: 'hackintosh-about', label: 'Why I worked on it' },
  { id: 'hackintosh-firmware', label: 'Firmware & ACPI' },
  { id: 'hackintosh-tooling', label: 'Tooling' },
  { id: 'hackintosh-hardware', label: 'Personal hardware' },
  { id: 'hackintosh-attribution', label: 'Scope & attribution' },
  { id: 'hackintosh-trail', label: 'Public work' },
];

const workstreams = [
  {
    icon: BookOpen,
    title: 'BIOS extraction and CFG Lock',
    text: 'I documented how to extract vendor BIOS payloads, inspect PE32 sections, find the CFG Lock variable and verify the resulting MSR 0xE2 state. The important part is the chain from firmware dump to a checked result, not a blind variable edit.',
  },
  {
    icon: FileCode2,
    title: 'ACPI, battery and device behaviour',
    text: 'I worked through the layer where laptop hardware becomes visible to macOS: embedded-controller fields, battery methods, SSDTs, sleep/wake behaviour and device descriptions. The guides keep model and BIOS assumptions explicit because ACPI patches are never universal recipes.',
  },
  {
    icon: Laptop,
    title: 'Graphics, audio and platform fixes',
    text: 'The device-specific work covered the practical problems that make a laptop usable: Intel UHD graphics connectors, HDMI output, audio and combo-jack behaviour, USB mapping, trackpad gestures, power management and native NVRAM.',
  },
  {
    icon: Cable,
    title: 'Thunderbolt and IORegistry',
    text: 'I created Utopia Team as a public home for platform work around Thunderbolt firmware resources, SSDT references and IORegistryExplorer releases. The work is presented with clear provenance: archived upstream material stays distinct from my own maintenance, release work and documentation.',
  },
];

const tools = [
  { icon: CheckCircle2, title: 'OCValidamus', detail: 'A Python validator that checks whether an OpenCore support pack contains the expected ACPI, drivers, kexts and tools.', href: 'https://github.com/dreamwhite/OCValidamus' },
  { icon: ShieldCheck, title: 'OC-Anonymizer', detail: 'A utility for removing SMBIOS identifiers and machine-specific values before an OpenCore configuration is shared online.', href: 'https://github.com/dreamwhite/OC-Anonymizer' },
  { icon: Terminal, title: 'ocvalidate-ci', detail: 'A GitHub Actions workflow that makes OpenCore configuration validation part of a repository check.', href: 'https://github.com/dreamwhite/ocvalidate-ci' },
  { icon: Wrench, title: 'ioreg2py', detail: 'A small Python utility for turning IORegistryExplorer output into something easier to inspect and process.', href: 'https://github.com/dreamwhite/ioreg2py' },
  { icon: Terminal, title: 'OC ExposeSensitiveData generator', detail: 'A small web tool for generating the OpenCore ExposeSensitiveData value without editing it by hand.', href: 'https://github.com/dreamwhite/oc-esd' },
];

const publicTrail = [
  { title: 'BIOS Extraction Guide', detail: 'Guide, vendor-specific extraction notes and CFG Lock verification.', href: 'https://github.com/dreamwhite/bios-extraction-guide' },
  { title: 'ACPI Battery Patching Guide', detail: 'ACPI battery reporting, embedded-controller fields and model-specific caveats.', href: 'https://github.com/dreamwhite/acpi-battery-patching-guide' },
  { title: 'Dell Inspiron 5370 support pack', detail: 'A personal OpenCore configuration and documentation archive for a Dell Inspiron 5370.', href: 'https://github.com/dreamwhite/dell-inspiron-5370-hackintosh' },
  { title: 'OC-Little Translated', detail: 'Translated and curated ACPI hotpatch references, with the upstream project credited.', href: 'https://github.com/dreamwhite/OC-Little-Translated' },
  { title: 'Patch EDID', detail: 'An explicitly archived script for a macOS magenta/purple display issue; the original script is credited upstream.', href: 'https://github.com/dreamwhite/patch_edid' },
  { title: 'Utopia Team / Thunderbolt 3', detail: 'An attributed public archive of Thunderbolt 3 firmware resources and SSDT references for supported hardware.', href: 'https://github.com/utopia-team/Thunderbolt' },
  { title: 'Utopia Team / IORegistryExplorer', detail: 'An attributed archive and release surface for inspecting macOS I/O, with hashes documented for distributed builds.', href: 'https://github.com/utopia-team/IORegistryExplorer' },
];

export default function HackintoshPage() {
  return (
    <>
      <header className="hackintosh-hero shell">
        <div className="hackintosh-hero-top">
          <p className="hackintosh-kicker"><span className="section-dot" /> Eggintosh / firmware / platform work</p>
          <p className="hackintosh-hero-index">EGGINTOSH / PUBLIC ARCHIVE</p>
        </div>
        <div className="hackintosh-hero-grid">
          <div>
            <h1>I learned the platform by taking it apart.</h1>
            <p className="hackintosh-hero-lede">What started as a personal compatibility problem became a body of work around the undocumented layer between firmware and macOS: BIOS research, ACPI, device-specific fixes, OpenCore tooling and documentation.</p>
            <div className="hackintosh-hero-links">
              <Link className="button button-dark" href="https://github.com/dreamwhite" target="_blank" rel="noreferrer">Browse GitHub <ArrowUpRight size={16} /></Link>
              <Link className="text-link" href="#hackintosh-about">Read the case study <ArrowUpRight size={15} /></Link>
            </div>
          </div>
          <div className="hackintosh-signal-card" aria-label="Hackintosh work summary">
            <div className="hackintosh-signal-card-head"><span>WORK BUILT AROUND</span><ShieldCheck size={18} /></div>
            <div className="hackintosh-signal-row"><span>01</span><strong>Firmware</strong><small>Extract · inspect · verify</small></div>
            <div className="hackintosh-signal-row"><span>02</span><strong>ACPI / hardware</strong><small>Describe · patch · test</small></div>
            <div className="hackintosh-signal-row"><span>03</span><strong>OpenCore</strong><small>Validate · sanitize · share</small></div>
            <div className="hackintosh-signal-row"><span>04</span><strong>Thunderbolt / IOReg</strong><small>Archive · inspect · attribute</small></div>
          </div>
        </div>
      </header>

      <ProjectCaseStudyLayout toc={toc} className="hackintosh-case-study">
        <main className="hackintosh-content">
          <CaseStudySection id="hackintosh-about" className="hackintosh-section" headingClassName="hackintosh-section-heading" labelClassName="hackintosh-label" label="Why I worked on it" title="Not just making macOS boot. Understanding why the machine behaves the way it does." headingLayout="split" shell intro={
                <p className="hackintosh-lede">Hackintosh work taught me to look below the interface: what firmware exposes, how ACPI describes a device, how OpenCore assembles the environment and where a configuration can fail.</p>
          }>
            <p className="hackintosh-copy">The public work is a mix of guides, focused utilities and a device-specific support pack. Together they show the part I actually contributed: turning trial-and-error into something that can be inspected, explained, validated and shared without leaking somebody&apos;s machine identifiers.</p>
          </CaseStudySection>

          <CaseStudySection id="hackintosh-firmware" className="hackintosh-section" headingClassName="hackintosh-section-heading compact" labelClassName="hackintosh-label" label="Firmware & ACPI" title="The work lives below the operating system." headingLayout="split" shell intro={
                <p className="hackintosh-copy">These are the areas where I spent the most time reading, testing and documenting instead of treating the EFI as a bag of magic files.</p>
          }>
            <div className="hackintosh-work-grid">
              {workstreams.map(({ icon: Icon, title, text }) => (
                <article className="hackintosh-work-card" key={title}>
                  <div className="hackintosh-card-icon"><Icon size={19} strokeWidth={1.8} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="hackintosh-tooling" className="hackintosh-section" headingClassName="hackintosh-section-heading compact" labelClassName="hackintosh-label" label="Tooling" title="Once the pattern was clear, I turned it into tools." headingLayout="split" shell intro={
                <p className="hackintosh-copy">The utilities are small on purpose. They solve the repetitive, risky or hard-to-share parts around an OpenCore setup.</p>
          }>
            <div className="hackintosh-tool-list">
              {tools.map(({ icon: Icon, title, detail, href }) => (
                <Link className="hackintosh-tool-row" href={href} target="_blank" rel="noreferrer" key={title}>
                  <span className="hackintosh-tool-icon"><Icon size={17} strokeWidth={1.8} /></span>
                  <span><strong>{title}</strong><small>{detail}</small></span>
                  <ArrowUpRight size={17} />
                </Link>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection id="hackintosh-hardware" className="hackintosh-section" headingClassName="hackintosh-section-heading compact" labelClassName="hackintosh-label" label="Personal hardware" title="A real laptop was the test bench." headingLayout="split" shell intro={
                <p className="hackintosh-lede">The Dell Inspiron 5370 project is the clearest record of the hands-on side of the work: an OpenCore setup built around an i5-8250U, Intel UHD 620, ALC295 audio, mapped USB, I2C trackpad, battery, sleep/wake, NVRAM and Wi-Fi/Bluetooth.</p>
          }>
            <p className="hackintosh-copy">It is now archived as a reference because I replaced the machine. That makes the repository useful as documentation of a platform and a set of solved problems, not as a promise that the same configuration should be copied blindly to another laptop.</p>
            <Link className="text-link hackintosh-inline-link" href="https://github.com/dreamwhite/dell-inspiron-5370-hackintosh" target="_blank" rel="noreferrer">Open the device support pack <ArrowUpRight size={15} /></Link>
          </CaseStudySection>

          <CaseStudySection id="hackintosh-attribution" className="hackintosh-section" headingClassName="hackintosh-section-heading compact" labelClassName="hackintosh-label" label="Scope & attribution" title="Precise about what is mine and what builds on other people&apos;s work." headingLayout="split" shell intro={
                <p className="hackintosh-copy">I did not write macOS, OpenCore, AppleALC, Lilu or the upstream kernel extensions. My work is the surrounding engineering: guides, testing, device-specific integration, diagnostics, validation, anonymization and maintenance.</p>
          }>
            <div className="hackintosh-scope-grid">
              <div><span className="hackintosh-scope-mark">My contribution</span><p>Researching firmware and ACPI behaviour, turning findings into public guides, building focused Python tools and maintaining a working device configuration with its known limitations.</p></div>
              <div><span className="hackintosh-scope-mark">The boundary</span><p>Translations, archives and scripts based on existing work stay labelled as such. Credits and upstream links are part of the project, not a footnote added later.</p></div>
            </div>
          </CaseStudySection>

          <CaseStudySection id="hackintosh-trail" className="hackintosh-section" headingClassName="hackintosh-section-heading compact" labelClassName="hackintosh-label" label="Public work" title="Start with the repositories, not the claim." headingLayout="split" shell intro={
                <p className="hackintosh-copy">This is a curated trail through the work that is public and still useful to inspect.</p>
          }>
            <div className="hackintosh-trail-list">
              {publicTrail.map((item, index) => (
                <Link className="hackintosh-trail-link" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                  <span className="hackintosh-trail-number">{String(index + 1).padStart(2, '0')}</span>
                  <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                  <ArrowUpRight size={17} />
                </Link>
              ))}
            </div>
          </CaseStudySection>
        </main>
      </ProjectCaseStudyLayout>
    </>
  );
}
