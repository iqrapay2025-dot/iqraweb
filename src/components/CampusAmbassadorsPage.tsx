import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IslamicPattern } from "./IslamicPattern";

import { useLanguage } from "../contexts/LanguageContext";
import toh11Photo from "../assets/ambassador-toh11.jpeg";
import aki18Photo from "../assets/ambassador-aki18.jpeg";
import ade06Photo from "../assets/ambassador-ade06.jpeg";
import law19Photo from "../assets/951948440012770967.jpeg";
import sekinahPhoto from "../assets/ambassador-sekinah.jpeg";
import balikisPhoto from "../assets/ambassador-balikis.jpeg";
import far21Photo from "../assets/download (5).jpeg";
import ssa23Photo from "../assets/🌙 Covered with Dignity, Blessed with Iman🖤🌷.jpeg";
// Locally-imported uploads reused (cycled) across the cards that don't have a
// dedicated photo. (Remote hot-links were avoided so the images reliably render.)
import campus1 from "../assets/campus-photo-1.jpg";
import campus2 from "../assets/campus-photo-2.jpg";
import campus3 from "../assets/campus-photo-3.jpg";
import campus4 from "../assets/campus-photo-4.jpg";
import campus5 from "../assets/campus-photo-5.jpg";
import campus6 from "../assets/campus-photo-6.jpg";

interface CampusAmbassadorsPageProps {
  onNavigate?: (page: string) => void;
}

// Brand palette (per brief)
const DEEP_TEAL = "#009688";
const COCOA = "#2D0A02";
const CREAM = "#fff9c4";

const AMBASSADORS = [
  { name: "Olahan Khadijah", school: "University of Lagos", code: "IQP-OLK01" },
  {
    name: "Firdaous Ismail",
    school: "Lagos State University",
    code: "IQP-FIR02",
  },
  {
    name: "Sanni Faatimah Omotoyosi",
    school: "University of Ilorin",
    code: "IQP-SAN03",
  },
  {
    name: "Zaynab Adenike Hassan",
    school: "University of Lagos",
    code: "IQP-ZAY04",
  },
  {
    name: "Maimunah Mustapha",
    school: "University of Ilorin",
    code: "IQP-MAI05",
  },
  { name: "Adewuyi Abdulgafar", school: "FUHSI", code: "IQP-ADE06" },
  {
    name: "Hadiyyatullaah Ajibola",
    school: "University of Medical Sciences, Ondo",
    code: "IQP-HAD07",
  },
  {
    name: "Khadijah Adeniran",
    school: "College of Medicine UNILAG",
    code: "IQP-KHA08",
  },
  {
    name: "Rofiah Abdulganiyu",
    school: "College of Nursing Science NOH Igbobi",
    code: "IQP-ROF09",
  },
  {
    name: "Kamaldeen Uswat Hassanat",
    school: "Abiola Ajimobi Technical University",
    code: "IQP-KAM10",
  },
  {
    name: "Toheeb Ayomide Lawal",
    school: "Kwara State University, Malete",
    code: "IQP-TOH11",
  },
  { name: "Rodiyya Ismail", school: "University of Ilorin", code: "IQP-ROD12" },
  {
    name: "Sheu Salamot",
    school: "College of Nursing Sciences Eleyele Ibadan",
    code: "IQP-SHE13",
  },
  {
    name: "Abdulkareem Rodiyah Kehinde",
    school: "Lagos State University of Education",
    code: "IQP-ABD14",
  },
  {
    name: "Kareem Rokibah",
    school: "Lagos State University of Education",
    code: "IQP-KAR15",
  },
  {
    name: "Aderinoye Suliyat",
    school: "University of Ilorin",
    code: "IQP-ADR16",
  },
  {
    name: "Zainab MuhammadAwwal",
    school: "University of Ilorin",
    code: "IQP-ZAM17",
  },
  {
    name: "Akindele Abdur-Rahman Ayomide",
    school: "Adekunle Ajasin University Akungba",
    code: "IQP-AKI18",
  },
  {
    name: "Lawal Fawaz",
    school: "University of Lagos State Science and Technology",
    code: "IQP-LAW19",
  },
  {
    name: "Adebayo Sekinah Asabi",
    school: "University of Ibadan",
    code: "IQP-SEK20",
  },
  {
    name: "Amidu Balikis Omotoyosi",
    school: "University of Ilorin",
    code: "IQP-BAL21",
  },
  {
    name: "Sulayman Faridah Kehinde",
    school: "University of Ilorin",
    code: "IQP-FAR22",
  },
  {
    name: "Sanni Suliat Adeshubomi",
    school: "Federal University of Agriculture, Abeokuta",
    code: "IQP-SSA23",
  },
];

