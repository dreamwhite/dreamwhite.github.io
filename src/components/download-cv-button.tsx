import { Download } from 'lucide-react';

export function DownloadCvButton() {
  return (
    <a
      className="resume-download-action"
      download="Ivan Cafiero CV.pdf"
      href="/documents/ivan-cafiero-cv-europass.pdf"
    >
      <span className="resume-download-icon"><Download size={17} /></span>
      <span><strong>Download CV</strong><small>PDF / Europass</small></span>
    </a>
  );
}
