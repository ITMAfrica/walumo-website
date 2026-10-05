# Audit comparatif — andela.com vs Walumo (local)

*Page d'accueil, desktop 1440 px et mobile 390 px — 1er octobre 2026*

## Le constat en une phrase

Les deux pages ont **presque la même structure** : titre serif avec une accroche en italique, trois points cochés, cartes alternées texte/visuel, bandeau de chiffres sombre, grande phrase qui se révèle au scroll, articles, gros bandeau CTA et pied de page sombre. Andela n'est donc pas plus parlant grâce à sa mise en page. **Il l'est parce que chaque section apporte une preuve** : des clients connus, des personnes réelles, des chiffres de résultats. Le site Walumo, lui, passe surtout son temps à **décrire** ce que fait Walumo.

## 1. Mesures observées

| Indicateur | Andela | Walumo | Lecture |
| --- | --- | --- | --- |
| Hauteur de page (desktop) | 13 400 px | 10 800 px | Comparable |
| Mots dans le contenu | ~1 250 | ~1 030 | Comparable |
| Images / vidéos | 185 / 3 | 51 / 0 | Andela est beaucoup plus visuel et humain |
| Logos clients reconnaissables | J&J, Indeed, GitHub, Coursera, WPP, Goldman Sachs… | Uniquement des entités ITM | Écart majeur |
| Témoignages nommés | 4 (nom, poste, entreprise, logo) | 0 (« Customer stories coming soon ») | Écart majeur |
| Note externe | G2 4,7 ★ (329 avis) | Aucune | Écart |
| Étude de cas avec résultat chiffré | Oui (GitHub : « 3X ») | Non | Écart majeur |
| Personnes visibles (photos, prénoms) | Ingénieur en hero, Pablo N., photo à Nairobi, 11 profils « Formerly at IBM / Amazon… » | 1 photo d'atelier | Écart majeur |
| Chiffres clés | 17K ingénieurs certifiés · 200K+ formés · 98 % de satisfaction | 20+ pays · 3 plateformes · 23+ entreprises | Ceux d'Walumo décrivent le groupe ou l'offre, pas des résultats |
| CTA principal | « Book a discovery call » ×7, toujours en primaire | « Request a Demo » ×5, mais **en secondaire dans le hero** | Andela est plus cohérent |
| Signaux d'activité | Webinaire daté (7 oct.), articles de la semaine, « 90 964 abonnés » | Bandeau Hacklab sans date, newsletter sans chiffre | Andela paraît plus vivant |

## 2. Éléments observés, section par section

### Hero
- **Andela** : un humain au centre (ingénieur souriant) entouré de petites cartes produit (« 100 % Match », « AI Training Course », « Revenue Ops Agent »). L'image raconte l'offre sans qu'on ait à lire.
- **Walumo** : une capture de Kazi Pro **en français** (« Mes congés », « Congé annuel ») alors que tout le site est en anglais, avec des **données floutées** et un texte trop petit pour être lu. On a l'impression d'un produit pas fini ou d'informations cachées. Les deux mini-maquettes flottantes sont bonnes, mais elles restent abstraites.
- **Walumo** : « Explore Products » est en bouton principal et « Request a Demo » en secondaire (`app/page.tsx` : `primary={site.secondaryCta}`). Partout ailleurs sur la page, c'est l'inverse.
- Le titre « Business software built for African scale » est juste mais générique : il ne dit ni pour qui, ni quel résultat.

### Bandeau de logos
- **Andela** : des marques mondiales connues de tous, en défilement continu.
- **Walumo** : huit logos ITM qui se ressemblent tous à petite taille, sur fond sombre, avec la mention « proven inside the ITM Holding group ». Le visiteur voit **un seul client, répété**, et comprend que Walumo n'a pas encore de client externe.

### Preuve sociale
- **Andela** : un bloc entier « Trusted by tech leaders » avec la note G2 et quatre citations signées (Goldman Sachs, GitHub, The Weather Channel, ISG).
- **Walumo** : un encadré « Customer stories coming soon ». C'est honnête, mais **c'est le pire signal possible** sur une page d'accueil : il souligne qu'il n'y a pas de preuve.

### Chiffres
- **Andela** : trois chiffres de résultats, à côté de la photo d'une personne réelle à Nairobi.
- **Walumo** : « 20+ countries » décrit le périmètre d'ITM, « 3 platforms » est un nombre de produits, et seul « 23+ companies running Kazi Pro » constitue une vraie preuve.

### Corps de page
- **Walumo** enchaîne trois sections d'autodescription : « How Walumo delivers » (6 étapes), « What sets Walumo apart » (5 cartes) et « Services » (4 services). Deux titres se répètent presque mot pour mot :
  « Software, and the people to make it work » et « World-class software, and the people to run it ».