// Placeholder portrait photos for the carousel cards (one per ambassador,
// in the same order). Swap these for real ambassador photos at any time.
const STOCK_PHOTOS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop",
];

// Local campus photos cycled across cards that don't have a dedicated
// upload. They're explicitly assigned to the first batch of cards below; any
// card WITHOUT a mapped photo automatically cycles through this set so it
// still shows a real image. Kept as local imports (no remote hot-links) so
// every visitor sees the same photos reliably.
const AMBASSADOR_IMAGES = [
  campus1,
  campus2,
  campus3,
  campus4,
  campus5,
  campus6,
];

// Real ambassador photos, keyed by referral code. These override the stock
// images for matching cards. Any card WITHOUT a mapping falls back to the
// cycling local set (see photoForCard below) — never an out-of-bounds value.
const AMBASSADOR_PHOTOS: Record<string, string> = {
  "IQP-TOH11": toh11Photo,
  "IQP-AKI18": aki18Photo,
  "IQP-ADE06": ade06Photo,
  "IQP-OLK01": AMBASSADOR_IMAGES[0],
  "IQP-FIR02": AMBASSADOR_IMAGES[1],
  "IQP-SAN03": AMBASSADOR_IMAGES[2],
  "IQP-ZAY04": AMBASSADOR_IMAGES[3],
  "IQP-MAI05": AMBASSADOR_IMAGES[4],
  "IQP-HAD07": AMBASSADOR_IMAGES[5],
  "IQP-LAW19": law19Photo,
  "IQP-SEK20": sekinahPhoto,
  "IQP-BAL21": balikisPhoto,
  "IQP-FAR21": far21Photo,
  "IQP-SSA23": ssa23Photo,
};

const STATS = [
  { value: "23", key: "campusPage.statAmbassadors" },
  { value: "14", key: "campusPage.statSchools" },
  { value: "1", key: "campusPage.statMission" },
];

// Published CSV export of the weekly leaderboard sheet.
// If this ever returns a 404, re-paste the sheet's "Publish to the web"
// CSV link here — the section then degrades to the fallback message.
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT06PfG2nQYj3CghPSOrOlc-rZ_yUCfVYKDI3ldeIvC6eOL7sfM1exxY5YB3-QNflgaLpr31Gawqipu/pub?gid=772222314&single=true&output=csv";

interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  code: string;
  posts: string;
  referrals: string;
  total: number;
  photo: string | null;
}

// Two-letter initials, shown only when an ambassador has no matched portrait.
function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Rank accent cycle for the avatar rings: 1st = gold, 2nd = teal, 3rd = cocoa
// (repeats for lower ranks). The rank-number badges reuse the original cycle
// (teal / cocoa / gold) to stay consistent with the rest of the page.
const RING_CLASS = ["gold", "teal", "cocoa"] as const;
const RING_HEX: Record<(typeof RING_CLASS)[number], string> = {
  gold: "#C8922B",
  teal: "#009688",
  cocoa: "#2D0A02",
};
function ringForRank(rank: number): (typeof RING_CLASS)[number] {
  return RING_CLASS[(rank - 1) % 3];
}

// Resolve the exact portrait shown on the ambassador card for a referral code,
// so every leaderboard circle displays the same image as its card.
function photoForCode(code: string): string | null {
  const idx = AMBASSADORS.findIndex((a) => a.code === code);
  if (idx < 0) return null;
  return photoForCard(code, idx);
}

// Bounds-safe portrait for both the carousel cards and the leaderboard.
// An explicit mapping (by referral code) wins; otherwise a stable local photo
// is cycled. Every fallback is length-guarded, so adding ambassadors or
// swapping the photo set never yields a missing `src`.
function photoForCard(code: string, index: number): string | null {
  if (code) {
    const mapped = AMBASSADOR_PHOTOS[code];
    if (mapped) return mapped;
  }
  const safeIndex = Math.abs(index);
  if (AMBASSADOR_IMAGES.length > 0) {
    const campus = AMBASSADOR_IMAGES[safeIndex % AMBASSADOR_IMAGES.length];
    if (campus) return campus;
  }
  if (STOCK_PHOTOS.length > 0) {
    return STOCK_PHOTOS[safeIndex % STOCK_PHOTOS.length] ?? null;
  }
  return null;
}

