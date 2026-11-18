// ============================================================================
// A.R.I.A. — Knowledge Retrieval & Command Execution Engine
// Verified ACM Chapter Intelligence + Allowlisted Action Router + Serverless AI Bridge
// ============================================================================

import {
  CHAPTER_INFO,
  EVENTS_DATA,
  PROJECTS_DATA,
  CHAPTER_TIMELINE,
  DOMAINS_DATA,
  CHAPTER_ACHIEVEMENTS,
  MEMBERSHIP_DATA,
  CHAPTER_OBJECTIVES
} from '../data/chapterData';
import { ACTUAL_TEAM_MEMBERS } from '../data/teamData';
import { AriaCommandResult } from '../types/aria';

export interface AriaQueryResponse {
  reply: string;
  panelType?: 'events' | 'crew' | 'projects' | 'analytics' | 'membership' | 'system' | 'none';
  panelData?: unknown;
  actionTaken?: {
    type: 'NAVIGATE' | 'OPEN_PANEL' | 'ADMIN_ACTION' | 'AUDIO_CONTROL' | 'NONE';
    target?: string;
    label?: string;
  };
  suggestedPrompts?: string[];
  source: 'gemini_api' | 'local_knowledge_engine';
}

class AriaIntelligenceEngine {
  /**
   * Process a natural language query or spoken command
   */
  public async processQuery(query: string, isAdminAuthenticated: boolean = false): Promise<AriaQueryResponse> {
    const trimmed = query.trim();
    if (!trimmed) {
      return {
        reply: "Standing by. What would you like to explore or execute in Mission Control?",
        panelType: 'none',
        source: 'local_knowledge_engine',
        suggestedPrompts: ['Upcoming events', 'Our crew roster', '5 Technical domains', 'How to join ACM']
      };
    }

    // 1. First, check for deterministic allowlisted website commands
    const commandResult = this.evaluateWebsiteCommand(trimmed, isAdminAuthenticated);
    if (commandResult) {
      return {
        reply: commandResult.reply,
        panelType: commandResult.panelType || 'none',
        panelData: commandResult.panelData,
        actionTaken: commandResult.navigationTarget
          ? { type: 'NAVIGATE', target: commandResult.navigationTarget, label: `Navigating to ${commandResult.navigationTarget}` }
          : commandResult.isAdminAction
          ? { type: 'ADMIN_ACTION', target: 'admin', label: 'Executing Administrative Directive' }
          : { type: 'OPEN_PANEL', target: commandResult.panelType, label: `Opening ${commandResult.panelType} panel` },
        suggestedPrompts: commandResult.suggestedPrompts,
        source: 'local_knowledge_engine'
      };
    }

    // 2. Attempt remote Gemini serverless backend (/api/aria)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('/api/aria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          isAdminAuthenticated
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          return {
            reply: data.reply,
            panelType: data.panelType || 'none',
            panelData: data.panelData,
            actionTaken: data.navigationTarget
              ? { type: 'NAVIGATE', target: data.navigationTarget, label: `Navigating to ${data.navigationTarget}` }
              : undefined,
            suggestedPrompts: data.suggestedPrompts || this.getGenericSuggestions(),
            source: 'gemini_api'
          };
        }
      }
    } catch {
      // Serverless backend offline or unconfigured; gracefully fall through to semantic local engine
    }

    // 3. Fallback to Verified Local Knowledge Engine
    return this.evaluateLocalKnowledge(trimmed);
  }

  /**
   * Deterministic Command Matcher for Allowlisted Website Interactions
   */
  private evaluateWebsiteCommand(query: string, isAdminAuthenticated: boolean): AriaCommandResult | null {
    const q = query.toLowerCase();

    // Command: Navigation - Events
    if (q.includes('event') || q.includes('hackathon') || q.includes('workshop') || q.includes('upcoming') || q.includes('hack the vel')) {
      return {
        reply: "Affirmative. Loading the VISTAS ACM launches and event telemetry. Here are the 6 verified chapter events scheduled for our active cycle.",
        panelType: 'events',
        panelData: EVENTS_DATA,
        navigationTarget: 'events',
        suggestedPrompts: ['Register for Hack the Vel', 'Show our crew', 'Technical domains']
      };
    }

    // Command: Navigation - Crew & Leadership
    if (q.includes('crew') || q.includes('team') || q.includes('member') || q.includes('chairperson') || q.includes('faculty') || q.includes('udayakumar') || q.includes('brijish')) {
      return {
        reply: "Acknowledged. Accessing leadership dossier. The chapter is guided by Faculty Advisor Mr. N. Udayakumar and Student Chairperson Mr. Brijish S, alongside 15 student office bearers.",
        panelType: 'crew',
        panelData: ACTUAL_TEAM_MEMBERS,
        navigationTarget: 'crew',
        suggestedPrompts: ['Show technical team', 'Chapter governance', 'Upcoming events']
      };
    }

    // Command: Navigation - Technical Domains
    if (q.includes('domain') || q.includes('division') || q.includes('cyber') || q.includes('cloud') || q.includes('web') || q.includes('emerging')) {
      return {
        reply: "Routing to Galaxy Domains. VISTAS ACM operates across 5 technical divisions: AI & Machine Learning, Web & App Development, Cybersecurity, Data & Cloud, and Emerging Tech.",
        panelType: 'none',
        navigationTarget: 'domains',
        suggestedPrompts: ['View Student Projects', 'Upcoming Workshops', 'Join Chapter']
      };
    }

    // Command: Navigation - Student Projects & Payloads
    if (q.includes('project') || q.includes('build') || q.includes('payload') || q.includes('companion') || q.includes('vault') || q.includes('rural')) {
      return {
        reply: "Deploying engineering payload specifications. Current active student builds include Campus Companion, Exam Vault, and the Rural Learn Kit.",
        panelType: 'projects',
        panelData: PROJECTS_DATA,
        navigationTarget: 'projects',
        suggestedPrompts: ['View technical domains', 'Explore Hackathons', 'Join ACM']
      };
    }

    // Command: Navigation - Achievements & Analytics
    if (q.includes('achievement') || q.includes('analytics') || q.includes('standing') || q.includes('status') || q.includes('metric') || q.includes('stats')) {
      return {
        reply: "Displaying official chapter standing and verified analytics. VISTAS ACM is officially recognized in Good Standing by ACM headquarters under Group ID 199704.",
        panelType: 'analytics',
        panelData: {
          groupId: CHAPTER_INFO.groupId,
          status: MEMBERSHIP_DATA.status,
          activeAcmMembers: MEMBERSHIP_DATA.activeAcmMembers,
          activeInterfaceMembers: MEMBERSHIP_DATA.activeMembersInInterface,
          achievements: CHAPTER_ACHIEVEMENTS
        },
        navigationTarget: 'achievements',
        suggestedPrompts: ['Chapter timeline', 'Leadership roster', 'Join ACM']
      };
    }

    // Command: Navigation - Membership & Join
    if (q.includes('join') || q.includes('membership') || q.includes('register') || q.includes('apply') || q.includes('how to join')) {
      return {
        reply: "Opening membership initiation gateway. Students across the School of Engineering can join VISTAS ACM for AY 2026–2027.",
        panelType: 'membership',
        panelData: MEMBERSHIP_DATA,
        navigationTarget: 'join',
        suggestedPrompts: ['Upcoming workshops', 'Leadership team', 'Contact chapter']
      };
    }

    // Command: Navigation - Gallery
    if (q.includes('gallery') || q.includes('photo') || q.includes('picture') || q.includes('moment')) {
      return {
        reply: "Opening visual archive. Displaying authenticated event captures, hackathon moments, and code sprint documentation.",
        panelType: 'none',
        navigationTarget: 'gallery',
        suggestedPrompts: ['Upcoming events', 'About chapter', 'Student projects']
      };
    }

    // Command: Navigation - Timeline
    if (q.includes('timeline') || q.includes('history') || q.includes('founded') || q.includes('charter')) {
      return {
        reply: "Retrieving chapter chronology. Chartered in October 2026, confirmed in Good Standing in November 2026, and actively operating for Academic Year 2026–2027.",
        panelType: 'none',
        navigationTarget: 'timeline',
        suggestedPrompts: ['View Achievements', 'Leadership roster']
      };
    }

    // Command: Navigation - Contact
    if (q.includes('contact') || q.includes('email') || q.includes('location') || q.includes('where') || q.includes('address') || q.includes('instagram')) {
      return {
        reply: "Opening chapter communications uplink. Located at Department of CSE, School of Engineering, VISTAS Chennai. Faculty coordinator contact: nudayakumar.se@vistas.ac.in.",
        panelType: 'none',
        navigationTarget: 'contact',
        suggestedPrompts: ['Follow Instagram @vistas_acm', 'Join ACM', 'About Chapter']
      };
    }

    // Command: System Status / Diagnostics
    if (q.includes('system status') || q.includes('diagnostics') || q.includes('aria status') || q.includes('health') || q.includes('ping')) {
      return {
        reply: "All core systems nominal. WebGL 3D holographic rendering active at 60 FPS. Knowledge graph synchronized with ACM Group ID 199704.",
        panelType: 'system',
        suggestedPrompts: ['Explore events', 'Meet our crew', 'Student projects']
      };
    }

    // Admin Commands
    if (q.includes('admin') || q.includes('pending submission') || q.includes('review membership') || q.includes('create event')) {
      if (!isAdminAuthenticated) {
        return {
          reply: "Access restricted. Administrative operations require verification. Please open the Mission Control Admin Console and enter authorized credentials.",
          isAdminAction: true,
          suggestedPrompts: ['Open Admin Console', 'System status']
        };
      } else {
        return {
          reply: "Administrative credentials verified. Routing command to protected Mission Control dashboard.",
          isAdminAction: true,
          suggestedPrompts: ['Review submissions', 'Update events', 'Close admin']
        };
      }
    }

    return null;
  }

  /**
   * Local Semantic Knowledge Base Answering
   */
  private evaluateLocalKnowledge(query: string): AriaQueryResponse {
    const q = query.toLowerCase();

    if (q.includes('who are you') || q.includes('what is aria') || q.includes('what are you')) {
      return {
        reply: "I am A.R.I.A. (Advanced Responsive Intelligence Assistant), the primary intelligence system for VISTAS ACM Student Chapter. Tagline: YOUR INTELLIGENCE. YOUR INTERFACE. YOUR FUTURE.",
        panelType: 'system',
        source: 'local_knowledge_engine',
        suggestedPrompts: ['What is VISTAS ACM?', 'Show upcoming events', 'Meet our crew']
      };
    }

    if (q.includes('what is vistas acm') || q.includes('about acm') || q.includes('mission') || q.includes('vision')) {
      return {
        reply: "VISTAS ACM is the official student chapter of the Association for Computing Machinery at Vels Institute of Science, Technology and Advanced Studies (Group ID 199704). Operating under the tagline 'INNOVATE. CREATE. LEAD.', we empower students through practical technology, research, and collaborative innovation.",
        panelType: 'none',
        actionTaken: { type: 'NAVIGATE', target: 'about', label: 'Navigating to About ACM' },
        source: 'local_knowledge_engine',
        suggestedPrompts: ['5 Technical domains', 'Upcoming hackathons', 'How to join']
      };
    }

    if (q.includes('faculty') || q.includes('advisor') || q.includes('coordinator')) {
      return {
        reply: "Our Faculty Advisor is Mr. N. Udayakumar, Assistant Professor in the Department of Computer Science and Engineering, School of Engineering, VISTAS. He provides overarching mentorship, institutional coordination, and activity reviews.",
        panelType: 'crew',
        panelData: ACTUAL_TEAM_MEMBERS.filter(m => m.isFaculty),
        source: 'local_knowledge_engine',
        suggestedPrompts: ['Student Chairperson', 'Full crew roster', 'Contact coordinator']
      };
    }

    if (q.includes('chairperson') || q.includes('student head') || q.includes('lead')) {
      return {
        reply: "The Student Chairperson is Mr. Brijish S, who leads chapter operations, student leadership coordination, and activity execution alongside Vice Chairperson Ms. Keerthana V and Secretary Ms. Nisha S.",
        panelType: 'crew',
        panelData: ACTUAL_TEAM_MEMBERS.slice(1, 4),
        source: 'local_knowledge_engine',
        suggestedPrompts: ['Full crew roster', 'Governance structure', 'Upcoming hackathons']
      };
    }

    // Default intelligent fallback
    return {
      reply: "I have cross-referenced our official VISTAS ACM chapter archives. I can navigate directly to events, technical domains, leadership profiles, student payloads, or membership information. Where would you like to direct Mission Control?",
      panelType: 'none',
      source: 'local_knowledge_engine',
      suggestedPrompts: ['Show upcoming events', 'Inspect student payloads', 'Leadership directory', 'Initiate membership']
    };
  }

  private getGenericSuggestions(): string[] {
    return ['Upcoming events', '5 Technical domains', 'Meet our crew', 'How to join ACM'];
  }
}

export const ariaIntelligence = new AriaIntelligenceEngine();
