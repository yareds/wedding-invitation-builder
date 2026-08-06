import JSZip from 'jszip';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from './themePresets';

export async function generateAndDownloadProjectZip(config: WeddingConfig, projectId: string) {
  const zip = new JSZip();
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groom = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const bride = config.brideEth || config.brideEn || 'የሙሽሪት ስም';
  const filenamePrefix = `${groom.toLowerCase()}-and-${bride.toLowerCase()}-wedding-${projectId.toLowerCase()}`;

  // 1. Generate standalone, self-contained index.html
  const htmlContent = generateStandaloneHtml(config, projectId);
  zip.file('index.html', htmlContent);

  // 2. Generate project-config.json
  const jsonContent = JSON.stringify(
    {
      projectId,
      generatedAt: new Date().toISOString(),
      coupleNames: `${groom} እና ${bride}`,
      config
    },
    null,
    2
  );
  zip.file('project-config.json', jsonContent);

  // 3. Generate netlify.toml for 1-click Netlify static deployment
  const netlifyConfig = `
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`.trim();
  zip.file('netlify.toml', netlifyConfig);

  // 4. Generate firebase.json for Firebase Hosting deployment
  const firebaseConfig = JSON.stringify(
    {
      hosting: {
        public: ".",
        ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
        rewrites: [
          {
            source: "**",
            destination: "/index.html"
          }
        ]
      }
    },
    null,
    2
  );
  zip.file('firebase.json', firebaseConfig);

  // 5. Generate deployment & admin README guide
  const readmeContent = `
# Wedding Website Deployment Package
**Project Identifier:** \`${projectId}\`
**Couple:** ${groom} & ${bride}
**Theme Style:** ${theme.name} (${theme.themeStyle})
**Date:** ${config.dateGC} (${config.dateEC})

---

## 🚀 Quick Static Deployment Options

### Option 1: Netlify Drag & Drop (Easiest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop this entire unzipped folder into the box.
3. Your wedding invitation website will be live in 5 seconds with a custom HTTPS URL!

### Option 2: Firebase Hosting
1. Install Firebase CLI: \`npm install -g firebase-tools\`
2. Run \`firebase login\` and \`firebase init hosting\` in this folder.
3. Deploy instantly: \`firebase deploy --only hosting\`

### Option 3: GitHub Pages / Vercel
1. Upload this repository folder to GitHub.
2. Connect to Vercel or GitHub Pages and select the root directory.

---

## 📄 File Manifest
- \`index.html\`: Self-contained, production-ready static website with interactive countdown, audio player, RSVP modal, venue maps, schedule, and photo gallery.
- \`project-config.json\`: Full configuration data for re-importing into the Wedding Builder.
- \`netlify.toml\`: Pre-configured Netlify routing rules.
- \`firebase.json\`: Pre-configured Firebase Hosting manifest.

*Generated with Ethiopian Wedding Invitation Website Builder.*
`.trim();
  zip.file('README.md', readmeContent);

  // 6. Generate blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${filenamePrefix}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

function generateStandaloneHtml(config: WeddingConfig, projectId: string): string {
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groomEth = config.groomEth || 'የሙሽራው ስም';
  const brideEth = config.brideEth || 'የሙሽሪት ስም';
  const groomEn = config.groomEn || 'Groom';
  const brideEn = config.brideEn || 'Bride';
  const groomInit = (groomEth || groomEn).trim()[0] || 'የ';
  const brideInit = (brideEth || brideEn).trim()[0] || 'የ';
  const coupleTitle = `${groomEth} እና ${brideEth}`;

  const galleryImgs = config.galleryImgs && config.galleryImgs.length > 0 ? config.galleryImgs : [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  ];
  const galleryImgsJson = JSON.stringify(galleryImgs);

  const scheduleList = config.schedule && config.schedule.length > 0 ? config.schedule : [
    {
      time: '02:00 PM',
      title: 'Holy Matrimony Ceremony',
      location: 'Sacred Cathedral',
      description: 'Nuptial mass, exchange of vows, and sacred musical performance.'
    },
    {
      time: '05:00 PM',
      title: 'Grand Reception & Cocktail',
      location: 'Estate Grounds',
      description: 'Artisanal toast, traditional dinner, and live music.'
    }
  ];

  const scheduleHtml = scheduleList
    .map(
      (evt) => `
      <div class="relative group">
        <div class="absolute -left-[29px] sm:-left-[45px] top-1.5 w-5 h-5 rotate-45 border-2 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-125" style="background-color: ${colors.primary}; border-color: ${colors.gold}">
          <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${colors.blushPale}"></div>
        </div>
        <div class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border transition-all" style="border-color: ${colors.blush}30">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full font-body text-xs font-semibold border" style="background-color: ${colors.blushPale}; color: ${colors.primary}; border-color: ${colors.gold}40">
              ⏰ ${evt.time}
            </span>
            <span class="font-body text-xs font-medium" style="color: ${colors.blush}">
              📍 ${evt.location}
            </span>
          </div>
          <h3 class="font-serif-heading text-lg font-normal mb-1" style="color: ${colors.primary}">${evt.title}</h3>
          <p class="font-body text-xs sm:text-sm leading-relaxed opacity-80" style="color: ${colors.primary}">${evt.description}</p>
        </div>
      </div>
    `
    )
    .join('');

  const bankHtml = (config.bankDetails || [])
    .map(
      (b) => `
      <div class="p-4 bg-white rounded-2xl border shadow-md flex items-center justify-between gap-3" style="border-color: ${colors.gold}50">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FDF0F3] text-[#3B0B1F] border border-[#D4849A]/30">${b.bankName}</span>
          <p class="text-xs font-semibold text-[#3B0B1F] mt-1.5">${b.accountName}</p>
          <p class="font-mono text-sm font-bold mt-0.5" style="color: ${colors.gold}">${b.accountNumber}</p>
        </div>
        <button onclick="copyAccount('${b.accountNumber}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 shrink-0" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
          Copy
        </button>
      </div>
    `
    )
    .join('');

  // Marquee HTML generation
  const marqueeItems = [...galleryImgs, ...galleryImgs, ...galleryImgs, ...galleryImgs]
    .map(
      (url, idx) => `
      <div onclick="openLightbox(${idx % galleryImgs.length})" class="group relative w-64 sm:w-80 aspect-[4/3] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer" style="border-color: ${colors.blush}40">
        <img src="${url}" alt="Photo ${(idx % galleryImgs.length) + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" style="background: linear-gradient(to top, ${colors.primary}E0, transparent)">
          <span class="font-serif-heading text-sm font-normal" style="color: ${colors.gold}">${groomEn} &amp; ${brideEn}</span>
          <span class="font-body text-[11px] opacity-80">Click to expand</span>
        </div>
      </div>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${coupleTitle} — Official Wedding Invitation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Noto+Serif+Ethiopic:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: ${colors.blushPale};
      color: ${colors.primary};
    }
    .font-serif-heading { font-family: 'Playfair Display', 'Noto Serif Ethiopic', serif; }
    .font-ethiopic { font-family: 'Noto Serif Ethiopic', serif; }
    .font-script { font-family: 'Great Vibes', cursive; }
    .font-quote { font-family: 'Playfair Display', serif; font-style: italic; }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0%); }
    }
    @keyframes scrollLeft {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll-right {
      display: flex;
      width: max-content;
      animation: scrollRight 35s linear infinite;
    }
    .animate-scroll-left {
      display: flex;
      width: max-content;
      animation: scrollLeft 35s linear infinite;
    }
    .animate-scroll-right:hover, .animate-scroll-left:hover {
      animation-play-state: paused;
    }
  </style>
</head>
<body class="min-h-screen relative overflow-x-hidden selection:bg-[${colors.blush}] selection:text-white">

  <!-- Floating Music Controller Top Right -->
  <div class="fixed top-5 right-5 z-40 flex items-center gap-2">
    <button id="musicToggleBtn" onclick="toggleAudio()" class="relative p-3 rounded-full border transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center bg-[#3B0B1F] border-[#C8A84B] text-[#C8A84B]">
      <span id="musicIcon" class="text-base font-serif-heading">🎵 ♪</span>
    </button>
  </div>

  <!-- Audio Element -->
  <audio id="bgAudio" loop src="${config.bgMusicUrl || ''}"></audio>

  <!-- Splash Screen Overlay -->
  <div id="splashScreen" class="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-in-out" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
    <div class="relative w-[90%] max-w-lg mx-auto p-8 sm:p-12 text-center border rounded-sm shadow-2xl backdrop-blur-md flex flex-col items-center" style="border-color: ${colors.gold}60; background-color: ${colors.primary}E6">
      
      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center p-1 shadow-lg mb-6" style="border-color: ${colors.gold}; background-color: ${colors.primary}">
        <div class="w-full h-full rounded-full border flex items-center justify-center" style="border-color: ${colors.blush}50">
          <span class="font-serif-heading text-2xl sm:text-3xl tracking-widest font-light" style="color: ${colors.gold}">
            ${groomInit} <span class="text-lg font-normal" style="color: ${colors.blush}">እና</span> ${brideInit}
          </span>
        </div>
      </div>

      <p class="font-body text-xs sm:text-sm uppercase tracking-[0.3em] mb-3" style="color: ${colors.blush}">Together With Their Families</p>

      <h1 class="font-serif-heading text-2xl sm:text-4xl font-normal leading-tight mb-3" style="color: ${colors.blushPale}">
        ${groomEth} <span class="font-serif-heading italic text-xl sm:text-3xl" style="color: ${colors.gold}">እና</span> ${brideEth}
      </h1>

      <p class="font-quote italic text-sm sm:text-base mb-4" style="color: ${colors.blushPale}">
        ${config.dateGC || 'May 09, 2026'} • ${config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}
      </p>

      <p class="font-body text-xs mb-8 max-w-xs leading-relaxed opacity-80" style="color: ${colors.blushPale}">
        You are cordially invited to celebrate our wedding ceremony and grand celebration.
      </p>

      <button onclick="enterWebsite()" class="inline-flex items-center gap-3 px-8 py-3.5 font-body text-sm font-semibold tracking-wider uppercase rounded-full shadow-xl hover:scale-105 transition-all border cursor-pointer" style="background-color: ${colors.gold}; color: ${colors.primary}; border-color: ${colors.blushPale}50">
        <span>Open Invitation</span>
      </button>
    </div>
  </div>

  <!-- Main Website Container Mirroring App.tsx -->
  <div class="min-h-screen text-[#3B0B1F] font-body relative" style="background-color: ${colors.blushPale}">

    <!-- 1. Hero Section -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden text-center transition-colors duration-500" style="background-color: ${colors.bg}; color: ${colors.primary}">
      ${config.heroImg ? `<div class="absolute inset-0 z-0 overflow-hidden"><img src="${config.heroImg}" class="w-full h-full object-cover object-center scale-105 opacity-30" /><div class="absolute inset-0" style="background-color: ${colors.heroOv}"></div></div>` : ''}

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <!-- Monogram Circle -->
        <div class="relative mb-8 group cursor-pointer">
          <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 p-2 shadow-2xl flex items-center justify-center" style="border-color: ${colors.gold}; background-color: ${colors.bg}">
            <div class="w-full h-full rounded-full border border-dashed flex items-center justify-center shadow-inner" style="border-color: ${colors.blush}; background-color: ${colors.primary}">
              <div class="text-center">
                <span class="font-serif-heading text-3xl sm:text-4xl font-light tracking-widest block" style="color: ${colors.gold}">
                  ${groomInit} <span class="font-serif-heading text-xl sm:text-2xl font-normal" style="color: ${colors.blush}">&amp;</span> ${brideInit}
                </span>
                <span class="font-quote italic text-[10px] sm:text-xs tracking-widest uppercase block mt-0.5 text-white/80">EST. 2026</span>
              </div>
            </div>
          </div>
        </div>

        <p class="font-quote italic text-sm sm:text-base tracking-wider mb-3" style="color: ${colors.blush}">Together with their families</p>

        <div class="mb-4 max-w-3xl">
          <h1 class="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight mb-2" style="color: ${colors.primary}">
            ${groomEth}
            <span class="block font-quote italic text-2xl sm:text-4xl my-2 font-light" style="color: ${colors.gold}">እና</span>
            ${brideEth}
          </h1>
          <p class="font-quote italic text-base sm:text-xl text-white/90 tracking-wide mt-2 opacity-90">${groomEn} &amp; ${brideEn}</p>
        </div>

        <p class="font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8 opacity-90" style="color: ${colors.primary}">
          request the honour of your presence as they exchange vows of everlasting love and celebrate their holy matrimony.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-body px-6 py-4 rounded-2xl border shadow-md backdrop-blur-md" style="background-color: rgba(255,255,255,0.85); border-color: ${colors.gold}60; color: ${colors.primary}">
          <div class="flex items-center gap-2">
            <span style="color: ${colors.gold}">📅</span>
            <span class="font-semibold">${config.dateGC || 'Saturday, May 09, 2026'}</span>
          </div>
          <span class="hidden sm:inline" style="color: ${colors.blush}">•</span>
          <div class="flex items-center gap-2">
            <span style="color: ${colors.blush}">📍</span>
            <span>${config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Date Card & Countdown Section -->
    <section class="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      <div class="relative bg-white rounded-3xl border-2 p-8 sm:p-12 text-center shadow-2xl overflow-hidden group transition-colors duration-500" style="border-color: ${colors.gold}90">
        
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Save the Date</p>

        <div class="my-6">
          <span class="block font-serif-heading text-4xl sm:text-6xl font-normal tracking-wider uppercase" style="color: ${colors.primary}">MAY</span>
          <div class="flex items-center justify-center gap-4 my-2">
            <span class="h-[2px] w-12" style="background-color: ${colors.gold}"></span>
            <span class="font-serif-heading text-6xl sm:text-8xl font-semibold leading-none" style="color: ${colors.gold}">09</span>
            <span class="h-[2px] w-12" style="background-color: ${colors.gold}"></span>
          </div>
          <span class="block font-serif-heading text-2xl sm:text-3xl tracking-widest font-light" style="color: ${colors.primary}">2026</span>
        </div>

        <p class="font-quote italic text-base sm:text-lg mb-8 max-w-md mx-auto" style="color: ${colors.primary}D0">
          "${config.scripture || 'Two lives, two hearts, joined in friendship, united forever in love.'}"
        </p>

        <div id="countdown" class="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-8 p-4 rounded-2xl border" style="background-color: ${colors.blushPale}; border-color: ${colors.blush}40">
          <div class="p-2 sm:p-3 text-center">
            <span id="cd-days" class="block font-serif-heading text-2xl sm:text-4xl font-semibold" style="color: ${colors.primary}">00</span>
            <span class="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style="color: ${colors.blush}">Days</span>
          </div>
          <div class="p-2 sm:p-3 text-center border-l" style="border-color: ${colors.blush}30">
            <span id="cd-hours" class="block font-serif-heading text-2xl sm:text-4xl font-semibold" style="color: ${colors.primary}">00</span>
            <span class="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style="color: ${colors.blush}">Hours</span>
          </div>
          <div class="p-2 sm:p-3 text-center border-l" style="border-color: ${colors.blush}30">
            <span id="cd-mins" class="block font-serif-heading text-2xl sm:text-4xl font-semibold" style="color: ${colors.primary}">00</span>
            <span class="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style="color: ${colors.blush}">Mins</span>
          </div>
          <div class="p-2 sm:p-3 text-center border-l" style="border-color: ${colors.blush}30">
            <span id="cd-secs" class="block font-serif-heading text-2xl sm:text-4xl font-semibold" style="color: ${colors.gold}">00</span>
            <span class="font-body text-[10px] sm:text-xs uppercase tracking-wider font-medium" style="color: ${colors.blush}">Secs</span>
          </div>
        </div>

        <div class="flex justify-center">
          <button onclick="openRSVPModal()" class="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
            <span>✓ RSVP Online</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 3. Details Section -->
    <section class="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Celebration Guide</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Wedding Details &amp; Event Locations</h2>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>

      <div class="space-y-6">
        <!-- Card 1: Sacred Ceremony -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-left-color: ${colors.gold}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full border flex items-center justify-center shrink-0" style="background-color: ${colors.blushPale}; border-color: ${colors.gold}60">
              <span style="color: ${colors.gold}" class="text-xl">💒</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-body text-[11px] uppercase tracking-widest font-semibold" style="color: ${colors.blush}">${config.timeDisplay || '02:00 PM'}</span>
                <span style="color: ${colors.blush}">•</span>
                <span class="font-body text-xs opacity-70" style="color: ${colors.primary}">Sacred Matrimony</span>
              </div>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">${config.churchEth || 'ካቴድራል ኦፍ ዘ ብለስድ ሳክራመንት'}</h3>
              ${config.churchEn ? `<p class="font-body text-sm font-semibold mb-2" style="color: ${colors.primary}">${config.churchEn}</p>` : ''}
              <p class="font-quote italic text-xs" style="color: ${colors.blush}">Organ prelude begins 30 minutes prior. Doors close promptly for the processional.</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=${encodeURIComponent(config.churchEn || config.churchEth || 'Church')}" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-body text-xs font-semibold cursor-pointer shrink-0 self-start md:self-center" style="border-color: ${colors.gold}; color: ${colors.primary}">
            📍 Map &amp; Directions
          </a>
        </div>

        <!-- Card 2: Evening Reception -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-left-color: ${colors.primary}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full border flex items-center justify-center shrink-0" style="background-color: ${colors.primary}; border-color: ${colors.gold}60">
              <span style="color: ${colors.gold}" class="text-xl">🍷</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-body text-[11px] uppercase tracking-widest font-semibold" style="color: ${colors.blush}">Grand Celebration</span>
                <span style="color: ${colors.blush}">•</span>
                <span class="font-body text-xs opacity-70" style="color: ${colors.primary}">Reception &amp; Dinner</span>
              </div>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">${config.receptionEth || 'ሴንት ሄሌና ቪንያርድ ኤስቴት'}</h3>
              ${config.receptionEn ? `<p class="font-body text-sm font-semibold mb-2" style="color: ${colors.primary}">${config.receptionEn}</p>` : ''}
              <p class="font-quote italic text-xs" style="color: ${colors.blush}">Cocktails, traditional toast, multi-course banquet dinner, and live orchestra dancing.</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=${encodeURIComponent(config.receptionEn || config.receptionEth || 'Reception')}" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-body text-xs font-semibold cursor-pointer shrink-0 self-start md:self-center" style="border-color: ${colors.primary}; background-color: ${colors.primary}; color: ${colors.blushPale}">
            📍 Map &amp; Directions
          </a>
        </div>

        <!-- Card 3: Attire Guidance -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-left-color: ${colors.blush}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full border flex items-center justify-center shrink-0" style="background-color: ${colors.blushPale}; border-color: ${colors.blush}60">
              <span style="color: ${colors.blush}" class="text-xl">👔</span>
            </div>
            <div>
              <span class="font-body text-[11px] uppercase tracking-widest font-semibold block mb-1" style="color: ${colors.blush}">Attire Guidance</span>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">${config.dressCode || 'Black-Tie Formal & Traditional Elegance'}</h3>
              <p class="font-body text-sm leading-relaxed mb-2 opacity-80" style="color: ${colors.primary}">We kindly request formal attire or traditional Ethiopian celebration wear.</p>
              <div class="flex items-center gap-2 mt-3">
                <span class="font-body text-xs opacity-70" style="color: ${colors.primary}">Palette Inspiration:</span>
                <div class="flex items-center gap-1.5">
                  <span class="w-4 h-4 rounded-full border shadow-sm" style="background-color: ${colors.primary}"></span>
                  <span class="w-4 h-4 rounded-full border shadow-sm" style="background-color: ${colors.blush}"></span>
                  <span class="w-4 h-4 rounded-full border shadow-sm" style="background-color: ${colors.gold}"></span>
                  <span class="w-4 h-4 rounded-full border shadow-sm" style="background-color: ${colors.bg}"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 4: Contact & Assistance -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-left-color: ${colors.gold}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full border flex items-center justify-center shrink-0" style="background-color: ${colors.blushPale}; border-color: ${colors.gold}60">
              <span style="color: ${colors.gold}" class="text-xl">📞</span>
            </div>
            <div>
              <span class="font-body text-[11px] uppercase tracking-widest font-semibold block mb-1" style="color: ${colors.blush}">Contact &amp; Assistance</span>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">Wedding Hotline &amp; Inquiry</h3>
              <p class="font-body text-sm leading-relaxed" style="color: ${colors.primary}">For special assistance, travel advice, or dietary requirements, please reach us directly:</p>
              <div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold" style="color: ${colors.primary}">
                ${config.phone1 ? `<span class="px-3 py-1 rounded-full bg-slate-100 border">📞 ${config.phone1}</span>` : ''}
                ${config.phone2 ? `<span class="px-3 py-1 rounded-full bg-slate-100 border">📞 ${config.phone2}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Story Quote Section -->
    <section class="relative py-20 px-4 sm:px-6 overflow-hidden my-12" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
      <div class="max-w-3xl mx-auto text-center relative z-10 px-4">
        <div class="font-serif-heading text-7xl sm:text-9xl leading-none opacity-80 -mb-8 sm:-mb-12 font-serif" style="color: ${colors.gold}">“</div>
        <blockquote class="font-quote italic text-xl sm:text-3xl leading-relaxed mb-8 font-light max-w-2xl mx-auto">
          "${config.scripture || 'Whatever our souls are made of, his and hers are the same. A quiet symphony of shared laughter, enduring trust, and infinite devotion.'}"
        </blockquote>
        <div class="flex items-center justify-center gap-3 mb-10">
          <span class="h-[1px] w-12 opacity-60" style="background-color: ${colors.gold}"></span>
          <span class="font-body text-xs uppercase tracking-[0.25em] font-medium" style="color: ${colors.gold}">
            ${groomEth} እና ${brideEth}
          </span>
          <span class="h-[1px] w-12 opacity-60" style="background-color: ${colors.gold}"></span>
        </div>
        <div class="rounded-3xl p-6 sm:p-10 border shadow-2xl text-left sm:text-center space-y-4" style="background-color: ${colors.mid}A0; border-color: ${colors.gold}40">
          <h3 class="font-serif-heading text-2xl text-center font-normal" style="color: ${colors.gold}">Our Love Story</h3>
          <p class="font-body text-sm sm:text-base leading-relaxed opacity-95">
            ${config.storyText || 'We first crossed paths five years ago. What began as an unexpected conversation over coffee quickly blossomed into a profound companionship built on shared dreams, art, and quiet Sunday strolls.'}
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Day of Celebration Schedule -->
    <section class="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div class="text-center mb-14">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Day of Celebration</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Wedding Day Schedule</h2>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>
      <div class="relative pl-6 sm:pl-10 border-l-2 space-y-8 my-8" style="border-color: ${colors.gold}60">
        ${scheduleHtml}
      </div>
    </section>

    <!-- 6. Dual Row Gallery Slider -->
    <section class="py-16 overflow-hidden max-w-7xl mx-auto">
      <div class="text-center mb-10 px-4">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Shared Moments</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Love Story Gallery</h2>
        <p class="font-quote text-xs italic mt-2 opacity-80" style="color: ${colors.primary}">Hover to pause scrolling • Click any photo to expand</p>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>
      <div class="space-y-6">
        <div class="overflow-hidden py-2 relative">
          <div class="animate-scroll-right gap-4 px-2">${marqueeItems}</div>
        </div>
        <div class="overflow-hidden py-2 relative">
          <div class="animate-scroll-left gap-4 px-2">${marqueeItems}</div>
        </div>
      </div>
    </section>

    <!-- 7. Traditional Accounts & Gifts -->
    ${
      config.bankDetails?.length
        ? `
    <section class="py-16 px-4 max-w-3xl mx-auto">
      <div class="bg-white/90 rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6" style="border-color: ${colors.gold}40">
        <div class="text-center space-y-1">
          <p class="text-xs uppercase tracking-widest font-semibold" style="color: ${colors.gold}">Gifts &amp; Blessings</p>
          <h2 class="font-serif-heading text-2xl sm:text-3xl font-normal" style="color: ${colors.primary}">Traditional Accounts &amp; Gifts</h2>
          <p class="text-xs text-center max-w-md mx-auto pt-1 opacity-80">
            Your prayers and presence are our greatest blessings. Should you wish to honor us with a gift, traditional Ethiopian bank accounts are provided below:
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          ${bankHtml}
        </div>
      </div>
    </section>
    `
        : ''
    }

    <!-- 8. RSVP Banner Section -->
    <section class="py-12 text-center px-4 my-8" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
      <div class="max-w-2xl mx-auto space-y-4">
        <h3 class="font-serif-heading text-2xl sm:text-3xl font-normal" style="color: ${colors.gold}">Will You Join Our Celebration?</h3>
        <p class="font-body text-xs sm:text-sm opacity-80">Please let us know your attendance and meal preferences by ${config.rsvpDeadlineEn || 'April 1, 2026'}.</p>
        <button onclick="openRSVPModal()" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider shadow-xl hover:scale-105 transition-all cursor-pointer" style="background-color: ${colors.gold}; color: ${colors.primary}">
          <span>Respond to Invitation</span>
        </button>
      </div>
    </section>

    <!-- 9. Botanical Footer -->
    <footer class="relative pt-12 pb-16 px-4 text-center overflow-hidden border-t-2" style="background-color: ${colors.footerBg}; border-color: ${colors.gold}60; color: ${colors.blushPale}">
      <div class="max-w-2xl mx-auto relative z-10 space-y-4 my-4">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-full border shadow-lg mb-2" style="border-color: ${colors.gold}; background-color: ${colors.primary}">
          <span class="font-serif-heading text-lg tracking-widest" style="color: ${colors.gold}">${groomInit} እና ${brideInit}</span>
        </div>
        <h3 class="font-serif-heading text-2xl sm:text-3xl font-normal" style="color: ${colors.blushPale}">${groomEth} እና ${brideEth}</h3>
        <p class="font-quote italic text-sm max-w-md mx-auto" style="color: ${colors.blush}">"We cannot wait to share the magic of our wedding day with you."</p>
        <p class="font-body text-xs tracking-widest uppercase pt-4 opacity-70">${config.dateGC || 'May 09, 2026'} • ${config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</p>
      </div>
    </footer>

  </div>

  <!-- Lightbox Modal -->
  <div id="lightboxModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <button onclick="closeLightbox()" class="absolute top-6 right-6 text-white text-3xl font-bold hover:text-[#C8A84B] cursor-pointer">&times;</button>
    <img id="lightboxImg" src="" class="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
  </div>

  <!-- RSVP Modal Dialog -->
  <div id="rsvpModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4 overflow-y-auto">
    <div class="relative w-full max-w-lg bg-white rounded-3xl border-2 shadow-2xl p-6 sm:p-8 my-auto text-[#3B0B1F]" style="border-color: ${colors.gold}">
      <button onclick="closeRSVPModal()" class="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer">&times;</button>
      
      <div id="rsvpFormView">
        <div class="text-center mb-6">
          <p class="text-xs uppercase tracking-widest font-semibold mb-1" style="color: ${colors.gold}">Kindly Respond By ${config.rsvpDeadlineEn || 'April 1, 2026'}</p>
          <h3 class="font-serif-heading text-2xl font-normal" style="color: ${colors.primary}">RSVP to ${groomEth} እና ${brideEth}</h3>
          <div class="w-12 h-0.5 mx-auto mt-2" style="background-color: ${colors.gold}"></div>
        </div>

        <form onsubmit="submitRSVP(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold uppercase tracking-wider mb-1">Full Name *</label>
            <input type="text" id="rsvpName" required placeholder="e.g. Abebe Kebede" class="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm bg-gray-50 border-gray-200" />
          </div>

          <div>
            <label class="block font-semibold uppercase tracking-wider mb-1">Phone Number / ስልክ ቁጥር *</label>
            <input type="tel" id="rsvpPhone" required placeholder="e.g. +251 911 234567" class="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm bg-gray-50 border-gray-200" />
          </div>

          <div>
            <label class="block font-semibold uppercase tracking-wider mb-2">Will you be attending? *</label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" id="btnAccept" onclick="setAttending(true)" class="py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm" style="background-color: ${colors.primary}; color: ${colors.blushPale}; border-color: ${colors.primary}">
                Joyfully Accepts
              </button>
              <button type="button" id="btnDecline" onclick="setAttending(false)" class="py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider cursor-pointer" style="background-color: #f3f4f6; color: #374151; border-color: #d1d5db">
                Regretfully Declines
              </button>
            </div>
          </div>

          <div id="guestCountBox">
            <label class="block font-semibold uppercase tracking-wider mb-1">Number of Guests</label>
            <select id="rsvpGuestCount" class="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm bg-gray-50 border-gray-200">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold uppercase tracking-wider mb-1">Personal Message to Couple</label>
            <textarea id="rsvpMessage" rows="2" placeholder="Warm wishes or notes..." class="w-full px-4 py-2.5 rounded-xl border focus:outline-none text-sm bg-gray-50 border-gray-200"></textarea>
          </div>

          <button type="submit" class="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl cursor-pointer mt-2" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
            Confirm RSVP Response
          </button>
        </form>
      </div>

      <div id="rsvpSuccessView" class="hidden text-center py-6 space-y-4">
        <div class="w-16 h-16 mx-auto rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
        <h3 class="font-serif-heading text-2xl font-semibold" style="color: ${colors.primary}">Thank You!</h3>
        <p id="rsvpSuccessText" class="text-xs text-gray-600">Your RSVP response has been recorded.</p>
        <button onclick="closeRSVPModal()" class="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
          Close Window
        </button>
      </div>
    </div>
  </div>

  <script>
    const galleryImgs = ${galleryImgsJson};
    let isAttending = true;
    let isPlaying = false;
    let audioCtx = null;
    let synthInterval = null;

    function enterWebsite() {
      const splash = document.getElementById('splashScreen');
      splash.style.opacity = '0';
      setTimeout(() => splash.style.display = 'none', 700);
      playAudio();
    }

    // Audio Control Logic (Supports custom file or synthetic piano synth)
    function playAudio() {
      const audio = document.getElementById('bgAudio');
      if (audio.src && audio.src !== window.location.href && audio.src !== '') {
        audio.play().then(() => {
          isPlaying = true;
          updateAudioUI();
        }).catch(() => {
          startSyntheticPiano();
        });
      } else {
        startSyntheticPiano();
      }
    }

    function toggleAudio() {
      const audio = document.getElementById('bgAudio');
      if (isPlaying) {
        if (audio.src) audio.pause();
        if (synthInterval) clearInterval(synthInterval);
        isPlaying = false;
      } else {
        playAudio();
      }
      updateAudioUI();
    }

    function updateAudioUI() {
      const btnText = document.getElementById('musicText');
      const btnIcon = document.getElementById('musicIcon');
      if (isPlaying) {
        btnText.innerText = 'Pause Music';
        btnIcon.innerText = '🔊';
      } else {
        btnText.innerText = 'Play Music';
        btnIcon.innerText = '🎵';
      }
    }

    function startSyntheticPiano() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        isPlaying = true;
        updateAudioUI();

        const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99]; // C major romantic arpeggio
        let idx = 0;
        if (synthInterval) clearInterval(synthInterval);
        synthInterval = setInterval(() => {
          if (!isPlaying) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[idx % notes.length], audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 1.8);
          idx++;
        }, 600);
      } catch (e) {
        console.log('Synth unsupported');
      }
    }

    // Countdown Timer
    const targetDate = new Date('${config.countdownDate || '2026-10-15T15:00:00'}').getTime();
    function updateCountdown() {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('cd-days').innerText = String(days).padStart(2, '0');
      document.getElementById('cd-hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('cd-mins').innerText = String(mins).padStart(2, '0');
      document.getElementById('cd-secs').innerText = String(secs).padStart(2, '0');
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Copy Bank Account Number
    function copyAccount(acc) {
      navigator.clipboard.writeText(acc);
      alert('Copied account number: ' + acc);
    }

    // Gallery Lightbox
    function openLightbox(idx) {
      if (!galleryImgs[idx]) return;
      document.getElementById('lightboxImg').src = galleryImgs[idx];
      document.getElementById('lightboxModal').classList.remove('hidden');
    }
    function closeLightbox() {
      document.getElementById('lightboxModal').classList.add('hidden');
    }

    // RSVP Modal Logic
    function openRSVPModal() {
      document.getElementById('rsvpModal').classList.remove('hidden');
    }
    function closeRSVPModal() {
      document.getElementById('rsvpModal').classList.add('hidden');
    }

    function setAttending(val) {
      isAttending = val;
      const btnAccept = document.getElementById('btnAccept');
      const btnDecline = document.getElementById('btnDecline');
      const guestBox = document.getElementById('guestCountBox');

      if (isAttending) {
        btnAccept.style.backgroundColor = '${colors.primary}';
        btnAccept.style.color = '${colors.blushPale}';
        btnDecline.style.backgroundColor = '#f3f4f6';
        btnDecline.style.color = '#374151';
        guestBox.classList.remove('hidden');
      } else {
        btnDecline.style.backgroundColor = '${colors.blush}';
        btnDecline.style.color = '#FFFFFF';
        btnAccept.style.backgroundColor = '#f3f4f6';
        btnAccept.style.color = '#374151';
        guestBox.classList.add('hidden');
      }
    }

    function submitRSVP(e) {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value;
      const phone = document.getElementById('rsvpPhone').value;
      const count = isAttending ? document.getElementById('rsvpGuestCount').value : 0;
      const message = document.getElementById('rsvpMessage').value;

      const rsvpObj = { name, phone, isAttending, count, message, timestamp: new Date().toISOString() };
      localStorage.setItem('wedding_guest_rsvp', JSON.stringify(rsvpObj));

      document.getElementById('rsvpFormView').classList.add('hidden');
      document.getElementById('rsvpSuccessView').classList.remove('hidden');
      document.getElementById('rsvpSuccessText').innerText = 'Thank you, ' + name + '! Your RSVP response has been confirmed.';
    }
  </script>
</body>
</html>
`.trim();
}