// ——— Leaderboard fetch cache ———
// The published CSV is refetched on a fixed interval and again whenever the
// window regains focus. A thin in-memory guard stops rapid focus events from
// fanning out concurrent requests to the same URL, and reuses a recent result
// instead of re-parsing it (fewer hits, no redundant work for a static sheet).
const LEADERBOARD_TTL_MS = 15_000;
let leaderboardCache: {
  url: string;
  timestamp: number;
  data: LeaderboardEntry[] | null;
  inFlight: boolean;
} | null = null;

const LEADERBOARD_CSS = `
    .iqrapay-leaderboard {
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    max-width: 840px;
    margin: 0 auto;
    padding: 0 8px;
  }
  .lb-empty,
  .lb-loading {
    text-align: center;
    color: #6b6b6b;
    padding: 2.5rem 1rem;
    font-size: 15px;
  }

  /* ===== Podium (top 3) ===== */
  .leaderboard-content {
    width: 100%;
  }
  .podium-row {
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 22px;
    margin: 12px auto 18px;
    max-width: 660px;
  }
  .podium-spot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  /* Stepped platform under each avatar: 1st tallest, then 2nd, then 3rd. */
  .podium-step {
    width: 130px;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(180deg, #ececec 0%, #c8c4bf 100%);
  }
  .podium-spot.first  .podium-step { height: 48px; }
  .podium-spot.second .podium-step { height: 32px; }
  .podium-spot.third  .podium-step { height: 18px; }

  .avatar-ring {
    --ring: #aeb2b0;
    --ring-w: 6px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: var(--ring);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
  }
  .podium-spot.first .avatar-ring {
    width: 108px;
    height: 108px;
    --ring-w: 7px;
  }
  .avatar-ring.gold   { --ring: #C8922B; }
  .avatar-ring.teal  { --ring: #009688; }
  .avatar-ring.cocoa { --ring: #2D0A02; }
  .avatar-ring img {
    width: calc(100% - var(--ring-w));
    height: calc(100% - var(--ring-w));
    object-fit: cover;
    object-position: center top;
    border-radius: 50%;
    display: block;
  }
  .avatar-ring .init {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 1px;
    color: #ffffff;
  }

  .crown {
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 26px;
    color: #C8922B;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.18));
    animation: crown-bob 2.4s ease-in-out infinite;
    z-index: 2;
  }
  .podium-spot.first .crown {
    font-size: 28px;
    top: -13px;
  }
  @keyframes crown-bob {
    0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.92; }
    50% { transform: translate(-50%, -3px) scale(1.14); opacity: 1; }
  }

  .p-name {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #0f0f0f;
    text-align: center;
    white-space: nowrap;
  }
  .p-xp {
    font-size: 13px;
    font-weight: 600;
    color: #4b5563;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 5px;
    /* Keep the full "posts · referrals · points" line on one row when
       there is room, but let it wrap onto a second line instead of
       clipping/overflowing when space runs out. */
    white-space: normal;
    line-height: 1.35;
    max-width: 100%;
    min-width: 0;
  }
  .podium-base {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.6px;
    color: #6b6b6b;
  }
    /* ===== Full ranking list ===== */
  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    max-width: 660px;
    margin: 0 auto;
  }
  .rank-row {
    display: flex;
    align-items: center;
    gap: 13px;
    background: #ffffff;
    border: 1px solid #ececec;
    border-radius: 12px;
    padding: 10px 14px;
    box-shadow: 0 1px 6px rgba(45, 10, 2, 0.04);
    transition: box-shadow 0.18s ease;
  }
  .rank-row:hover {
    box-shadow: 0 8px 20px rgba(45, 10, 2, 0.08);
  }
  .r-num {
    --bg: #9da3a0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #ffffff;
    background: var(--bg);
    flex-shrink: 0;
  }
  .rank-1 .r-num { --bg: ${DEEP_TEAL}; }    /* teal */
  .rank-2 .r-num { --bg: ${COCOA}; }       /* cocoa */
  .rank-3 .r-num { --bg: ${RING_HEX.gold}; } /* gold */
  .r-avatar {
    --ring: #aeb2b0;
    --ring-w: 2px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--ring);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .r-avatar.gold   { --ring: ${RING_HEX.gold}; }
  .r-avatar.teal  { --ring: ${RING_HEX.teal}; }
  .r-avatar.cocoa { --ring: ${RING_HEX.cocoa}; }
  .r-avatar img {
    width: calc(100% - var(--ring-w));
    height: calc(100% - var(--ring-w));
    object-fit: cover;
    object-position: center top;
    border-radius: 50%;
    display: block;
  }
  .r-avatar .init {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: #ffffff;
  }
  .r-info {
    flex: 1 1 auto;
    min-width: 0;
  }
  .r-name {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #0f0f0f;
    /* Long names wrap instead of bleeding into the stats column. */
    overflow-wrap: anywhere;
  }
  .r-school {
    font-size: 12px;
    color: #6b6b6b;
    margin-top: 1px;
    overflow-wrap: anywhere;
  }
  .r-xp {
    font-weight: 600;
    font-size: 13px;
    color: #0f0f0f;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    gap: 4px;
    /* Let the longer "posts · referrals · points" line wrap onto further
       lines instead of forcing the name column off-screen. min-width: 0
       lets this flex item shrink so wrapped text breaks cleanly. */
    white-space: normal;
    line-height: 1.35;
    flex-shrink: 1;
    min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .crown { animation: none; }
    .rank-row { transition: none; }
  }

  @media (max-width: 639px) {
    /* — Responsive podium —
       Each spot is pinned to exactly one third of the row (minus the gap),
       so the trio can never overflow the container or drift off-centre on
       narrow viewports. Steps and rings scale fluidly below their desktop
       caps instead of using fixed pixel widths. */
    .iqrapay-leaderboard { padding: 0 4px; }
    .podium-row {
      gap: clamp(6px, 2.5vw, 14px);
      max-width: 100%;
    }
    .podium-spot {
      flex: 1 1 0;
      min-width: 0;
      max-width: calc((100% - 2 * clamp(6px, 2.5vw, 14px)) / 3);
    }
    .podium-step {
      width: 100%;
      max-width: 110px;
    }
    .avatar-ring {
      width: clamp(58px, 20vw, 78px);
      height: clamp(58px, 20vw, 78px);
    }
    .podium-spot.first .avatar-ring {
      width: clamp(70px, 24vw, 94px);
      height: clamp(70px, 24vw, 94px);
    }
    .podium-spot.first  .podium-step { height: 36px; }
    .podium-spot.second .podium-step { height: 24px; }
    .podium-spot.third  .podium-step { height: 12px; }
    .crown { font-size: 18px; top: -8px; }
    .podium-spot.first .crown { font-size: 20px; top: -9px; }
    /* Long names ellipsize inside their spot instead of stretching the
       podium past the screen edge (base rule keeps white-space: nowrap). */
    .p-name {
      font-size: clamp(11.5px, 3.4vw, 14px);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .p-xp {
      font-size: clamp(10px, 2.9vw, 12px);
      /* Wrap onto a second line on mobile rather than clipping/overflowing,
         and keep the wrapped text centred under the avatar. */
      white-space: normal;
      line-height: 1.4;
      justify-content: center;
      text-align: center;
      max-width: 100%;
    }

    /* — Rank rows —
       Tighten the chrome so the name/school column keeps room to breathe
       next to the XP badge on small screens. */
    .rank-row { gap: 9px; padding: 9px 10px; }
    .r-num { width: 26px; height: 26px; font-size: 12px; }
    .r-avatar { width: 32px; height: 32px; }
    .r-xp { font-size: 11.5px; gap: 3px; white-space: normal; line-height: 1.4; justify-content: flex-end; text-align: right; }
  }

  /* Very narrow phones: shrink the podium further so nothing ever clips. */
  @media (max-width: 360px) {
    .podium-row { gap: 5px; }
    .podium-step { max-width: none; }
    .avatar-ring { width: 54px; height: 54px; }
    .podium-spot.first .avatar-ring { width: 66px; height: 66px; }
    .p-xp { font-size: clamp(8.5px,  2.7vw, 10px); }
  }
`;

