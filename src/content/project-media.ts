export type ProjectMediaItem = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  featured?: boolean;
};

/** Public screenshots sourced from the official PRG32 repository. */
export const prg32Media: ProjectMediaItem[] = [
  { src: '/images/projects/prg32/ecosystem.svg', alt: 'PRG32 ecosystem map showing the runtime, Construction Kit, Cartridge Store and related tools', label: 'PRG32 ecosystem / system map', width: 960, height: 560, featured: true },
  { src: '/images/projects/prg32/menu-main.png', alt: 'PRG32 main firmware menu', label: 'Firmware / main menu', width: 320, height: 240 },
  { src: '/images/projects/prg32/menu-store.png', alt: 'PRG32 firmware cartridge store menu', label: 'Firmware / cartridge store', width: 320, height: 240 },
  { src: '/images/projects/prg32/menu-about.png', alt: 'PRG32 firmware about menu', label: 'Firmware / about screen', width: 320, height: 240 },
  { src: '/images/projects/prg32/asteroids.png', alt: 'Asteroids demo cartridge running on PRG32', label: 'Runtime / Asteroids', width: 320, height: 240 },
  { src: '/images/projects/prg32/pacman.png', alt: 'Pac-Man demo cartridge running on PRG32', label: 'Runtime / Pac-Man', width: 320, height: 240 },
  { src: '/images/projects/prg32/breakout.png', alt: 'Breakout demo cartridge running on PRG32', label: 'Runtime / Breakout', width: 320, height: 240 },
  { src: '/images/projects/prg32/platformer.png', alt: 'Platformer game running on PRG32', label: 'Runtime / platformer', width: 320, height: 240 },
  { src: '/images/projects/prg32/pong.png', alt: 'Pong game running on PRG32', label: 'Runtime / Pong', width: 320, height: 240 },
  { src: '/images/projects/prg32/tetris.png', alt: 'Tetris game running on PRG32', label: 'Runtime / Tetris', width: 320, height: 240 },
  { src: '/images/projects/prg32/space-invaders.png', alt: 'Space Invaders game running on PRG32', label: 'Runtime / Space Invaders', width: 320, height: 240 },
  { src: '/images/projects/prg32/raycaster.png', alt: 'Raycaster game running on PRG32', label: 'Runtime / raycaster', width: 320, height: 240 },
  { src: '/images/projects/prg32/featured/azzurra-pro-tennis.png', alt: "Azzurra's Pro Tennis Challenge store capture", label: 'Cartridge Store / Azzurra’s Pro Tennis', width: 320, height: 200 },
  { src: '/images/projects/prg32/featured/outbun-napoli97.png', alt: 'Outbun Napoli 97 store capture', label: 'Cartridge Store / Outbun Napoli 97', width: 320, height: 200 },
  { src: '/images/projects/prg32/featured/sensational-soccer.png', alt: 'Sensational Soccer store capture', label: 'Cartridge Store / Sensational Soccer', width: 320, height: 200 },
  { src: '/images/projects/prg32/field/handheld-cartridge.webp', alt: 'PRG32 cartridge hardware showing a game running on the display', label: 'Hardware / cartridge runtime', width: 2048, height: 1365 },
  { src: '/images/projects/prg32/field/breadboard-prototype.webp', alt: 'PRG32 display and audio prototype wired on a breadboard', label: 'Hardware / prototype testing', width: 1182, height: 666 },
  { src: '/images/projects/prg32/field/live-demo-room.webp', alt: 'PRG32 game running on a monitor during a live demonstration', label: 'Public demo / live runtime', width: 480, height: 853 },
];
