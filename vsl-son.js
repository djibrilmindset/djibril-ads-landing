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
    var ov = document.createElement('button');
    ov.type = 'button';
    ov.setAttribute('aria-label', 'Activer le son');
    ov.style.cssText = 'position:absolute;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;border:0;cursor:pointer;background:rgba(0,0,0,.28);color:#fff;font:700 clamp(15px,2.5vw,22px)/1.35 Arial,sans-serif;text-align:center;-webkit-tap-highlight-color:transparent;';
    var sp = document.createElement('span');
    sp.style.cssText = 'display:inline-block;max-width:640px;padding:14px 22px;border-radius:999px;background:rgba(0,0,0,.72);box-shadow:0 6px 24px rgba(0,0,0,.35);';
    sp.style.setProperty('text-shadow', 'none', 'important'); /* si le skin galaxie est actif, son halo blanc baverait ici */
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
