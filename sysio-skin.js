/* ============================================================
   RESET-ULTRA skin pour la page systeme.io copyandpast4-588140fd
   Injecté via UNE ligne dans systeme.io :
     <script src="https://reset-ultra.com/sysio-skin.js" defer></script>
   100% réversible : retirer cette ligne = retour à l'état d'origine.
   Ne touche NI le pixel, NI l'iClosed, NI les témoignages — le look/fond
   + le module son-au-clic de la VSL (bloc 4, fin de fichier).
   ============================================================ */
(function () {
  if (window.__ruSkin) return; window.__ruSkin = 1;
  var RU = 'https://reset-ultra.com';

  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  // 1) polices
  var f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:wght@400;700;900&family=JetBrains+Mono:wght@400;600&display=swap';
  document.head.appendChild(f);

  // 2) styles
  var st = document.createElement('style');
  st.id = 'ru-restyle';
  st.textContent = [
    'body{background:#3d2733 !important}',
    '#ru-galaxy{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:#241620}',
    '#ru-galaxy .ru-sky{position:absolute;inset:-9%;background:url(' + RU + '/space-bg.webp) center/cover no-repeat;transform:scale(1.06);animation:ru-skyb 50s ease-in-out infinite alternate}',
    '#ru-galaxy .ru-tw{position:absolute;inset:0;opacity:.7;background:radial-gradient(3px 3px at 61% 75%,#fff,transparent 60%),radial-gradient(4px 4px at 28% 27%,#fff,transparent 60%),radial-gradient(3px 3px at 27% 16%,#fff,transparent 60%),radial-gradient(2px 2px at 72% 92%,#fff,transparent 60%),radial-gradient(3px 3px at 80% 54%,#fff,transparent 60%),radial-gradient(4px 4px at 83% 5%,#fff,transparent 60%),radial-gradient(2px 2px at 12% 11%,#fff,transparent 60%);animation:ru-tw 5.5s ease-in-out infinite}',
    '@keyframes ru-skyb{from{transform:scale(1.05)}to{transform:scale(1.12)}}',
    '@keyframes ru-tw{0%,100%{opacity:.45}50%{opacity:.8}}',
    '#ru-pills{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden}',
    '#ru-pills b{position:absolute;background-size:contain;background-repeat:no-repeat;filter:drop-shadow(0 0 18px rgba(0,0,0,.32)) saturate(.66) contrast(.88) brightness(.93);animation:ru-drift 26s ease-in-out infinite}',
    '@keyframes ru-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(12px,-12px)}}',
    '@media(prefers-reduced-motion:reduce){#ru-galaxy .ru-sky,#ru-galaxy .ru-tw,#ru-pills b{animation:none !important}}',
    '@media(max-width:820px){#ru-pills b{transform:scale(.6)}}',
    /* sections systeme.io (fond noir) -> transparentes, la galaxie apparait */
    'section[class^="sc-"],section[class*=" sc-"]{background:transparent !important;background-color:transparent !important}',
    /* contenu au-dessus de la galaxie */
    'body > div{position:relative;z-index:3}',
    /* police reset-ultra sur les titres */
    'h1,h2,h3,h4{font-family:"Instrument Serif","Playfair Display",Georgia,serif !important}',
    /* halo blanc reset-ultra -> texte lisible sur la galaxie */
    'section :is(h1,h2,h3,h4,h5,p,span,a,li,strong,em){text-shadow:0 0 2px #fff,0 0 4px #fff,0 0 9px #fff,0 0 15px rgba(255,255,255,1),0 0 27px rgba(255,255,255,.9),0 0 44px rgba(255,255,255,.6) !important}',
    'iframe,img,video,[class*="wistia"],[class*="iclosed"]{text-shadow:none !important}',
    /* remplace l'IMAGE du titre (ancienne capture blanche/bleue) par la version reset-ultra (carte creme editoriale) */
    'img[src*="69f22b8edc96f8"]{content:url(' + RU + '/sysio-title.png) !important;height:auto !important;background:transparent !important}'
  ].join('\n');
  document.head.appendChild(st);

  // 3) galaxie + pilules (créées quand le body est prêt)
  ready(function () {
    if (document.getElementById('ru-galaxy')) return;
    var g = document.createElement('div');
    g.id = 'ru-galaxy';
    g.innerHTML = '<div class="ru-sky"></div><div class="ru-tw"></div>';
    document.body.appendChild(g);

    var p = document.createElement('div');
    p.id = 'ru-pills';
    var conf = [
      ['or', '5%', '3%', 'auto', 'auto', '142px', '-0s'],
      ['violet', '44%', '1%', 'auto', 'auto', '78px', '-3s'],
      ['vert', 'auto', '4%', '8%', 'auto', '110px', '-6s'],
      ['bleu', '9%', 'auto', 'auto', '3%', '106px', '-9s'],
      ['cuivre', '52%', 'auto', 'auto', '2%', '140px', '-12s'],
      ['violet', 'auto', 'auto', '13%', '5%', '82px', '-15s']
    ];
    conf.forEach(function (c) {
      var b = document.createElement('b');
      b.style.cssText = 'background-image:url(' + RU + '/pills/pill-' + c[0] + '.webp);top:' + c[1] + ';left:' + c[2] + ';bottom:' + c[3] + ';right:' + c[4] + ';width:' + c[5] + ';height:' + c[5] + ';animation-delay:' + c[6];
      p.appendChild(b);
    });
    document.body.appendChild(p);
  });
})();

/* 4) VSL — son au premier clic (2026-08-13)
   La vidéo Wistia démarre muette dès l'arrivée ; le premier clic sur l'overlay
   relance du début AVEC le son (le clic = geste utilisateur, seul moyen autorisé
   par les navigateurs de sortir du mute pour un visiteur froid).
   ⚠️ cette API player Wistia n'a PAS volume() — unmute() seulement. */
(function () {
  window._wq = window._wq || [];
  window._wq.push({ id: '_all', onReady: function (video) {
    if (window.__ruVslSound) return; window.__ruVslSound = 1;
    var host = document.querySelector('.wistia_embed') || video.container;
    if (!host) return;
    host.style.position = 'relative';
    var ov = document.createElement('button');
    ov.type = 'button';
    ov.setAttribute('aria-label', 'Activer le son');
    ov.style.cssText = 'position:absolute;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;border:0;cursor:pointer;background:rgba(0,0,0,.28);color:#fff;font:700 clamp(15px,2.5vw,22px)/1.35 Arial,sans-serif;text-align:center;-webkit-tap-highlight-color:transparent;';
    var sp = document.createElement('span');
    sp.style.cssText = 'display:inline-block;max-width:640px;padding:14px 22px;border-radius:999px;background:rgba(0,0,0,.72);box-shadow:0 6px 24px rgba(0,0,0,.35);';
    sp.style.setProperty('text-shadow', 'none', 'important'); /* le halo blanc du skin (section span) baverait sur ce texte */
    sp.innerHTML = '🔊 Votre vidéo a déjà commencé<br>Cliquez pour activer le son';
    ov.appendChild(sp);
    host.appendChild(ov);
    video.mute();
    video.play();
    ov.addEventListener('click', function () {
      try { video.time(0); } catch (e) {}
      video.unmute();
      video.play();
      if (ov.parentNode) ov.parentNode.removeChild(ov);
    });
  }});
})();