- **Andela** alterne les sections : offre → preuve → chiffres → partenaires → étude de cas → profils humains → articles. On ne lit jamais deux sections de « nous sommes… » d'affilée.
- **Point fort de Walumo, absent chez Andela** : la section douleurs (« Spreadsheets everywhere », « Work that runs on WhatsApp », « Tools that never talk »). Elle est très parlante pour la cible : **à garder**.

### Partenaires et écosystème
- **Andela** : « Learning partnerships » avec Google, Microsoft, NVIDIA, AWS, Meta et GitHub, ce qui donne de la crédibilité par association.
- **Walumo** : aucune intégration ni partenaire technologique n'est affiché.

### Mobile
- Les deux versions mobiles sont propres. Walumo affiche son titre et ses CTA dans le premier écran, alors que celui d'Andela est mangé par le bandeau cookies. **Pas d'enjeu majeur ici.**

## 3. Pistes d'amélioration (par priorité)

### Priorité 1 — Remplacer l'autodescription par des preuves (impact fort)

1. **Retirer « Customer stories coming soon »** et le remplacer par 2 à 3 témoignages internes ITM : par exemple un DRH d'ITM Kenya ou RDC et un responsable commercial, avec nom, poste, entité et photo. Un client interne nommé vaut mieux que zéro client.
2. **Écrire une étude de cas chiffrée** sur le déploiement de Kazi Pro dans le groupe : nombre d'employés gérés, nombre de pays, délai d'approbation des congés avant/après, heures RH économisées par mois. Puis la mettre en avant comme le fait Andela avec GitHub (« 3X »).
3. **Remplacer les chiffres « descriptifs » par des chiffres de résultats** : employés gérés dans Kazi Pro, demandes traitées, candidatures traitées dans Talent Pro, participants au Hacklab. Garder « 23+ companies ». Retirer « 3 platforms ».
4. **Retravailler le bandeau de logos** : afficher le nom du pays sous chaque logo ITM, ou le remplacer par une carte de l'Afrique avec les pays de déploiement (« Running in 20+ ITM entities across X countries »). Ajouter les logos de clients externes dès qu'il y en a un.

### Priorité 2 — Remettre de l'humain (impact fort, effort moyen)

5. **Refaire le visuel du hero** : une capture Kazi Pro **en anglais**, avec des données fictives propres plutôt que floutées. Idéalement, on y combine la photo d'une vraie personne (une RH ou un manager africain) avec les cartes flottantes, sur le modèle d'Andela.
6. **Mettre les photos du Hacklab sur l'accueil.** Il y en a une trentaine, réelles, dans `public/images/hackathon/`, mais elles n'apparaissent que sur la page événement. Elles peuvent illustrer le bandeau de chiffres, la section « ITM backing » ou une section « L'équipe ».
7. **Montrer l'équipe** : une rangée « Les personnes derrière Walumo » (prénom, rôle, ville). C'est l'équivalent des profils « Formerly at… » d'Andela.

### Priorité 3 — Clarifier le message et l'action (impact moyen, effort faible)

8. **Un seul CTA principal partout** : « Request a demo » en bouton plein dans le hero, et « Explore products » en secondaire.
9. **Le bouton WhatsApp ne doit plus mentir** : `WHATSAPP_NUMBER` est vide dans `lib/site.ts`, donc « WhatsApp Us » renvoie vers la page contact. Soit on renseigne le numéro, soit on masque le bouton du header jusque-là.
10. **Fusionner les trois sections d'autodescription** (« How Walumo delivers » + « What sets Walumo apart » + « Services ») en une seule, et supprimer le titre en doublon.
11. **Rendre le titre plus orienté résultat**, par exemple :
    « Run HR, hiring and sales on one platform — *built for how African companies work* ».

### Priorité 4 — Signaux de crédibilité complémentaires

12. **Intégrations et partenaires** : afficher les outils réellement connectés (WhatsApp Business, M-Pesa, Microsoft 365, outils de paie locaux…), **uniquement s'ils sont réels**.
13. **Signaux d'activité** : dater le bandeau Hacklab, donner un chiffre clé (« 120 participants, 15 projets »), et afficher le nombre d'abonnés à la newsletter quand il devient significatif.
14. **Vidéo produit de 60 à 90 secondes** sur Kazi Pro (Andela en a 3 sur sa page d'accueil).
15. **Version française** : une grande partie des entités ITM est francophone (RDC, Congo, Cameroun, Gabon, Togo, Burundi…) et Kazi Pro tourne déjà en français. Un site FR/EN serait un vrai avantage sur Andela, qui est uniquement en anglais.

## 4. Ce qu'il ne faut pas changer

- La structure et le design actuels : ils sont au niveau d'Andela.
- La section douleurs : c'est votre meilleure section.
- Les mini-maquettes produit (pipeline, entonnoir de recrutement, congés) : elles sont claires et lisibles.
- L'honnêteté sur les chiffres et les témoignages : il faut **remplacer** les blocs vides par de vraies preuves internes, pas inventer des clients.
