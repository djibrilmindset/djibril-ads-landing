# AUDIT PRÉ-LANCEMENT — 02/09 (nuit avant sortie vidéos)

> Audit complet du funnel leads Reset Ultra. Banc qualité 2 agents (ATTAQUANT 7d12151a REVISE + VÉRIFICATEUR 3d127664 REVISE-7/8), relevés live curl + base Supabase lecture seule + test réel Telegram.

## VERDICT GLOBAL : **PRÊT POUR DEMAIN** — à condition des 3 actions owner ci-dessous

## Carte du funnel VÉRIFIÉE (relevés 02/09 ~00:00-00:40 UTC)

```
Annonces / liens
   └─> QUIZ : https://djibrilsylearn.systeme.io/quiz  [200 ✓ — page systeme.io, quiz custom dq-quiz]
         ├─ 7 questions client-side → qualification (q5,q6,q7 ≥1 ; somme ≥6)
         ├─ QUALIFIÉ → widget iClosed INLINE reset-1-to1 [200 ✓] → RDV
         └─ NON-QUALIFIÉ → redirection Instagram (4 s)
   └─> VSL : https://reset-ultra.com/prochaine-etape  [200 ✓ — live = local à l'octet près]
         ├─ Wistia 0xa57p9nks [jsonp 200 ✓ — 5 occurrences OK]
         ├─ CTA fin de vidéo → systeme.io/copyandpast4-588140fd [200 ✓ — porte pixel Meta ×6 + widget iClosed]
         └─ params lus : p (tél signé), s (HMAC), e (email), src ('wa' exact = CTA WhatsApp), t, utm_source/medium/content
   └─> BOOKING iClosed → webhook → iclosed-notify (Supabase) [GET 200 ✓, POST 401 fail-closed ✓]
         ├─ carte 🟢/🔵 Telegram @Djaelysbot → chat Djibril  [PREUVE CE SOIR : msg test id 3692 livré ✓]
         ├─ poll de secours iClosed  [PREUVE : heartbeats satcap:api-iclosed + pollstat créés à 00:00 UTC ce soir ✓]
         └─ CRM crm.html / dashboard.html → dashboard-api [401 protégé ✓, déployé]
```

## ⚠️ Les 3 actions OWNER avant de lancer (P0)

1. **Les pubs doivent pointer sur `https://djibrilsylearn.systeme.io/quiz`** — PAS sur reset-ultra.com/quiz
   (= l'accueil servie par le fallback Cloudflare Pages, preuve : /chemin-inventé → même page 200).
   La VSL, elle, reste bien sur `https://reset-ultra.com/prochaine-etape`.
2. **Rafraîchir le token Cloudflare (droits Pages) OU `wrangler login`, puis relancer le déploiement**
   (le fix CTA-verrou est commité, prêt : `cd ~/agence-ia/djibril-ads-landing && ./deploy.sh`).
   Le token actuel est actif mais SANS droits Pages (comptes listés = 0, project GET = auth error 10000).
   NOTE : le site live est actuellement IDENTIQUE au code audité sain — rien n'est cassé en attendant.
3. **Nettoyer côté admin systeme.io** : le nextStepUrl du quiz = funnel template « Lorem ipsum »
   (copyandpast2-2529ee36 → thank-you par défaut). Non utilisé par le flux custom, mais toute
   automatisation systeme.io (email de suivi) y enverrait les leads.

## Fix livré ce soir (commit b624cc6, branche feat/une-page-vente)

- **Écran de verrouillage VSL n'était plus un cul-de-sac** : un lead qui revenait (retargeting Meta)
  voyait « 🔒 Vidéo déjà visionnée » sans AUCUN lien. Maintenant : CTA « Je réserve mon appel »
  (même URL copyandpast4 + même style), clic tracé `lock_cta_click`. Syntaxe node --check OK ×5 scripts.
- **DÉPLOIEMENT BLOQUÉ par le token CF** (voir action owner n°2). Commit local prêt.

## Points vérifiés SAINS (preuves)

- Dérive déploiement : NULLE (md5 live = local pour /prochaine-etape, /appel-booke, /temoignages, accueil).
- iclosed-notify : fail-closed POST (401 sans secret), claim atomique, retries ≤10 + double alerte owner, sendTg 3 réessais.
- Activité base fraîche : cartes Telegram réelles jusqu'au 21/08 (tg_msgs mid 3568), heartbeats poll ce soir.
- Fonts du quiz servies par reset-ultra.com (ru1p-bric 400/700/800 → 200 ✓).
- copyandpast4 : pixel Meta présent ×6 + iClosed + assets clients s01-s22 ✓.
- @diso93_bot (Hermes) et @Djaelysbot (leads/tracking) vivants via getMe ✓.

## Limites connues (décisions owner, pas bloquantes pour recevoir les leads)

- **Aucun pixel Meta sur le quiz lui-même** (ni sur la VSL) — les conversions remontent quand même
  côté serveur via le pont CAPI d'iclosed-notify (Showed/NoShow/Purchase, capi.live=true), mais le
  PageView/optimisation Meta ne voit pas le quiz. Amélioration : beacon de qualification (ticket atelier).
- **Le quiz capture 0 donnée serveur** : un qualifié qui ne booke pas = invisible. Amélioration idem beacon.
- vsl-son.js déployé mais référencé nulle part ; CSS .sticky-cta sans markup (hygiène).
- ⚠️ NE JAMAIS redéployer depuis reset-deploy/ ou landing-kais/ (vieille VSL du 18/07).

## Paramètres : ce qui casse si tu renommes (réponse à « je vais changer le nom du paramètre »)

- Renommer un **utm_*** → analytics muette (pas grave pour recevoir le lead).
- Renommer **src** → mauvais message CTA (wa vs booking), lead toujours reçu.
- Renommer **p**/**s** → le CRM perd la traçabilité vidéo du lead (video-events refuse sans signature),
  MAIS le booking iClosed et la carte Telegram sont INSENSIBLES aux paramètres : le lead arrive toujours.