const CAROUSEL_CSS = `
  .ambassador-carousel {
    position: relative;
    max-width: 1140px;
    margin: 0 auto;
  }
  .ambassador-track {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 8px 4px 12px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .ambassador-track::-webkit-scrollbar {
    display: none;
  }
  .ambassador-card {
    flex: 0 0 auto;
    width: 270px;
    scroll-snap-align: start;
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ececec;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  .ambassador-card .photo {
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: center;
    display: block;
    background-color: #e0f2f1;
  }
  .ambassador-card .card-body {
    padding: 22px 22px 24px;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  }
  .ambassador-card .quote-mark {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 38px;
    color: #009688;
    line-height: 1;
    margin-bottom: 8px;
    display: block;
    font-weight: 700;
  }
  .ambassador-card .code {
    font-size: 12.5px;
    color: #0f0f0f;
    line-height: 1.5;
    margin: 0 0 16px;
  }
  .ambassador-card .code strong {
    font-weight: 700;
  }
  .ambassador-card .name {
    margin: 0;
    font-size: 13px;
    color: #6b6b6b;
    border-top: 1px solid #f0f0f0;
    padding-top: 14px;
  }
  .ambassador-card .name strong {
    color: #0f0f0f;
    font-weight: 700;
  }
  .ambassador-ctrls {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 32px;
  }
  .ambassador-ctrl-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid #dddddd;
    background: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s, border-color 0.15s;
  }
  .ambassador-ctrl-btn:hover {
    background: #009688;
    border-color: #009688;
  }
  .ambassador-ctrl-btn:hover svg path {
    stroke: #ffffff;
  }
  .ambassador-ctrl-btn svg path {
    stroke: ${COCOA};
    transition: stroke 0.15s;
  }
  .ambassador-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  .ambassador-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #dadada;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: width 0.2s, background 0.2s, border-radius 0.2s;
  }
  .ambassador-dot.active {
    background: #009688;
    width: 18px;
    border-radius: 3px;
  }
  @media (max-width: 639px) {
    .ambassador-card .photo {
      height: 200px;
    }
    .ambassador-card .card-body {
      padding: 18px 18px 20px;
    }
    .ambassador-card .quote-mark {
      font-size: 32px;
    }
    .ambassador-card .code {
      font-size: 12px;
    }
    .ambassador-ctrls {
      margin-top: 24px;
    }
    .ambassador-ctrl-btn {
      width: 42px;
      height: 42px;
    }
  }
`;

