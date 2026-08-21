import JSZip from 'jszip';
import { WeddingConfig } from '../types';
import { THEME_PRESETS } from './themePresets';
import { getBotanicalFrameHtml } from '../components/BotanicalFrame';
import firebaseAppletConfig from '../../firebase-applet-config.json';

export async function generateAndDownloadProjectZip(config: WeddingConfig, projectId: string) {
  const zip = new JSZip();
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groom = [config.groomEn, config.groomEth].filter(Boolean).join(' ').trim() || 'የሙሽራው ስም';
  const bride = [config.brideEn, config.brideEth].filter(Boolean).join(' ').trim() || 'የሙሽሪት ስም';
  const filenamePrefix = `${groom.toLowerCase().replace(/\s+/g, '-')}-and-${bride.toLowerCase().replace(/\s+/g, '-')}-wedding-${projectId.toLowerCase()}`;

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
  const isRsvpEnabled = true;
  const theme = THEME_PRESETS[config.themeId] || THEME_PRESETS.bordeaux;
  const colors = theme.colors;

  const groom = [config.groomEn, config.groomEth].filter(Boolean).join(' ').trim() || 'የሙሽራው ስም';
  const bride = [config.brideEn, config.brideEth].filter(Boolean).join(' ').trim() || 'የሙሽሪት ስም';
  const groomEth = groom;
  const brideEth = bride;
  const groomEn = groom;
  const brideEn = bride;
  const groomInit = (config.groomEn || config.groomEth || 'የ').trim()[0] || 'የ';
  const brideInit = (config.brideEn || config.brideEth || 'የ').trim()[0] || 'የ';
  const coupleTitle = `${groom} እና ${bride}`;

  const galleryImgs = config.galleryImgs || [];
  const galleryImgsJson = JSON.stringify(galleryImgs);

  const scheduleList = config.schedule && config.schedule.length > 0 ? config.schedule : [
    {
      time: '7:00 – 8:00',
      title: 'አጃቢዎች በሙሽራው ቤት ይገኛሉ',
      location: "Groom's Residence / የሙሽራው ቤት",
      description: "Groomsmen Gather at Groom's Home"
    },
    {
      time: '9:00 – 9:30',
      title: 'ጉዞ ወደ ሙሽሪት ቤት (አድራሻ)',
      location: "Bride's Residence / የሙሽሪት ቤት",
      description: "Travel to Bride's Home"
    },
    {
      time: '10:30 – 12:00',
      title: 'የቃልኪዳን ስነስርዓት (ቅድስት ሥላሴ ካቴድራል)',
      location: 'ቅድስት ሥላሴ ካቴድራል (Holy Trinity Cathedral, Addis Ababa)',
      description: 'Vows & Worship Program'
    },
    {
      time: '1:00 – 2:30',
      title: 'የምሳ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Lunch Reception at Ghion Hotel'
    },
    {
      time: '2:30 – 6:00',
      title: 'የኬክ ቆረሳ፣ ጭፈራ እና ፎቶ ፕሮግራም ግዮን ሆቴል',
      location: 'ግዮን ሆቴል (Ghion Hotel, Addis Ababa)',
      description: 'Cake, Music & Photography'
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

  // Dual Row Marquee HTML generation (4 images in row 1, 4 images in row 2)
  const row1Images = galleryImgs.length >= 8 ? galleryImgs.slice(0, 4) : galleryImgs.slice(0, Math.ceil(galleryImgs.length / 2));
  const row2Images = galleryImgs.length >= 8 ? galleryImgs.slice(4, 8) : (galleryImgs.slice(Math.ceil(galleryImgs.length / 2)).length > 0 ? galleryImgs.slice(Math.ceil(galleryImgs.length / 2)) : row1Images);

  const marqueeRow1Items = row1Images.length > 0 ? [...row1Images, ...row1Images, ...row1Images, ...row1Images]
    .map((url) => {
      const origIdx = galleryImgs.indexOf(url) >= 0 ? galleryImgs.indexOf(url) : 0;
      return `
      <div onclick="openLightbox(${origIdx})" class="group relative w-64 sm:w-80 aspect-[4/3] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer" style="border-color: ${colors.blush}40">
        <img src="${url}" alt="Photo ${origIdx + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" style="background: linear-gradient(to top, ${colors.primary}E0, transparent)">
          <span class="font-serif-heading text-sm font-normal" style="color: ${colors.gold}">${groomEn} &amp; ${brideEn}</span>
          <span class="font-body text-[11px] opacity-80">Click to expand</span>
        </div>
      </div>
    `;
    })
    .join('') : '';

  const marqueeRow2Items = row2Images.length > 0 ? [...row2Images, ...row2Images, ...row2Images, ...row2Images]
    .map((url) => {
      const origIdx = galleryImgs.indexOf(url) >= 0 ? galleryImgs.indexOf(url) : 0;
      return `
      <div onclick="openLightbox(${origIdx})" class="group relative w-64 sm:w-80 aspect-[4/3] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer" style="border-color: ${colors.blush}40">
        <img src="${url}" alt="Photo ${origIdx + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" style="background: linear-gradient(to top, ${colors.primary}E0, transparent)">
          <span class="font-serif-heading text-sm font-normal" style="color: ${colors.gold}">${groomEn} &amp; ${brideEn}</span>
          <span class="font-body text-[11px] opacity-80">Click to expand</span>
        </div>
      </div>
    `;
    })
    .join('') : '';

  // Gallery HTML generation based on photo count
  let gallerySectionHtml = '';
  if (galleryImgs.length === 0) {
    gallerySectionHtml = `
    <!-- 6. Gallery Section (Empty State) -->
    <section id="gallery-section" class="py-16 overflow-hidden max-w-5xl mx-auto px-4">
      <div class="text-center mb-8 px-4">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Shared Moments</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Love Story Gallery</h2>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>
      <div class="max-w-md mx-auto p-8 rounded-2xl border text-center shadow-xs" style="border-color: ${colors.gold}40; background-color: #FFFFFF">
        <div class="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border" style="border-color: ${colors.gold}60; background-color: ${colors.blushPale}; color: ${colors.gold}">
          <svg class="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
        </div>
        <h3 class="font-serif-heading text-lg font-normal mb-1" style="color: ${colors.primary}">No Photos Added Yet</h3>
        <p class="font-body text-xs leading-relaxed opacity-75" style="color: ${colors.primary}">Uploaded wedding and engagement photos will appear here in your live gallery.</p>
      </div>
    </section>
    `;
  } else if (galleryImgs.length < 4) {
    const gridColsClass = galleryImgs.length === 1 ? 'max-w-md grid-cols-1' : galleryImgs.length === 2 ? 'max-w-2xl grid-cols-1 sm:grid-cols-2' : 'max-w-4xl grid-cols-1 sm:grid-cols-3';
    const staticGridItems = galleryImgs.map((url, idx) => `
      <div onclick="openLightbox(${idx})" class="group relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border cursor-pointer" style="border-color: ${colors.blush}40">
        <img src="${url}" alt="Photo ${idx + 1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" style="background: linear-gradient(to top, ${colors.primary}E0, transparent)">
          <span class="font-serif-heading text-sm font-normal" style="color: ${colors.gold}">${groomEn} &amp; ${brideEn}</span>
          <span class="font-body text-[11px] opacity-80">Click to expand</span>
        </div>
      </div>
    `).join('');
    gallerySectionHtml = `
    <!-- 6. Gallery Section (Static Grid) -->
    <section id="gallery-section" class="py-16 overflow-hidden max-w-7xl mx-auto">
      <div class="text-center mb-10 px-4">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Shared Moments</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Love Story Gallery</h2>
        <p class="font-quote text-xs italic mt-2 opacity-80" style="color: ${colors.primary}">Click any photo to expand into full view</p>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>
      <div class="px-4">
        <div class="grid gap-4 sm:gap-6 mx-auto ${gridColsClass}">
          ${staticGridItems}
        </div>
      </div>
    </section>
    `;
  } else {
    gallerySectionHtml = `
    <!-- 6. Dual Row Gallery Slider -->
    <section id="gallery-section" class="py-16 overflow-hidden max-w-7xl mx-auto">
      <div class="text-center mb-10 px-4">
        <p class="font-body text-xs uppercase tracking-[0.3em] font-semibold mb-2" style="color: ${colors.blush}">Shared Moments</p>
        <h2 class="font-serif-heading text-3xl sm:text-4xl font-normal" style="color: ${colors.primary}">Love Story Gallery</h2>
        <p class="font-quote text-xs italic mt-2 opacity-80" style="color: ${colors.primary}">Hover to pause scrolling • Click any photo to expand</p>
        <div class="w-16 h-[2px] mx-auto mt-4" style="background-color: ${colors.gold}"></div>
      </div>
      <div class="space-y-6">
        <div class="overflow-hidden py-2 relative">
          <div class="animate-scroll-right gap-4 px-2">${marqueeRow1Items}</div>
        </div>
        <div class="overflow-hidden py-2 relative">
          <div class="animate-scroll-left gap-4 px-2">${marqueeRow2Items}</div>
        </div>
      </div>
    </section>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${coupleTitle} — Official Wedding Invitation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans+Ethiopic:wght@100..900&family=Raleway:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Raleway', sans-serif;
      background-color: ${colors.blushPale};
      color: ${colors.primary};
    }
    .font-body { font-family: 'Raleway', sans-serif; }
    .font-serif-heading { font-family: 'Bodoni Moda', serif; }
    .font-quote { font-family: 'Lora', serif; font-style: italic; }
    .font-amharic { font-family: 'Noto Sans Ethiopic', sans-serif; }
    .font-ethiopic { font-family: 'Noto Sans Ethiopic', sans-serif; }

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
      animation: scrollRight 85s linear infinite;
    }
    .animate-scroll-left {
      display: flex;
      width: max-content;
      animation: scrollLeft 85s linear infinite;
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
  <audio id="bgAudio" loop ${config.bgMusicUrl ? `src="${config.bgMusicUrl}"` : ''} onerror="if(typeof isPlaying !== 'undefined'){ isPlaying = false; updateAudioUI(); }"></audio>

  <!-- Splash Screen Overlay -->
  <div id="splashScreen" class="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ease-in-out" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
    ${getBotanicalFrameHtml('top-left', config.themeId, config.frameStyle, 'absolute top-0 left-0 z-10')}
    ${getBotanicalFrameHtml('top-right', config.themeId, config.frameStyle, 'absolute top-0 right-0 z-10')}
    ${getBotanicalFrameHtml('bottom-left', config.themeId, config.frameStyle, 'absolute bottom-0 left-0 z-10')}
    ${getBotanicalFrameHtml('bottom-right', config.themeId, config.frameStyle, 'absolute bottom-0 right-0 z-10')}

    <div class="relative w-[90%] max-w-lg mx-auto p-8 sm:p-12 text-center border rounded-sm shadow-2xl backdrop-blur-md flex flex-col items-center" style="border-color: ${colors.gold}60; background-color: ${colors.primary}E6">
      
      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center p-1 shadow-lg mb-6" style="border-color: ${colors.gold}; background-color: transparent">
        <div class="w-full h-full rounded-full border flex items-center justify-center" style="border-color: ${colors.blush}50; background-color: transparent">
          <span class="font-serif-heading text-2xl sm:text-3xl tracking-widest font-light" style="color: ${colors.gold}">
            ${groomInit} <span class="text-lg font-normal" style="color: ${colors.blush}">እና</span> ${brideInit}
          </span>
        </div>
      </div>

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
      ${config.heroImg ? `<div class="absolute inset-0 z-0 overflow-hidden"><img src="${config.heroImg}" alt="Hero Background" class="w-full h-full object-cover object-center opacity-70 transition-opacity duration-700 pointer-events-none" /><div class="absolute inset-0" style="background-color: ${colors.heroOv || 'rgba(0,0,0,0.45)'}"></div></div>` : ''}

      ${getBotanicalFrameHtml('top-left', config.themeId, config.frameStyle, 'absolute top-2 left-2 sm:top-6 sm:left-6 z-10')}
      ${getBotanicalFrameHtml('top-right', config.themeId, config.frameStyle, 'absolute top-2 right-2 sm:top-6 sm:right-6 z-10')}

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <!-- Monogram Circle -->
        <div class="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 group cursor-pointer">
          <div class="w-full h-full rounded-full border-2 p-2 shadow-2xl flex items-center justify-center" style="border-color: ${colors.gold}; background-color: transparent">
            <div class="w-full h-full rounded-full border border-dashed flex items-center justify-center shadow-inner" style="border-color: ${colors.gold}90; background-color: transparent">
              <div class="text-center">
                <span class="font-serif-heading text-3xl sm:text-4xl font-light tracking-widest block" style="color: ${colors.gold}">
                  ${groomInit} <span class="font-serif-heading text-xl sm:text-2xl font-normal" style="color: ${colors.blushLt || '#E5A4B5'}">&amp;</span> ${brideInit}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div class="mb-4 max-w-3xl">
          <h1 class="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight mb-2" style="color: #FFFFFF">
            ${groom}
            <span class="block font-quote italic text-2xl sm:text-4xl my-2 font-light" style="color: ${colors.gold}">እና</span>
            ${bride}
          </h1>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-body tracking-wider uppercase font-medium" style="color: #FFFFFF">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 inline-block" style="color: ${colors.gold}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span class="font-semibold">${config.dateGC || 'Saturday, May 09, 2026'}</span>
          </div>
          <span class="hidden sm:inline" style="color: ${colors.gold}">•</span>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 inline-block" style="color: ${colors.gold}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</span>
          </div>
        </div>
      </div>

      ${getBotanicalFrameHtml('banner-bottom', config.themeId, config.frameStyle, 'mt-12 z-10')}
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

        <p class="font-quote italic text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed" style="color: ${colors.primary}D0">
          ${config.scripture ? `"${config.scripture}"` : 'We request the honor of your presence as we exchange our vows of everlasting love and celebrate our holy matrimony.'}
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
                <span class="font-body text-[11px] uppercase tracking-widest font-semibold" style="color: ${colors.blush}">Sacred Matrimony . የቃልኪዳን ስነስርዓት</span>
              </div>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">${config.churchEth || 'ቅድስት ሥላሴ ካቴድራል፤ አዲስ አበባ'}</h3>
              <p class="font-body text-sm font-semibold mb-2" style="color: ${colors.primary}">${config.churchEn || 'Holy Trinity Cathedral, Addis Ababa'}</p>
              <p class="font-quote italic text-xs" style="color: ${colors.blush}">Organ prelude begins 30 minutes prior. Doors close promptly for the processional.</p>
            </div>
          </div>
        </div>

        <!-- Card 2: Evening Reception -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-4 flex flex-col md:flex-row md:items-center justify-between gap-6" style="border-left-color: ${colors.primary}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full border flex items-center justify-center shrink-0" style="background-color: ${colors.primary}; border-color: ${colors.gold}60">
              <span style="color: ${colors.gold}" class="text-xl">🍷</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-body text-[11px] uppercase tracking-widest font-semibold" style="color: ${colors.blush}">Reception &amp; Dinner . የምሳ/እራት ግብዣ ቦታ</span>
              </div>
              <h3 class="font-serif-heading text-xl sm:text-2xl font-normal mb-2" style="color: ${colors.primary}">${config.receptionEth || 'ግዮን ሆቴል (ግራንድ ሆል)፤ አዲስ አበባ'}</h3>
              <p class="font-body text-sm font-semibold mb-2" style="color: ${colors.primary}">${config.receptionEn || 'Ghion Hotel Grand Hall, Addis Ababa'}</p>
              <p class="font-quote italic text-xs" style="color: ${colors.blush}">Cocktails, traditional toast, lunch & dinner banquet, and live music celebration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Story Quote Section -->
    <section class="relative py-20 px-4 sm:px-6 overflow-hidden my-12" style="background-color: ${colors.blushPale}; color: ${colors.primary}">
      ${getBotanicalFrameHtml('top-left', config.themeId, config.frameStyle, 'absolute top-2 left-2 z-10')}
      ${getBotanicalFrameHtml('top-right', config.themeId, config.frameStyle, 'absolute top-2 right-2 z-10')}
      ${getBotanicalFrameHtml('bottom-left', config.themeId, config.frameStyle, 'absolute bottom-2 left-2 z-10')}
      ${getBotanicalFrameHtml('bottom-right', config.themeId, config.frameStyle, 'absolute bottom-2 right-2 z-10')}

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
        <div class="rounded-3xl p-6 sm:p-10 border shadow-2xl text-left sm:text-center space-y-4" style="background-color: #FFFFFF; border-color: ${colors.gold}60">
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

    ${gallerySectionHtml}

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
    <footer class="relative pt-12 pb-16 px-4 text-center overflow-hidden border-t-2" style="background-color: ${colors.primary}; border-color: ${colors.gold}; color: #FAF0F3">
      ${getBotanicalFrameHtml('banner-top', config.themeId, config.frameStyle, '-mt-8 mb-4')}
      <div class="max-w-2xl mx-auto relative z-10 space-y-4 my-4">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-full border shadow-lg mb-2" style="border-color: ${colors.gold}; background-color: transparent">
          <span class="font-serif-heading text-lg tracking-widest" style="color: ${colors.gold}">${groomInit} እና ${brideInit}</span>
        </div>
        <h3 class="font-serif-heading text-2xl sm:text-3xl font-normal text-[#FAF0F3]">${groomEth} እና ${brideEth}</h3>
        <p class="font-quote italic text-sm max-w-md mx-auto text-[#E5A4B5]">"We cannot wait to share the magic of our wedding day with you."</p>
        <p class="font-body text-xs tracking-widest uppercase pt-4 text-[#FAF0F3]/80">${config.dateGC || 'May 09, 2026'} • ${config.dateEC || 'ግንቦት 01, 2018 ዓ.ም'}</p>
      </div>
      ${getBotanicalFrameHtml('banner-bottom', config.themeId, config.frameStyle, 'mt-8 -mb-12')}
    </footer>

    <!-- 10. Contact & Assistance Standalone Section -->
    <section id="contact-section" class="py-8 px-4 text-center border-t" style="background-color: ${colors.footerBg || colors.primary}; border-color: ${colors.gold}40; color: #FAF0F3">
      <div class="max-w-2xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border shadow-xs" style="border-color: ${colors.gold}60; background-color: rgba(255, 255, 255, 0.08); color: ${colors.gold}">
          <span>📞</span>
          <span>Contact &amp; Assistance Info</span>
        </div>
        <p class="font-body text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95 text-[#FAF0F3]">
          ${(config.contactInfo || '').trim() || '+251 91 123 4567 / +251 92 234 5678 · info@wedding.et'}
        </p>
      </div>
    </section>

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

          <button type="submit" id="rsvpSubmitBtn" class="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl cursor-pointer mt-2" style="background-color: ${colors.primary}; color: ${colors.blushPale}">
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

  <!-- Firebase Integration Script for Static Site -->
  <script type="module">
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
    import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

    const fbConfig = ${JSON.stringify({
      projectId: firebaseAppletConfig.projectId,
      appId: firebaseAppletConfig.appId,
      apiKey: firebaseAppletConfig.apiKey,
      authDomain: firebaseAppletConfig.authDomain,
      firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId,
      storageBucket: firebaseAppletConfig.storageBucket,
      messagingSenderId: firebaseAppletConfig.messagingSenderId
    })};

    try {
      const app = initializeApp(fbConfig);
      const db = getFirestore(app, fbConfig.firestoreDatabaseId || '(default)');

      window.submitRSVPToFirestore = async function(rsvpData) {
        const rsvpsRef = collection(db, 'projects', '${projectId}', 'rsvps');
        return await addDoc(rsvpsRef, rsvpData);
      };
    } catch (e) {
      console.error('Firebase initialization error in exported static website:', e);
    }
  </script>

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
      if (audio && audio.src && audio.src !== window.location.href && audio.src !== '') {
        try {
          if (audio.readyState === 0 || audio.error) {
            audio.load();
          }
        } catch(e) {}
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

    async function submitRSVP(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('rsvpSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting RSVP...';
      }

      const name = document.getElementById('rsvpName').value;
      const phone = document.getElementById('rsvpPhone').value;
      const count = isAttending ? parseInt(document.getElementById('rsvpGuestCount').value || '1', 10) : 0;
      const message = document.getElementById('rsvpMessage').value;

      const rsvpObj = {
        guestName: name,
        phone: phone,
        attending: isAttending,
        guestCount: count,
        message: message,
        submittedAt: new Date().toISOString()
      };

      try {
        if (window.submitRSVPToFirestore) {
          await window.submitRSVPToFirestore(rsvpObj);
        } else {
          localStorage.setItem('wedding_guest_rsvp_' + Date.now(), JSON.stringify(rsvpObj));
        }

        document.getElementById('rsvpFormView').classList.add('hidden');
        document.getElementById('rsvpSuccessView').classList.remove('hidden');
        document.getElementById('rsvpSuccessText').innerText = 'Thank you, ' + name + '! Your RSVP response has been confirmed.';
      } catch (err) {
        console.error('RSVP Submission Error:', err);
        alert('There was an error submitting your RSVP response to Firestore. Please try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Confirm RSVP Response';
        }
      }
    }
  </script>
</body>
</html>
`.trim();
}
