import { createClient } from '@supabase/supabase-js';
import { EventItem, ProjectItem, GalleryItem } from '../types';
import { EVENTS_DATA, PROJECTS_DATA, GALLERY_DATA } from './chapterData';
import { TeamMember, ACTUAL_TEAM_MEMBERS } from './teamData';

const SUPABASE_URL = "https://zwxjuhologbhmicfzrvx.supabase.co";
const SUPABASE_KEY = "sb_publishable_dPVQ_pAVEZw18c4uw2mX7Q__qP5Uk-e";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchLiveTeam(): Promise<TeamMember[]> {
  try {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('status', 'published');

    if (!data || data.length === 0) {
      return ACTUAL_TEAM_MEMBERS;
    }

    // Merge live Supabase assets (e.g. photos, verified social links) into our complete 16 leadership members
    return ACTUAL_TEAM_MEMBERS.map((member) => {
      const live = data.find((d: Record<string, unknown>) => {
        const liveName = String(d.name || '').toLowerCase().replace(/[^a-z]/g, '');
        const currentName = member.name.toLowerCase().replace(/[^a-z]/g, '');
        return liveName === currentName || currentName.includes(liveName) || liveName.includes(currentName);
      });

      if (live) {
        return {
          ...member,
          image_url: String(live.image_url || member.image_url),
          linkedin_url: live.linkedin_url ? String(live.linkedin_url) : member.linkedin_url,
          github_url: live.github_url ? String(live.github_url) : member.github_url,
          instagram_url: live.instagram_url ? String(live.instagram_url) : member.instagram_url,
        };
      }
      return member;
    });
  } catch {
    return ACTUAL_TEAM_MEMBERS;
  }
}

export async function fetchLiveEvents(): Promise<EventItem[]> {
  return EVENTS_DATA;
}

export async function fetchLiveProjects(): Promise<ProjectItem[]> {
  return PROJECTS_DATA;
}

export async function fetchLiveGallery(): Promise<GalleryItem[]> {
  try {
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('status', 'published');
    if (data && data.length > 0) {
      return data as GalleryItem[];
    }
    return GALLERY_DATA;
  } catch {
    return GALLERY_DATA;
  }
}