// Dark-theme overrides for the Campus Ambassadors page.
// The page is driven by the global `.dark` class (toggled in App.tsx), so
// these rules only take effect when dark mode is active. Neutrals reference the
// theme variables defined in globals.css (already dark-aware) and the brand
// teal / cocoa map to the dark-aware --primary / --secondary. Gold is left
// untouched — it reads well on dark surfaces. These overrides are rendered
// AFTER the page's own style blocks so cascade order resolves correctly, and
// the rank-specific rules use higher specificity than the blanket ones so the
// 1st (teal) / 2nd (cocoa) / 3rd (gold) badge colours are preserved.
const DARK_MODE_CSS = `
  /* ===== Hero / stats ===== */
  .dark .hero .badge {
    border-color: rgba(216, 165, 2, 0.28);
    background: rgba(216, 165, 2, 0.13);
    color: #fbbf24;
  }
  .dark .hero h1 { color: var(--foreground); }
  .dark .hero h1 .accent { color: var(--primary); }
  .dark .hero .lede { color: var(--muted-foreground); }
  .dark .stat-pill {
    background: rgba(0, 171, 171, 0.14);
    color: var(--primary);
  }
  .dark .stat-pill .num { color: var(--primary); }

  /* ===== Ambassador carousel ===== */
  .dark .ambassador-card {
    background: var(--card);
    border-color: var(--border);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.34);
  }
  .dark .ambassador-card .photo { background-color: rgba(0, 171, 171, 0.15); }
  .dark .ambassador-card .quote-mark { color: var(--primary); }
  .dark .ambassador-card .code { color: var(--foreground); }
  .dark .ambassador-card .name {
    color: var(--muted-foreground);
    border-top-color: var(--border);
  }
  .dark .ambassador-card .name strong { color: var(--foreground); }
  .dark .ambassador-ctrl-btn {
    border-color: var(--border);
    background: var(--card);
  }
  .dark .ambassador-ctrl-btn svg path { stroke: var(--foreground); }
  .dark .ambassador-dot { background: rgba(255, 255, 255, 0.3); }
  .dark .ambassador-dot.active { background: var(--primary); }

  /* ===== Leaderboard ===== */
  .dark .lb-empty,
  .dark .lb-loading { color: var(--muted-foreground); }
  .dark .podium-step {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%);
  }
  .dark .avatar-ring { --ring: #6b7280; }
  .dark .avatar-ring.gold   { --ring: #C8922B; }
  .dark .avatar-ring.teal   { --ring: var(--primary); }
  .dark .avatar-ring.cocoa  { --ring: var(--secondary); }
  .dark .crown { filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.55)); }
  .dark .p-name { color: var(--foreground); }
  .dark .p-xp { color: var(--muted-foreground); }
  .dark .podium-base { color: var(--muted-foreground); }
  .dark .rank-row {
    background: var(--card);
    border-color: var(--border);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.32);
  }
  .dark .rank-row:hover { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); }
  .dark .r-num { --bg: #6b7280; }
  .dark .rank-1 .r-num { --bg: var(--primary); }
  .dark .rank-2 .r-num { --bg: var(--secondary); }
  .dark .rank-3 .r-num { --bg: #C8922B; }
  .dark .r-avatar { --ring: #6b7280; }
  .dark .r-avatar.gold   { --ring: #C8922B; }
  .dark .r-avatar.teal   { --ring: var(--primary); }
  .dark .r-avatar.cocoa  { --ring: var(--secondary); }
  .dark .r-name { color: var(--foreground); }
  .dark .r-school { color: var(--muted-foreground); }
  .dark .r-xp { color: var(--foreground); }
`;

