import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IslamicPattern } from "./IslamicPattern";
import { Footer } from "./Footer";
import toh11Photo from "../assets/ambassador-toh11.jpeg";
import aki18Photo from "../assets/ambassador-aki18.jpeg";
import ade06Photo from "../assets/ambassador-ade06.jpeg";

interface CampusAmbassadorsPageProps {
  onNavigate?: (page: string) => void;
}

// Brand palette (per brief)
const DEEP_TEAL = "#009688";
const COCOA = "#2D0A02";
const CREAM = "#fff9c4";

const AMBASSADORS = [
  { name: "Olahan Khadijah", school: "University of Lagos", code: "IQP-OLK01" },
  { name: "Firdaous Ismail", school: "Lagos State University", code: "IQP-FIR02" },
  { name: "Sanni Faatimah Omotoyosi", school: "University of Ilorin", code: "IQP-SAN03" },
  { name: "Zaynab Adenike Hassan", school: "University of Lagos", code: "IQP-ZAY04" },
  { name: "Maimunah Mustapha", school: "University of Ilorin", code: "IQP-MAI05" },
  { name: "Adewuyi Abdulgafar", school: "FUHSI", code: "IQP-ADE06" },
  { name: "Hadiyyatullaah Ajibola", school: "University of Medical Sciences Ondo", code: "IQP-HAD07" },
  { name: "Khadijah Adeniran", school: "College of Medicine UNILAG", code: "IQP-KHA08" },
  { name: "Rofiah Abdulganiyu", school: "College of Nursing Science NOH Igbobi", code: "IQP-ROF09" },
  { name: "Kamaldeen Uswat Hassanat", school: "Abiola Ajimobi Technical University", code: "IQP-KAM10" },
  { name: "Toheeb Ayomide Lawal", school: "Kwara State University Malete", code: "IQP-TOH11" },
  { name: "Rodiyya Ismail", school: "University of Ilorin", code: "IQP-ROD12" },
  { name: "Sheu Salamot", school: "College of Nursing Sciences Eleyele Ibadan", code: "IQP-SHE13" },
  { name: "Abdulkareem Rodiyah Kehinde", school: "Lagos State University of Education", code: "IQP-ABD14" },
  { name: "Kareem Rokibah", school: "Lagos State University of Education", code: "IQP-KAR15" },
  { name: "Aderinoye Suliyat", school: "University of Ilorin", code: "IQP-ADR16" },
  { name: "Zainab MuhammadAwwal", school: "University of Ilorin", code: "IQP-ZAM17" },
  { name: "Akindele Abdur-Rahman Ayomide", school: "Adekunle Ajasin University Akungba", code: "IQP-AKI18" },
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

// The 7 uploaded ambassador portraits. They're explicitly assigned to the
// first batch of unmapped cards (see AMBASSADOR_PHOTOS below), and any card
// WITHOUT a dedicated photo automatically cycles through this set so the same
// 7 images repeat across every remaining card. Kept as remote URL strings so
// the build stays lean and the bundle isn't bloated with large portrait files.
const AMBASSADOR_IMAGES = [
  "https://i.pinimg.com/originals/75/ca/88/75ca8820235f4d981525664871ceab2d.png",
  "https://i.pinimg.com/originals/33/d3/83/33d383a12261b9502f0d983c9b7e4646.jpg",
  "https://i.pinimg.com/736x/75/ca/88/75ca8820235f4d981525664871ceab2d.jpg",
  "https://i.pinimg.com/originals/fe/46/a8/fe46a8cb4973c597a86aa40ece441fec.jpg",
  "https://i.pinimg.com/originals/35/b6/67/35b6670ff9a7795489b03263b8597c97.jpg",
  "https://i.pinimg.com/736x/06/2b/a5/062ba5d66f034fe8593a1bcef55a742d.jpg",
  "https://i.pinimg.com/736x/38/bc/59/38bc59aadf29dac3513e7755b30af712.jpg",
];

// Real ambassador photos, keyed by referral code. These override the stock
// placeholders for the matching cards. Local imports are used for the first
// three custom portraits; the seven remote portraits above are explicitly
// assigned to the next seven cards. Every other card cycles through
// AMBASSADOR_IMAGES (see the <img src={…} /> below).
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
  "IQP-KHA08": AMBASSADOR_IMAGES[6],
};

