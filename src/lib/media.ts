import fs from 'node:fs';
import path from 'node:path';

export type Video = { src: string; poster?: string; caption?: string; seconds?: number };
export type Still = { src: string; alt: string };
export type ProjectMedia = { videos: Video[]; stills: Still[] };

const empty: ProjectMedia = { videos: [], stills: [] };

let cache: Record<string, ProjectMedia> | null = null;

// The manifest is produced alongside the recordings in public/media.
// Entries whose files are missing are dropped so a page never shows a broken player.
function load(): Record<string, ProjectMedia> {
  if (cache) return cache;
  const file = path.join(process.cwd(), 'public/media/manifest.json');
  try {
    const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, Partial<ProjectMedia>>;
    const exists = (src?: string) =>
      !!src && fs.existsSync(path.join(process.cwd(), 'public', src.replace(/^\//, '')));
    cache = Object.fromEntries(
      Object.entries(raw).map(([slug, m]) => [
        slug,
        {
          videos: (m.videos ?? []).filter((v) => exists(v.src)),
          stills: (m.stills ?? []).filter((s) => exists(s.src)),
        },
      ]),
    );
  } catch {
    cache = {};
  }
  return cache;
}

export function mediaFor(slug: string): ProjectMedia {
  return load()[slug] ?? empty;
}

/** Best single visual for an index row: a video poster, else the first still. */
export function coverFor(slug: string): { image?: string; video?: string; alt: string } {
  const m = mediaFor(slug);
  const v = m.videos[0];
  if (v) return { image: v.poster ?? m.stills[0]?.src, video: v.src, alt: v.caption ?? '' };
  const s = m.stills[0];
  return s ? { image: s.src, alt: s.alt } : { alt: '' };
}