const HERO_CSS = `
  .hero {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    padding: 0 24px;
    margin-bottom: 56px;
  }
  .hero .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid #EADFC8;
    background: #FBF6EA;
    color: #B9862A;
    font-size: 13px;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 100px;
    margin-bottom: 26px;
    white-space: nowrap;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  }
  .hero h1 {
    font-family: "Utendo", "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 52px;
    line-height: 1.12;
    margin: 0 0 22px;
    color: #0f0f0f;
    letter-spacing: -1.2px;
  }
  .hero h1 .accent {
    color: #009688;
  }
  .hero .lede {
    max-width: 560px;
    margin: 0 auto 12px;
    color: #6b6b6b;
    font-size: 16px;
    line-height: 1.6;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  }
  .stats-row {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin: 36px auto 20px;
    flex-wrap: wrap;
  }
  .stat-pill {
    background: #e3f4f2;
    color: #009688;
    border-radius: 14px;
    padding: 18px 30px;
    text-align: center;
    min-width: 130px;
  }
  .stat-pill .num {
    font-family: "Utendo", "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: #009688;
    line-height: 1.1;
  }
  .stat-pill .label {
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    color: #009688;
    opacity: 0.85;
    margin-top: 2px;
  }
  @media (max-width: 639px) {
    .hero {
      padding: 6px 8px 0;
      margin-bottom: 40px;
    }
    .hero h1 {
      font-size: clamp(30px, 8.5vw, 36px);
      letter-spacing: -0.6px;
      margin-bottom: 16px;
    }
    .hero .badge {
      font-size: 12px;
      margin-bottom: 18px;
    }
    .hero .lede {
      font-size: 15.5px;
    }
    .stats-row {
      gap: 10px;
      margin-top: 30px;
    }
    .stat-pill {
      min-width: 88px;
      padding: 14px 18px;
    }
    .stat-pill .num {
      font-size: 22px;
    }
    .stat-pill .label {
      font-size: 12px;
    }
  }
`;

