/* ============================================================
   VSL SON AU PREMIER CLIC — page systeme.io copyandpast4-588140fd
   Injecté via UNE ligne dans systeme.io (bloc HTML ou code de suivi) :
     <script src="https://reset-ultra.com/vsl-son.js" defer></script>
   100% réversible : retirer cette ligne = retour à l'état d'origine.
   Effet : la vidéo Wistia démarre muette dès l'arrivée ; le premier clic
   sur l'overlay relance du début AVEC le son (le clic = geste utilisateur,
   seul moyen autorisé par les navigateurs de sortir du mute pour un
   visiteur froid — Chrome, Safari, webview Instagram).
   ⚠️ cette API player Wistia n'a PAS volume() — unmute() seulement.
   Ne touche NI le pixel, NI l'iClosed, NI le reste de la page.
   ============================================================ */
(function () {
  window._wq = window._wq || [];
  window._wq.push({ id: '_all', onReady: function (video) {
    if (window.__ruVslSound) return; window.__ruVslSound = 1;
    var host = document.querySelector('.wistia_embed') || video.container;
    if (!host) return;
    host.style.position = 'relative';
    var anim = document.createElement('style');
    anim.textContent = '@keyframes ruVslPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}' +
      '@keyframes ruVslRing{0%{transform:scale(.55);opacity:.95}100%{transform:scale(1.9);opacity:0}}' +
      '@keyframes ruVslShake{0%,100%{transform:rotate(0)}15%{transform:rotate(-9deg)}30%{transform:rotate(9deg)}45%{transform:rotate(-6deg)}60%{transform:rotate(6deg)}75%{transform:rotate(-3deg)}}';
    document.head.appendChild(anim);
    var ov = document.createElement('button');
    ov.type = 'button';
    ov.setAttribute('aria-label', 'Activer le son');
    ov.style.cssText = 'position:absolute;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;border:0;cursor:pointer;background:rgba(0,0,0,.25);-webkit-tap-highlight-color:transparent;';
    ov.innerHTML =
      '<span style="display:flex;flex-direction:column;align-items:center;gap:14px;pointer-events:none;">' +
        '<span style="position:relative;display:flex;align-items:center;justify-content:center;width:clamp(88px,22vw,120px);height:clamp(88px,22vw,120px);">' +
          '<span style="position:absolute;inset:0;border-radius:50%;border:3px solid rgba(255,255,255,.9);animation:ruVslRing 1.6s ease-out infinite;"></span>' +
          '<span style="position:absolute;inset:0;border-radius:50%;border:3px solid rgba(255,255,255,.6);animation:ruVslRing 1.6s ease-out .55s infinite;"></span>' +
          '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;background:rgba(0,0,0,.78);box-shadow:0 10px 40px rgba(0,0,0,.55);animation:ruVslPulse 1.6s ease-in-out infinite;">' +
            '<svg width="52%" height="52%" viewBox="0 0 24 24" fill="#fff" style="animation:ruVslShake 1.5s ease-in-out infinite;"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/><path d="M14 3.2v2.1c2.9.9 5 3.6 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"/></svg>' +
          '</span>' +
        '</span>' +
        '<span style="font:700 15px/1.3 Arial,sans-serif;color:#fff;background:rgba(0,0,0,.65);padding:8px 18px;border-radius:999px;text-shadow:none !important;">Appuyez pour activer le son</span>' +
      '</span>';
    ov.addEventListener('click', function () {
      /* la config Wistia no-seek de la VSL refuse video.time(0) — le seek
         sur l'élément <video> brut passe, lui (vérifié live 2026-08-13) */
      try { video.time(0); } catch (e) {}
      try { var raw = host.querySelector('video'); if (raw) raw.currentTime = 0; } catch (e) {}
      video.unmute();
      video.play();
      if (ov.parentNode) ov.parentNode.removeChild(ov);
    });
    /* 1er essai : son DIRECT dès l'ouverture. Le navigateur ne l'accorde
       qu'aux visiteurs ayant déjà interagi avec le domaine (revisite, etc.) ;
       s'il refuse OU suspend la lecture ensuite, bascule auto :
       lecture muette + overlay clic-pour-le-son. Double contrôle car un
       navigateur peut laisser partir le son puis suspendre après coup. */
    var secours = function () {
      if (window.__ruVslFallback) return; window.__ruVslFallback = 1;
      video.mute();
      video.play();
      if (!ov.parentNode) host.appendChild(ov);
    };
    var verif = function () {
      if (window.__ruVslFallback) return;
      if (video.state() === 'playing' && !video.isMuted()) return; /* son direct accordé et stable */
      secours();
    };
    video.unmute();
    video.play();
    setTimeout(verif, 600);
    setTimeout(verif, 3500);
  }});
})();
