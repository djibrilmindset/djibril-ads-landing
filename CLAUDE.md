# CLAUDE.md — djibril-ads-landing (site reset-ultra.com + CRM + dashboard)

## Déployer
`./deploy.sh "message"` → Cloudflare Pages (reset-ultra.com, instantané) + GitHub Pages
(SEULEMENT si branche = main ; sinon le script le dit et ne pousse pas).
⚠️ Le repo git racine est HOME : jamais `git add -A`, toujours des chemins explicites.

## Pages
`crm.html` (fiches leads, badges VSP 5 états, filtres) · `dashboard.html` (patron : KPI + carte
paie branchée sur dashboard-api `view=paie` — ne JAMAIS recalculer la paie côté client) ·
`prochaine-etape.html` (VSP Wistia, **6 occurrences** de l'id vidéo à changer ensemble — la 6e est
`POS_KEY='ruvid_pos_<id>'`, la clé de reprise de position ; ajoutée par 80b7a61 le 06/09 — rater
cette clé = reprise indexée sur l'ancien média, silencieusement morte).

## Pièges
- Cloudflare Pages : `_headers` vit HORS repo (`~/agence-ia/reset-deploy/_headers`), réinjecté
  par deploy.sh ; une route 200 ne prouve pas la page (vérifier le CONTENU servi, cache-buster).
- Les liens d'accès sont signés HMAC via `dashboard-api?action=tokens` (service_role requis).
