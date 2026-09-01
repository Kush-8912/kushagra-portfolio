export const socials = {
  github: "https://github.com/Kush-8912",
  linkedin: "https://www.linkedin.com/in/kushagra-aggarwal-b58a31378/",
  email: "kushagraaggarwal76@gmail.com",
  instagram: "https://www.instagram.com/kushagra_891200/",
  x: "https://x.com/Kushagra8912",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  link?: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "claribb-ai",
    name: "Claribb.AI",
    tagline: "Multi-agent research workspace with persistent memory",
    description:
      "A two-person AI research workspace that maintains persistent semantic memory across sessions and runs four specialised agents in parallel on every query.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    highlights: [
      "Recall · Explorer · Critique · Connector agents run in parallel per query",
      "Landing, pricing, and dashboard shell built with Framer Motion transitions",
      "Workspace panels stream live agent output over Server-Sent Events",
      "Interactive knowledge graph auto-extracts concepts and relationships",
    ],
    link: "https://claribb-ai-one.vercel.app",
    color: "#8b5cf6",
  },
  {
    slug: "safarsang",
    name: "SafarSang",
    tagline: "AI-generated trip planning, from prompt to itinerary",
    description:
      "A trip planning platform that consolidates itinerary, budgets, documents, packing, and risk tracking into a single dashboard — replacing the scattered chats and spreadsheets travellers usually rely on.",
    stack: ["React", "Vite", "Firebase", "Firestore", "Groq API"],
    highlights: [
      "Groq API (Llama 3.1) generates full multi-day itineraries from one prompt",
      "Seven modular features: Budget Splitter, Document Vault, Risk Flags, and more",
      "Firebase auth with email/password + Google sign-in, protected routing",
      "Context API, custom hooks, and lazy loading for code-splitting",
    ],
    link: "https://safar-sang.vercel.app",
    color: "#22d3ee",
  },
  {
    slug: "handy",
    name: "Handy",
    tagline: "Real-time gesture recognition with an on-device LLM",
    description:
      "An Android app that recognises 13 hand gestures in real time from the camera feed and translates a sequence of signs into natural English — running fully on-device with no network dependency.",
    stack: ["Kotlin", "Jetpack Compose", "MediaPipe", "Gemma 3n"],
    highlights: [
      "6 custom gesture detectors extend MediaPipe's 7 built-ins via raw landmarks",
      "4-frame stability filter suppresses false gesture commits",
      "Gemma 3n E2B (INT4) runs a two-pass pipeline: translate, then suggest replies",
      "Live hand-skeleton overlay, haptics, and text-to-speech in Jetpack Compose",
    ],
    color: "#f472b6",
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  status: "active" | "done";
};

export const timeline: TimelineEntry[] = [
  {
    period: "2025 — 2029",
    title: "Computer Science & AI",
    place: "Scaler School of Technology, Bengaluru",
    status: "active",
  },
  {
    period: "2025 — 2028",
    title: "BSc. Computer Science",
    place: "BITS Pilani",
    status: "active",
  },
  {
    period: "2023 — 2025",
    title: "Senior Secondary",
    place: "S.G.N. Public School",
    status: "done",
  },
  {
    period: "2016 — 2022",
    title: "Secondary Schooling",
    place: "Apeejay School, Pitampura",
    status: "done",
  },
];

export const skills = [
  "Python", "Java", "JavaScript", "TypeScript", "SQL",
  "React", "Next.js", "Tailwind CSS", "Node.js",
  "Firebase", "Supabase", "MediaPipe", "Vite",
  "Git", "Vercel", "NumPy", "Pandas",
];

export const achievements = [
  "Top 6 teams — Speed Run Hackathon, Scaler School of Technology",
  "Selected as 1 of 80 builders — iQOO Hackathon 2026, a 30-hour AI build sprint",
];

export const bio =
  "Kushagra Aggarwal. 19, from Delhi. Studying Computer Science & AI at Scaler School of Technology, Bengaluru. Curious by default, building by habit.";