function LeaderboardContent({
  leaderboard,
}: {
  leaderboard: LeaderboardEntry[];
}) {
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  // Podium shows 2nd • 1st • 3rd (champion in the centre).
  const podiumOrder: ReadonlyArray<number> = [1, 0, 2];
  const podiumSlot: ReadonlyArray<string> = ["second", "first", "third"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: reduced ? 0 : 0.1 },
    },
  };
  const podiumItem = {
    hidden: { opacity: 0, y: 26, scale: 0.84 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
  };
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: reduced ? 0 : 0.5 },
    },
  };
  const listItem = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <div className="leaderboard-content">
      <motion.div
        className="podium-row"
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "show"}
      >
        {podiumOrder.map((dataIdx, slotIdx) => {
          const a = leaderboard[dataIdx];
          if (!a) return null;
          const ring = ringForRank(a.rank);
          const isFirst = a.rank === 1;
          const label =
            a.rank === 1
              ? t("campusPage.first")
              : a.rank === 2
                ? t("campusPage.second")
                : t("campusPage.third");
          return (
            <motion.div
              className={`podium-spot ${podiumSlot[slotIdx]}`}
              key={`pod-${a.rank}`}
              variants={reduced ? undefined : podiumItem}
              whileHover={reduced ? undefined : { scale: 1.08 }}
            >
              <div className={`avatar-ring ${ring}`}>
                {a.photo ? (
                  <img src={a.photo} alt={a.name} loading="eager" />
                ) : (
                  <span className="init">{initials(a.name)}</span>
                )}
                {isFirst && (
                  <i
                    className="fas fa-crown crown"
                    role="img"
                    aria-label={t("campusPage.champion")}
                    title={`${a.name} — ${t("campusPage.first")}`}
                  />
                )}
              </div>
              <div className="podium-step" aria-hidden="true" />
              <div className="p-name">{a.name}</div>
              <div className="p-xp">
                <i className="fas fa-star" aria-hidden="true" />
                {a.posts} {t("campusPage.posts")} · {a.referrals}{" "}
                {t("campusPage.referrals")} · {a.total} {t("campusPage.points")}
              </div>
              <div className="podium-base">{label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="rank-list"
        variants={reduced ? undefined : listContainer}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "show"}
      >
        {leaderboard.map((a) => {
          const ring = ringForRank(a.rank);
          return (
            <motion.div
              className={`rank-row rank-${a.rank}`}
              key={a.code || `row-${a.rank}`}
              variants={reduced ? undefined : listItem}
              whileHover={reduced ? undefined : { x: 6 }}
            >
              <div className="r-num">{a.rank}</div>
              <div className={`r-avatar ${ring}`}>
                {a.photo ? (
                  <img src={a.photo} alt={a.name} loading="lazy" />
                ) : (
                  <span className="init">{initials(a.name)}</span>
                )}
              </div>
              <div className="r-info">
                <div className="r-name">{a.name}</div>
                <div className="r-school">{a.school}</div>
              </div>
              <div className="r-xp">
                <i className="fas fa-star" aria-hidden="true" />
                {a.posts} {t("campusPage.posts")} · {a.referrals}{" "}
                {t("campusPage.referrals")} · {a.total} {t("campusPage.points")}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function CampusAmbassadorsPage({
  onNavigate,
}: CampusAmbassadorsPageProps) {
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(
    null,
  );
  // Remembers the data instance the leaderboard UI is currently showing, so
  // TTL cache hits don't replay the same animation on every focus event.
  const appliedLeaderboardRef = useRef<LeaderboardEntry[] | null>(null);

  // Load the weekly leaderboard from the published Google Sheet.
  useEffect(() => {
    let cancelled = false;
    async function loadLeaderboard() {
      const now = Date.now();

      // Reuse a freshly fetched result instead of re-hitting the CSV. This
      // stops rapid focus / repeat events from fanning out duplicate requests
      // to the same URL (and avoids re-parsing a static sheet).
      if (
        leaderboardCache &&
        leaderboardCache.url === SHEET_URL &&
        now - leaderboardCache.timestamp < LEADERBOARD_TTL_MS &&
        leaderboardCache.data
      ) {
        if (
          !cancelled &&
          appliedLeaderboardRef.current !== leaderboardCache.data
        ) {
          appliedLeaderboardRef.current = leaderboardCache.data;
          setLeaderboard(leaderboardCache.data);
        }
        return;
      }

      // Never stack concurrent fetches for the same URL. While one is in
      // flight, later calls reuse the last-known value until it lands.
      if (leaderboardCache?.inFlight) return;

      leaderboardCache = {
        url: SHEET_URL,
        timestamp: now,
        data: leaderboardCache?.data ?? null,
        inFlight: true,
      };

      try {
        const response = await fetch(SHEET_URL);
        const csv = await response.text();
        const rows = csv.trim().split("\n").slice(1);

        const data: LeaderboardEntry[] = rows
          .map((row) => {
            const cols = row.split(",");
            const code = cols[3]?.trim() || "";
            const name = cols[1]?.trim() || "—";
            const posts = parseInt(cols[4], 10) || 0;
            const referrals = parseInt(cols[5], 10) || 0;
            return {
              rank: 0, // assigned after sorting below
              name,
              school: cols[2]?.trim() || "—",
              code,
              posts: String(posts),
              referrals: String(referrals),
              total: posts + referrals,
              photo: code ? photoForCode(code) : null,
            };
          })
          // Drop blank/placeholder rows (e.g. the trailing editor note).
          .filter((a) => a.name && a.name !== "—")
          // Rank by combined score (posts + referrals); ties broken by posts.
          .sort((a, b) => {
            if (b.total !== a.total) return b.total - a.total;
            return parseInt(b.posts, 10) - parseInt(a.posts, 10);
          })
          .map((a, index) => ({ ...a, rank: index + 1 }));

        leaderboardCache = {
          url: SHEET_URL,
          timestamp: Date.now(),
          data,
          inFlight: false,
        };
        if (!cancelled) {
          appliedLeaderboardRef.current = data;
          setLeaderboard(data);
        }
      } catch (error) {
        console.error("Leaderboard error:", error);
        leaderboardCache = {
          url: SHEET_URL,
          timestamp: Date.now(),
          data: null,
          inFlight: false,
        };
        if (!cancelled) setLeaderboard([]);
      }
    }

    void loadLeaderboard();
    // Re-read the sheet every minute and on window focus so this section
    // always reflects the published CSV (the sheet is republished every Monday).
    const interval = window.setInterval(() => {
      void loadLeaderboard();
    }, 60000);
    const onFocus = () => {
      void loadLeaderboard();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // ——— Campus Ambassador carousel ———
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const CARD_STEP = 270 + 24; // card width + track gap
  const AUTO_PLAY_DELAY = 4500; // ms between auto-swipes (not too fast)

  const scrollCarousel = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * CARD_STEP, behavior: "smooth" });
  };

  const handleCarouselScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / CARD_STEP);
    setActiveCard(Math.max(0, Math.min(AMBASSADORS.length - 1, idx)));
  };

  const handleDotClick = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * CARD_STEP, behavior: "smooth" });
  };

  // ——— Auto-swipe ———
  const autoplayPausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Respect the user's reduced-motion preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (autoplayPausedRef.current) return;
      const currentIndex = Math.round(track.scrollLeft / CARD_STEP);
      const nextIndex = (currentIndex + 1) % AMBASSADORS.length;
      const wrapsToStart = nextIndex === 0 && currentIndex !== 0;
      track.scrollTo({
        left: nextIndex * CARD_STEP,
        // Instant reset when looping back to the first card, smooth otherwise.
        behavior: wrapsToStart ? "auto" : "smooth",
      });
    }, AUTO_PLAY_DELAY);

    return () => window.clearInterval(id);
  }, []);

  const pauseAutoplay = () => {
    autoplayPausedRef.current = true;
  };

  const resumeAutoplay = () => {
    autoplayPausedRef.current = false;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* ===== Section 1 — Our Campus Ambassadors ===== */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-14 sm:pb-20 bg-[#F9F9F9] dark:bg-background overflow-hidden">
        <IslamicPattern />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* ===== Hero ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero"
          >
            <div className="badge">
              <span aria-hidden="true"></span>
              {t("campusPage.badge")}
            </div>
            <h1>
              {t("campusPage.title1")} <br className="hidden sm:block" />
              {t("campusPage.title2Before")}
              <span className="accent">{t("campusPage.title2Accent")}</span>
              {t("campusPage.title2After")}
            </h1>
            <p className="lede">{t("campusPage.subtitle1")}</p>
            <p className="lede">{t("campusPage.subtitle2")}</p>

            {/* Stats — pills beside each other */}
            <div className="stats-row">
              {STATS.map((stat) => (
                <div className="stat-pill" key={stat.key}>
                  <div className="num">{stat.value}</div>
                  <div className="label">{t(stat.key)}</div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Ambassador carousel — swipable cards with arrows + dots */}
          <div className="ambassador-carousel">
            <div
              className="ambassador-track"
              ref={trackRef}
              onScroll={handleCarouselScroll}
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              onPointerDown={pauseAutoplay}
              onPointerUp={resumeAutoplay}
              onPointerLeave={resumeAutoplay}
            >
              {AMBASSADORS.map((ambassador, index) => (
                <div className="ambassador-card" key={ambassador.code}>
                  <img
                    className="photo"
                    src={photoForCard(ambassador.code, index) || undefined}
                    alt={ambassador.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <span className="quote-mark">“</span>
                    <p className="code">
                      {t("campusPage.cardBefore")}{" "}
                      <strong>{ambassador.school}</strong>.{" "}
                      {t("campusPage.cardAfter")}
                    </p>
                    <div className="name">
                      — <strong>{ambassador.name}</strong>, {ambassador.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ambassador-ctrls">
              <button
                type="button"
                className="ambassador-ctrl-btn"
                onClick={() => scrollCarousel(-1)}
                aria-label={t("campusPage.prevAmbassadors")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="ambassador-ctrl-btn"
                onClick={() => scrollCarousel(1)}
                aria-label={t("campusPage.nextAmbassadors")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="ambassador-dots">
              {AMBASSADORS.map((ambassador, index) => (
                <button
                  key={ambassador.code}
                  type="button"
                  className={`ambassador-dot${
                    index === activeCard ? " active" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`${t("campusPage.goTo")} ${ambassador.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2 — Leaderboard ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="font-display font-bold text-[#2D0A02] dark:text-foreground text-3xl sm:text-4xl mb-4">
              {t("campusPage.leaderboardTitle")}
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              {t("campusPage.leaderboardSubtitle")}
            </p>
          </div>

          <div id="iqrapay-leaderboard" className="iqrapay-leaderboard">
            {leaderboard === null && (
              <p className="lb-loading">{t("campusPage.loading")}</p>
            )}
            {leaderboard !== null && leaderboard.length === 0 && (
              <p className="lb-empty">{t("campusPage.empty")}</p>
            )}
            {leaderboard !== null && leaderboard.length > 0 && (
              <LeaderboardContent leaderboard={leaderboard} />
            )}
          </div>
        </div>
      </section>

      <style>{LEADERBOARD_CSS}</style>
      <style>{HERO_CSS}</style>
      <style>{CAROUSEL_CSS}</style>
      <style>{DARK_MODE_CSS}</style>
    </div>
  );
}