const STATS = [
  { value: "18+", label: "Ambassadors" },
  { value: "Multiple", label: "Campuses" },
  { value: "1", label: "Mission" },
];

// Published CSV export of the weekly leaderboard sheet.
// If this ever returns a 404, re-paste the sheet's "Publish to the web"
// CSV link here — the section then degrades to the fallback message.
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT06PfG2nQYj3CghPSOrOlc-rZ_yUCfVYKDI3ldeIvC6eOL7sfM1exxY5YB3-QNflgaLpr31Gawqipu/pub?gid=772222314&single=true&output=csv";

const LEADERBOARD_CSS = `
  .leaderboard-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 760px;
    margin: 0 auto;
    font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  }
  .leaderboard-grid > .lb-empty {
    text-align: center;
    color: #6b6b6b;
    padding: 2rem 1rem;
  }
  .lb-row {
    background: #ffffff;
    border: 1px solid #ececec;
    border-radius: 16px;
    padding: 16px 18px 16px;
    box-shadow: 0 2px 10px rgba(45, 10, 2, 0.05);
  }
  .lb-head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }
  .lb-rank {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 800;
    font-size: 16px;
    color: #ffffff;
    background-color: #aeb2b0;
  }
  .rank-1 .lb-rank { background-color: ${DEEP_TEAL}; }
  .rank-2 .lb-rank { background-color: ${COCOA}; }
  .rank-3 .lb-rank { background-color: #c8922a; }
  .rank-4 .lb-rank,
  .rank-5 .lb-rank { background-color: #9da3a0; }
  .lb-who {
    flex: 1 1 auto;
    min-width: 0;
  }
  .lb-name {
    font-family: "Utendo", ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.25;
    color: #0f0f0f;
  }
  .lb-school {
    font-size: 12.5px;
    color: #6b6b6b;
    margin-top: 2px;
  }
  .lb-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;
    flex-shrink: 0;
  }
  .lb-stat {
    font-size: 12px;
    font-weight: 600;
    color: #4b5563;
    background: #f3f4f6;
    border-radius: 999px;
    padding: 3px 10px;
    white-space: nowrap;
  }
  .lb-bar-track {
    height: 10px;
    background: #eef1f0;
    border-radius: 999px;
    overflow: hidden;
  }
  .lb-bar {
    height: 100%;
    border-radius: 999px;
    background-color: #aeb2b0;
    transition: width 0.8s ease;
  }
  .rank-1 .lb-bar { background-color: ${DEEP_TEAL}; }
  .rank-2 .lb-bar { background-color: ${COCOA}; }
  .rank-3 .lb-bar { background-color: #c8922a; }
  .rank-4 .lb-bar,
  .rank-5 .lb-bar { background-color: #9da3a0; }
  @media (max-width: 639px) {
    .lb-row {
      padding: 14px 14px 13px;
    }
    .lb-head {
      flex-wrap: wrap;
      gap: 10px;
    }
    .lb-rank {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    .lb-name {
      font-size: 14.5px;
    }
    .lb-school {
      font-size: 12px;
    }
    .lb-stats {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
      margin-left: 42px;
    }
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

export function CampusAmbassadorsPage({
  onNavigate,
}: CampusAmbassadorsPageProps) {
  // Load the weekly leaderboard from the published Google Sheet.
  useEffect(() => {
    async function loadLeaderboard() {
      let container: HTMLElement | null = null;
      try {
        container = document.getElementById("iqrapay-leaderboard");
        if (!container) return;

        const response = await fetch(SHEET_URL);
        const csv = await response.text();
        const rows = csv.trim().split("\n").slice(1);

        const leaderboard = rows.map((row, index) => {
          const cols = row.split(",");
          return {
            rank: index + 1,
            name: cols[1]?.trim() || "—",
            school: cols[2]?.trim() || "—",
            posts: cols[4]?.trim() || "0",
            referrals: cols[5]?.trim() || "0",
          };
        });

        // Show the top 5 ambassadors on the leaderboard as a bar chart.
        const topFive = leaderboard.slice(0, 5);

        if (topFive.length === 0) {
          container.innerHTML =
            "<p class='lb-empty'>Leaderboard updating soon. Check back Monday.</p>";
          return;
        }

        const maxPosts = Math.max(
          1,
          ...topFive.map((a) => parseInt(a.posts, 10) || 0)
        );

        container.innerHTML = topFive
          .map((a) => {
            const posts = parseInt(a.posts, 10) || 0;
            const referrals = parseInt(a.referrals, 10) || 0;
            const widthPct = Math.max(
              3,
              Math.min(100, Math.round((posts / maxPosts) * 100))
            );
            return `
              <div class="lb-row rank-${a.rank}">
                <div class="lb-head">
                  <div class="lb-rank">${a.rank}</div>
                  <div class="lb-who">
                    <div class="lb-name">${a.name}</div>
                    <div class="lb-school">${a.school}</div>
                  </div>
                  <div class="lb-stats">
                    <span class="lb-stat">${posts} posts this week</span>
                    <span class="lb-stat">${referrals} referrals</span>
                  </div>
                </div>
                <div class="lb-bar-track">
                  <div class="lb-bar" style="width: ${widthPct}%;"></div>
                </div>
              </div>
            `;
          })
          .join("");
      } catch (error) {
        console.error("Leaderboard error:", error);
        container = document.getElementById("iqrapay-leaderboard");
        if (container) {
          container.innerHTML =
            "<p>Leaderboard updating soon. Check back Monday.</p>";
        }
      }
    }

    void loadLeaderboard();
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
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-14 sm:pb-20 bg-[#F9F9F9] overflow-hidden">
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
              Our Campus Ambassadors
            </div>
            <h1>
              IqraPay is already{" "}
              <br className="hidden sm:block" />
              on your <span className="accent">campus</span>.
            </h1>
            <p className="lede">
              We have campus ambassadors representing IqraPay across multiple
              schools in Nigeria — and growing.
            </p>
            <p className="lede">
              Our campus ambassadors are Muslims who believe in the mission and
              are spreading it across their institutions. They are the ground
              force bringing IqraPay to every corner of Nigeria.
            </p>

            {/* Stats — pills beside each other */}
            <div className="stats-row">
              {STATS.map((stat) => (
                <div className="stat-pill" key={stat.label}>
                  <div className="num">{stat.value}</div>
                  <div className="label">{stat.label}</div>
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
                    src={AMBASSADOR_PHOTOS[ambassador.code] ?? AMBASSADOR_IMAGES[index % AMBASSADOR_IMAGES.length] ?? STOCK_PHOTOS[index]}
                    alt={ambassador.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <span className="quote-mark">“</span>
                    <p className="code">
                      Proud to represent IqraPay at{" "}
                      <strong>{ambassador.school}</strong>. Bringing the mission
                      home, one referral at a time.
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
                aria-label="Previous ambassadors"
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
                aria-label="Next ambassadors"
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
                  aria-label={`Go to ${ambassador.name}`}
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
              This Week's Top Ambassadors
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Updated every Monday. New week — new chance to lead.
            </p>
          </div>

          <div
            id="iqrapay-leaderboard"
            className="leaderboard-grid"
          >
            <p className="text-center text-muted-foreground py-10">
              Loading leaderboard…
            </p>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      <style>{LEADERBOARD_CSS}</style>
      <style>{HERO_CSS}</style>
      <style>{CAROUSEL_CSS}</style>
    </div>
  );
}
