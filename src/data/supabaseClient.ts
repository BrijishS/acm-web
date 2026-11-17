import { createClient } from '@supabase/supabase-js';
import { EventItem, ProjectItem, GalleryItem } from '../types';
import { EVENTS_DATA, PROJECTS_DATA, GALLERY_DATA } from './chapterData';
import { TeamMember, ACTUAL_TEAM_MEMBERS } from './teamData';

const SUPABASE_URL = "https://zwxjuhologbhmicfzrvx.supabase.co";
const SUPABASE_KEY = "sb_publishable_dPVQ_pAVEZw18c4uw2mX7Q__qP5Uk-e";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchLiveTeam(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return ACTUAL_TEAM_MEMBERS;
    }

    return data.map((item: Record<string, unknown>, idx: number) => ({
      id: String(item.id || `team-${idx}`),
      name: String(item.name || 'Team Member'),
      designation: String(item.designation || 'Chapter Lead'),
      domain: String(item.domain || 'Executive Council'),
      bio: item.bio ? String(item.bio) : undefined,
      image_url: String(item.image_url || '/assets/vistas-acm-blue-logo.jpg'),
      linkedin_url: item.linkedin_url ? String(item.linkedin_url) : null,
      github_url: item.github_url ? String(item.github_url) : null,
      instagram_url: item.instagram_url ? String(item.instagram_url) : null,
      display_order: Number(item.display_order || idx + 1)
    }));
  } catch {
    return ACTUAL_TEAM_MEMBERS;
  }
}

export async function fetchLiveEvents(): Promise<EventItem[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('event_date', { ascending: true });

    if (error || !data || data.length === 0) {
      return EVENTS_DATA;
    }

    return data.map((item: Record<string, unknown>, idx: number) => ({
      id: String(item.id || `evt-live-${idx}`),
      title: String(item.title || 'Chapter Event'),
      slug: String(item.slug || `event-${idx}`),
      description: String(item.description || 'VISTAS ACM official technical event.'),
      event_date: String(item.event_date || new Date().toISOString()),
      venue: String(item.venue || 'VISTAS Campus'),
      image_url: item.image_url ? String(item.image_url) : undefined,
      registration_url: item.registration_url ? String(item.registration_url) : undefined,
      status: (item.status === 'upcoming' || item.status === 'completed' || item.status === 'ongoing') ? item.status : 'upcoming',
      category: (item.category as EventItem['category']) || 'Workshop',
      featured: Boolean(item.featured)
    }));
  } catch {
    return EVENTS_DATA;
  }
}

export async function fetchLiveProjects(): Promise<ProjectItem[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return PROJECTS_DATA;
    }

    return data.map((item: Record<string, unknown>, idx: number) => ({
      id: String(item.id || `proj-live-${idx}`),
      title: String(item.title || 'Innovation Project'),
      category: String(item.category || 'Computing Systems'),
      description: String(item.description || 'Project built by VISTAS ACM innovators.'),
      tags: Array.isArray(item.tags) ? item.tags : ['ACM', 'Tech'],
      project_url: item.project_url ? String(item.project_url) : undefined,
      github_url: item.github_url ? String(item.github_url) : undefined,
      image_url: item.image_url ? String(item.image_url) : undefined,
      status: 'Active',
      featured: Boolean(item.featured)
    }));
  } catch {
    return PROJECTS_DATA;
  }
}

export async function fetchLiveGallery(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return GALLERY_DATA;
    }

    return data.map((item: Record<string, unknown>, idx: number) => ({
      id: String(item.id || `gal-live-${idx}`),
      title: String(item.title || 'Chapter Moment'),
      event_name: String(item.event_name || 'VISTAS ACM Event'),
      description: String(item.description || 'Moment captured at VISTAS ACM.'),
      media_url: String(item.media_url || '/assets/vistas-acm-blue-logo.jpg'),
      category: String(item.category || 'Event')
    }));
  } catch {
    return GALLERY_DATA;
  }
}
