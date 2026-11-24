(function(){
  var fiche=document.getElementById('fiche'),lastM=null;
  function ouvrir(m){
    lastM=m;
    document.getElementById('fiche-nom').textContent=m.querySelector('b').textContent;
    document.getElementById('fiche-role').textContent=m.querySelector('span').textContent;
    document.getElementById('fiche-desc').textContent=m.getAttribute('data-desc')||'';
    var im=m.querySelector('img'),fp=fiche.querySelector('.ph');
    fp.classList.toggle('photo',!!im);
    fp.innerHTML=im?'<img src="'+im.getAttribute('src')+'" alt="" style="object-position:'+im.style.objectPosition+'">':'[PHOTO]';
    if(fiche.showModal){fiche.showModal();}else{fiche.setAttribute('open','');}
  }
  function fini(){
    fiche.classList.remove('closing');
    if(fiche.close){fiche.close();}else{fiche.removeAttribute('open');}
    if(lastM)lastM.focus();
  }
  function fermer(){
    if(fiche.classList.contains('closing'))return;
    var calme=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(calme){fini();return;}
    fiche.classList.add('closing');
    var fait=false;
    function une(){if(fait)return;fait=true;fiche.removeEventListener('animationend',fin);fini();}
    function fin(e){if(e.target===fiche)une();}
    fiche.addEventListener('animationend',fin);
    setTimeout(une,450);
  }
  fiche.addEventListener('cancel',function(e){e.preventDefault();fermer();});
  document.querySelectorAll('.member').forEach(function(m){
    m.addEventListener('click',function(){ouvrir(m);});
    m.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();ouvrir(m);}});
  });
  document.getElementById('fiche-x').addEventListener('click',fermer);
  fiche.addEventListener('click',function(e){if(e.target===fiche)fermer();});
  var burger=document.getElementById('burger'),nav=document.getElementById('nav');
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.addEventListener('click',function(e){
    if(e.target.closest('a')){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');}
  });
  function fermerMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');}
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){fermerMenu();burger.focus();}});
  document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!e.target.closest('.top'))fermerMenu();});
  window.addEventListener('resize',function(){if(window.innerWidth>900)fermerMenu();});
  var top=document.querySelector('.top'),lastY=window.pageYOffset,ticking=false;
  function onScroll(){
    var y=window.pageYOffset;
    if(nav.classList.contains('open')||y<80||y<lastY-4){top.classList.remove('hide');}
    else if(y>lastY+4){top.classList.add('hide');}
    lastY=y;ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});
  top.addEventListener('focusin',function(){top.classList.remove('hide');});
  var ZSEL='.sec-head,.member,.post,.contact .info,.contact form,footer .wrap,.hsec .wrap>h2,.hrow,.help a,.circ>*,.dep-intro,.dep-h,.tv-item,.dep-cta';
  var zs=Array.prototype.slice.call(document.querySelectorAll(ZSEL));
  var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var zt=false;
  function zoom(){
    var vh=window.innerHeight,s0=window.innerWidth<=900?0.95:0.86;
    zs.forEach(function(el){
      var r=el.getBoundingClientRect();
      var t=(vh-r.top)/(vh*0.55);
      t=t<0?0:t>1?1:t;
      t=1-Math.pow(1-t,3);
      el.style.scale=(s0+(1-s0)*t).toFixed(3);
      el.style.opacity=(0.25+0.75*t).toFixed(3);
    });
    zt=false;
  }
  if(!calm){
    window.addEventListener('scroll',function(){if(!zt){zt=true;requestAnimationFrame(zoom);}},{passive:true});
    window.addEventListener('resize',zoom);
    zoom();
  }
  var links=Array.prototype.slice.call(nav.querySelectorAll('a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        links.forEach(function(l){
          if(idDe(l)===en.target.id){l.setAttribute('aria-current','true');}
          else{l.removeAttribute('aria-current');}
        });
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    links.forEach(function(l){
      var s=document.getElementById(idDe(l));
      if(s)io.observe(s);
    });
  }
  var LANG='fr';
  try{var sl=localStorage.getItem('lang');if(sl==='en'||sl==='fr')LANG=sl;}catch(e){}
  var EN={
    "Accueil":"Home",
    "Mon équipe":"My team",
    "Actualité":"News",
    "Ressources":"Resources",
    "Langue":"Language",
    "Maïté Blanchette Vézina, députée de La Peltrie":"Maïté Blanchette Vézina, MNA for La Peltrie",
    "Avocate de formation et ancienne mairesse de Sainte-Luce et ancienne ministre, Maïté Blanchette Vézina possède une expérience en droit, en gestion et en politique municipale. Elle souhaite demeurer proche des citoyens et à l’écoute des gens de La Peltrie.":"Lawyer by training, former mayor of Sainte-Luce and former minister, Maïté Blanchette Vézina has experience in law, management and municipal politics. She wants to stay close to citizens and listen to the people of La Peltrie.",
    "Maïté Blanchette Vézina en conférence de presse, devant des drapeaux du Québec":"Maïté Blanchette Vézina speaking at a press conference in front of Québec flags",
    "Courriel":"Email",
    "Comment je peux vous aider":"How I can help you",
    "Un dossier bloqué dans un ministère":"A file stuck in a ministry",
    "Le bureau intervient auprès du ministère ou de l'organisme.":"The office steps in with the ministry or agency.",
    "Programmes et subventions":"Programs and grants",
    "Trouver le bon programme et appuyer votre demande.":"Find the right program and support your application.",
    "Aînés et proches aidants":"Seniors and caregivers",
    "Crédits d'impôt, soutien à domicile et répit.":"Tax credits, home support and respite.",
    "Entreprises et agriculture":"Business and agriculture",
    "Aide financière, relève agricole et démarches.":"Financial assistance, farm succession and paperwork.",
    "Familles, études, logement":"Families, studies, housing",
    "Allocation-logement, prêts et bourses, allocation famille.":"Housing allowance, student loans and bursaries, family allowance.",
    "Dernières nouvelles":"Latest news",
    "Toutes les nouvelles →":"All news →",
    "La circonscription":"The riding",
    "La circonscription électorale de La Peltrie a été créée en 1980 dans la région de la Capitale-Nationale. Elle comprend notamment une partie de la ville de Québec et la ville de L’Ancienne-Lorette.":"The electoral district of La Peltrie was created in 1980 in the Capitale-Nationale region. It includes part of Québec City and the city of L’Ancienne-Lorette.",
    "Sa dénomination rappelle la mémoire de Marie-Madeleine de Chauvigny de La Peltrie (1603-1671), qui vint à Québec en 1639 et fonda le couvent des Ursulines de Québec, dont la première pierre fut posée en 1641. Elle a été mariée au chevalier de Gruel, seigneur de La Peltrie, duquel elle tenait son nom. Devenue veuve à l’âge de 22 ans, elle consacra sa vie au service et à la conversion des femmes autochtones de Québec, avec Marie Guyart dite Marie de l’Incarnation. Marie-Madeleine de Chauvigny de La Peltrie collabora avec Paul de Chomedey de Maisonneuve à la fondation de Montréal, où elle séjourna pendant près de deux ans.":"Its name honours the memory of Marie-Madeleine de Chauvigny de La Peltrie (1603–1671), who came to Québec in 1639 and founded the Ursuline convent of Québec, whose cornerstone was laid in 1641. She had married the Chevalier de Gruel, Seigneur de La Peltrie, from whom she took her name. Widowed at the age of 22, she devoted her life to serving and converting Indigenous women of Québec, together with Marie Guyart, known as Marie de l’Incarnation. Marie-Madeleine de Chauvigny de La Peltrie worked with Paul de Chomedey de Maisonneuve on the founding of Montréal, where she stayed for nearly two years.",
    "Joindre le bureau →":"Contact the office →",
    "Limites officielles de la circonscription de La Peltrie et ses principales municipalités et secteurs":"Official boundaries of the La Peltrie riding and its main municipalities and areas",
    "Les personnes qui répondent à vos appels, reçoivent vos courriels et font avancer vos dossiers au bureau de circonscription.":"The people who answer your calls, receive your emails and move your files forward at the constituency office.",
    "Responsable du bureau de circonscription":"Constituency office manager",
    "Co-responsable du bureau de circonscription":"Constituency office co-manager",
    "Attaché politique":"Political attaché",
    "Fermer":"Close",
    "[courriel]":"[email]",
    "Téléphone":"Phone",
    "[téléphone]":"[phone]",
    "Bureau":"Office",
    "[adresse du bureau de circonscription]":"[constituency office address]",
    "Annonces, communiqués et rendez-vous de la députée, dans la circonscription et sur la colline parlementaire.":"Announcements, press releases and appointments of the MNA, in the riding and on Parliament Hill in Québec City.",
    "Filtrer les nouvelles":"Filter news",
    "← Toutes les nouvelles":"← All news",
    "Choisissez votre situation. Le bureau vous oriente, ou fait la démarche avec vous.":"Choose your situation. The office will guide you, or go through the process with you.",
    "Le bureau intervient auprès du ministère ou de l'organisme concerné.":"The office steps in with the ministry or agency concerned.",
    "Comment le bureau intervient":"How the office steps in",
    "Le bureau de circonscription reçoit les demandes des citoyens qui ont du mal à accéder à un programme du gouvernement ou qui veulent porter plainte à l'égard d'un ministère ou d'un organisme. Nous prenons votre dossier en charge, joignons la bonne personne et faisons le suivi avec vous.":"The constituency office receives requests from citizens who have trouble accessing a government program or who want to file a complaint about a ministry or agency. We take charge of your file, reach the right person and follow up with you.",
    "À préparer avant de nous joindre":"What to prepare before contacting us",
    "Votre numéro de dossier, les lettres ou courriels reçus, les dates importantes et une courte description du problème. Si un délai de recours court, mentionnez-le dès le premier contact.":"Your file number, the letters or emails received, important dates and a short description of the problem. If an appeal deadline is running, mention it at first contact.",
    "Exemples de dossiers":"Examples of files",
    "Aide financière aux études, SAAQ, Revenu Québec, aide sociale et Emploi-Québec, RAMQ, CNESST, Retraite Québec.":"Student financial aid, SAAQ, Revenu Québec, social assistance and Emploi-Québec, RAMQ, CNESST, Retraite Québec.",
    "Liste des ministères et organismes ↗":"List of ministries and agencies ↗",
    "Contacter le bureau":"Contact the office",
    "Repérer le bon programme et appuyer votre demande.":"Find the right program and support your application.",
    "Comment on vous aide":"How we help",
    "Le bureau vous aide à repérer le programme qui correspond à votre projet, à vérifier si vous y êtes admissible et à joindre la bonne personne au ministère. Il peut aussi appuyer votre demande.":"The office helps you identify the program that fits your project, check whether you are eligible and reach the right person at the ministry. It can also support your application.",
    "Avant de déposer":"Before applying",
    "Lisez les critères et les dates limites du programme, rassemblez vos pièces justificatives (budget, soumissions, preuves de constitution pour un organisme) et gardez une copie de tout ce que vous envoyez.":"Read the program’s criteria and deadlines, gather your supporting documents (budget, quotes, proof of incorporation for an organization) and keep a copy of everything you send.",
    "Organismes et municipalités":"Organizations and municipalities",
    "Le bureau peut vous orienter vers les programmes qui s'adressent aux organismes communautaires, aux municipalités et aux projets de la circonscription.":"The office can point you to programs for community organizations, municipalities and projects in the riding.",
    "Crédits d'impôt, soutien à domicile et ressources pour les proches aidants.":"Tax credits, home support and resources for caregivers.",
    "Crédits d'impôt":"Tax credits",
    "Plusieurs crédits remboursables peuvent s'appliquer : maintien à domicile des aînés, soutien aux aînés, solidarité et personne aidante. Revenu Québec en détaille les conditions.":"Several refundable credits may apply: home support for seniors, support for seniors, solidarity and caregiver credits. Revenu Québec details the conditions.",
    "Soutien à domicile":"Home support",
    "Pour les services à domicile et le répit, le point de départ est le CLSC de votre secteur, au CIUSSS de la Capitale-Nationale. Le bureau peut intervenir si vous vous butez à des délais ou à un refus.":"For home services and respite, the starting point is your local CLSC, part of the CIUSSS de la Capitale-Nationale. The office can step in if you run into delays or a refusal.",
    "Pour les proches aidants":"For caregivers",
    "Québec.ca regroupe les mesures d'aide financière et les ressources destinées aux personnes proches aidantes, et Proche aidance Québec offre du soutien.":"Québec.ca gathers the financial assistance measures and resources for caregivers, and Proche aidance Québec offers support.",
    "Crédit d'impôt pour maintien à domicile ↗":"Home support tax credit ↗",
    "Personnes proches aidantes ↗":"Caregivers ↗",
    "Aide financière, relève agricole et démarches auprès des ministères.":"Financial assistance, farm succession and dealings with ministries.",
    "La Financière agricole du Québec administre notamment le Programme Investissement Croissance Durable et le Programme d'appui financier à la relève agricole. Le MAPAQ tient la liste de ses programmes d'aide financière. La Financière agricole : 1 800 749-3646.":"La Financière agricole du Québec administers, among others, the Programme Investissement Croissance Durable and the Programme d’appui financier à la relève agricole. MAPAQ keeps the list of its financial assistance programs. La Financière agricole: 1 800 749-3646.",
    "Entreprises":"Businesses",
    "Pour les entreprises non agricoles, Investissement Québec et Services Québec sont les premiers interlocuteurs. Le bureau peut faciliter vos démarches auprès des ministères (permis, autorisations, aides).":"For non-agricultural businesses, Investissement Québec and Services Québec are the first points of contact. The office can help with your dealings with ministries (permits, authorizations, assistance).",
    "Avant de commencer":"Before you start",
    "Rassemblez vos états financiers, vos soumissions et une description du projet. Chaque programme a ses propres conditions et dates limites.":"Gather your financial statements, quotes and a description of the project. Each program has its own conditions and deadlines.",
    "MAPAQ : soutien financier ↗":"MAPAQ: financial support ↗",
    "Logement":"Housing",
    "L'allocation-logement de Revenu Québec peut atteindre 170 $ par mois pour la période du 1er octobre 2026 au 30 septembre 2027. L'admissibilité dépend notamment du revenu familial et de la situation de logement. La demande se fait en ligne ou avec le formulaire LEX-165. Revenu Québec : 418 266-1016.":"Revenu Québec’s housing allowance can reach $170 per month for the period from October 1, 2026 to September 30, 2027. Eligibility depends in particular on family income and housing situation. The application is made online or with form LEX-165. Revenu Québec: 418 266-1016.",
    "Études":"Studies",
    "La demande de prêts et bourses 2026-2027 se fait dans Mon dossier d'aide financière aux études. Service à la clientèle : 418 643-3750 (Québec) ou 1 877 643-3750 (sans frais).":"The 2026–2027 student loans and bursaries application is made in Mon dossier d’aide financière aux études. Customer service: 418 643-3750 (Québec City) or 1 877 643-3750 (toll-free).",
    "Familles":"Families",
    "L'Allocation famille est administrée par Retraite Québec. Si un paiement tarde ou si votre dossier est bloqué, le bureau peut intervenir.":"The Allocation famille is administered by Retraite Québec. If a payment is late or your file is stuck, the office can step in.",
    "Allocation-logement ↗":"Housing allowance ↗",
    "Aide financière aux études ↗":"Student financial aid ↗",
    "Une question, un problème, une invitation? Écrivez au bureau de circonscription.":"A question, a problem, an invitation? Write to the constituency office.",
    "Adresse":"Address",
    "Heures d’ouverture":"Opening hours",
    "Lundi au jeudi":"Monday to Thursday",
    "8 h 30 – 12 h":"8:30 a.m. – 12:00 p.m.",
    "13 h – 16 h 30":"1:00 – 4:30 p.m.",
    "Vendredi":"Friday",
    "Samedi et dimanche":"Saturday and Sunday",
    "Fermé":"Closed",
    "Carte : bureau de circonscription, 5121 boulevard Chauveau Ouest, Québec":"Map: constituency office, 5121 boulevard Chauveau Ouest, Québec",
    "Suivez-moi":"Follow me",
    "Politique de confidentialité":"Privacy policy",
    "Termes et conditions":"Terms and conditions",
    "© 2026 Maïté Blanchette Vézina. Tous droits réservés.":"© 2026 Maïté Blanchette Vézina. All rights reserved.",
    "Questions fréquentes":"Frequently asked questions",
    "Comment le bureau peut-il m’aider?":"How can the office help me?",
    "Si un dossier est bloqué dans un ministère ou un organisme, si vous cherchez le bon programme ou si vous voulez porter plainte, le bureau prend votre dossier en charge, joint la bonne personne et fait le suivi avec vous.":"If a file is stuck in a ministry or agency, if you are looking for the right program or if you want to file a complaint, the office takes charge of your file, reaches the right person and follows up with you.",
    "Voir les ressources →":"See the resources →",
    "Comment savoir si j’habite dans la circonscription?":"How do I know if I live in the riding?",
    "Entrez votre code postal dans l’outil d’Élections Québec pour connaître votre circonscription.":"Enter your postal code in the Élections Québec tool to find your riding.",
    "Vérifier sur le site d’Élections Québec →":"Check on the Élections Québec website →",
    "Que dois-je préparer avant de contacter le bureau?":"What should I prepare before contacting the office?",
    "Comment joindre le bureau?":"How do I reach the office?",
    "Par téléphone au 418 877-5260, par courriel à maite.blanchettevezina.LAPE@assnat.qc.ca ou en personne au 5121 Bd Chauveau O, local 201, à Québec. Le bureau est ouvert du lundi au jeudi de 8 h 30 à 12 h et de 13 h à 16 h 30, et le vendredi de 8 h 30 à 12 h.":"By phone at 418 877-5260, by email at maite.blanchettevezina.LAPE@assnat.qc.ca or in person at 5121 Bd Chauveau O, suite 201, in Québec City. The office is open Monday to Thursday from 8:30 a.m. to 12:00 p.m. and from 1:00 p.m. to 4:30 p.m., and on Friday from 8:30 a.m. to 12:00 p.m.",
    "Page Contact →":"Contact page →",
    "Les services du bureau sont-ils gratuits?":"Are the office’s services free?",
    "Oui, les services du bureau de circonscription sont gratuits.":"Yes, the constituency office’s services are free of charge.",
    "La députée":"The MNA",
    "Avocate, ancienne mairesse et ancienne ministre : le parcours de Maïté Blanchette Vézina.":"Lawyer, former mayor and former minister: the story of Maïté Blanchette Vézina.",
    "Née à Montmagny en 1985, Maïté Blanchette Vézina est avocate de formation. Ancienne mairesse de Sainte-Luce et ancienne ministre, elle représente La Peltrie à l’Assemblée nationale depuis octobre 2026.":"Born in Montmagny in 1985, Maïté Blanchette Vézina is a lawyer by training. A former mayor of Sainte-Luce and former cabinet minister, she has represented La Peltrie in the National Assembly since October 2026.",
    "Parcours":"Career",
    "Née à Montmagny":"Born in Montmagny",
    "Maïté Blanchette Vézina naît à Montmagny, en Chaudière-Appalaches.":"Maïté Blanchette Vézina is born in Montmagny, in the Chaudière-Appalaches region.",
    "Études à l’Université Laval":"Studies at Université Laval",
    "Elle obtient un certificat en communication publique (2007), puis un baccalauréat en droit (2009). Elle est admise au Barreau du Québec en 2010.":"She earns a certificate in public communication (2007), then a law degree (2009). She is called to the Barreau du Québec in 2010.",
    "Avocate chez DS Avocats":"Lawyer at DS Avocats",
    "Elle y commence sa pratique en droit des affaires.":"She begins her business law practice there.",
    "Avocate dans le Bas-Saint-Laurent":"Lawyer in the Lower St. Lawrence",
    "Elle exerce chez Avocats BSL. De 2013 à 2017, elle est aussi conférencière et formatrice en droit des entreprises dans le programme Lancement d’une entreprise, avec le Centre de formation Rimouski-Neigette, l’UQAR et le Cégep de Rimouski. De 2014 à 2017, elle préside le conseil d’administration de l’École de danse Quatre Temps.":"She practises at Avocats BSL. From 2013 to 2017, she is also a speaker and trainer in business law for the Lancement d’une entreprise program, with the Centre de formation Rimouski-Neigette, UQAR and the Cégep de Rimouski. From 2014 to 2017, she chairs the board of the École de danse Quatre Temps.",
    "Mairesse de Sainte-Luce":"Mayor of Sainte-Luce",
    "Élue en novembre 2017, elle préside aussi le conseil d’administration du Transport adapté et collectif de La Mitis (2018–2021) et siège au Comité des jeunes élus de la Fédération québécoise des municipalités (2020–2021).":"Elected in November 2017, she also chairs the board of Transport adapté et collectif de La Mitis (2018–2021) and sits on the Young Elected Officials Committee of the Fédération québécoise des municipalités (2020–2021).",
    "À la tête d’Idéal Légal":"At the helm of Idéal Légal",
    "En parallèle de son mandat de mairesse, elle est avocate et présidente-directrice générale d’Idéal Légal.":"Alongside her term as mayor, she is a lawyer and president and CEO of Idéal Légal.",
    "Directrice régionale à Centraide":"Regional director at Centraide",
    "Elle est directrice régionale du Bas-Saint-Laurent pour Centraide Québec, Chaudière-Appalaches et Bas-Saint-Laurent, et administratrice du Musée régional de Rimouski. En 2021, elle cosigne l’ouvrage 11 brefs essais pour des villes résilientes et durables (éditions Somme toute).":"She is regional director for the Lower St. Lawrence at Centraide Québec, Chaudière-Appalaches et Bas-Saint-Laurent, and a board member of the Musée régional de Rimouski. In 2021, she co-authors 11 brefs essais pour des villes résilientes et durables (éditions Somme toute).",
    "Élue députée de Rimouski":"Elected MNA for Rimouski",
    "Candidate de la Coalition avenir Québec, elle remporte la circonscription avec 41,75 % des voix. Le siège était auparavant détenu par le Parti québécois.":"Running for the Coalition avenir Québec, she wins the riding with 41.75% of the vote. The seat had previously been held by the Parti québécois.",
    "Ministre des Ressources naturelles et des Forêts":"Minister of Natural Resources and Forests",
    "Elle est aussi ministre responsable des régions du Bas-Saint-Laurent et de la Gaspésie–Îles-de-la-Madeleine. Elle quitte le Conseil des ministres lors du remaniement de septembre 2025.":"She is also the minister responsible for the Lower St. Lawrence and Gaspésie–Îles-de-la-Madeleine regions. She leaves cabinet in the September 2025 shuffle.",
    "Députée indépendante":"Independent MNA",
    "Environ une semaine après avoir quitté le cabinet, elle quitte le caucus de la CAQ en dénonçant que les régions sont laissées de côté. Elle siège comme indépendante pour Rimouski.":"About a week after leaving cabinet, she leaves the CAQ caucus, saying the regions are being sidelined. She sits as an independent for Rimouski.",
    "Passage au Parti conservateur du Québec":"Joining the Conservative Party of Québec",
    "Elle se joint au parti d’Éric Duhaime et annonce qu’elle se présentera dans La Peltrie. Elle devient la seule élue conservatrice à l’Assemblée nationale.":"She joins Éric Duhaime’s party and announces she will run in La Peltrie. She becomes the only Conservative member of the National Assembly.",
    "Élue députée de La Peltrie":"Elected MNA for La Peltrie",
    "Elle remporte La Peltrie, et le Parti conservateur fait élire 19 députés. Le 7 octobre, Éric Duhaime la nomme leader parlementaire du parti, qui forme le deuxième groupe d’opposition.":"She wins La Peltrie, and the Conservative Party elects 19 MNAs. On October 7, Éric Duhaime names her the party’s parliamentary leader; the party forms the second opposition group.",
    "À propos de la députée":"About the MNA",
    "3 octobre 2022":"October 3, 2022",
    "20 octobre 2022 – 10 septembre 2025":"October 20, 2022 – September 10, 2025",
    "18 septembre 2025":"September 18, 2025",
    "24 mars 2026":"March 24, 2026",
    "5 octobre 2026":"October 5, 2026",
    "Comment ce site traite vos renseignements personnels.":"How this website handles your personal information.",
    "Les règles qui encadrent l’utilisation de ce site.":"The rules governing the use of this website.",
    "Tout":"All",
    "Lire →":"Read →",
    "Aucune nouvelle pour le moment.":"No news at the moment.",
    "Chargement…":"Loading…",
    "Article introuvable":"Article not found",
    "Cette nouvelle n’existe pas ou a été retirée.":"This news item does not exist or has been removed.",
    "Circonscription":"Riding",
    "Assemblée nationale":"National Assembly",
    "[Exemple] Titre de la première nouvelle":"[Example] Title of the first news item",
    "[Exemple] Titre de la deuxième nouvelle":"[Example] Title of the second news item",
    "[Exemple] Titre de la troisième nouvelle":"[Example] Title of the third news item",
    "[Deux lignes de résumé qui disent ce que ça change pour les gens.]":"[Two lines of summary saying what this changes for people.]",
    "[Deux lignes de résumé.]":"[Two lines of summary.]",
    "[Intertitre]":"[Subheading]",
    "[Premier paragraphe de l’article.]":"[First paragraph of the article.]",
    "[Deuxième paragraphe de l’article.]":"[Second paragraph of the article.]",
    "[Description : parcours, rôle au bureau, dossiers dont elle s'occupe, comment la joindre.]":"[Description: background, role at the office, files she handles, how to reach her.]",
    "[Description : parcours, rôle au bureau, dossiers dont il s'occupe, comment le joindre.]":"[Description: background, role at the office, files he handles, how to reach him.]",
    "[Description : parcours, rôle auprès de la députée, dossiers dont il s'occupe, comment le joindre.]":"[Description: background, role with the MNA, files he handles, how to reach him.]"
  };
  function T(s){return LANG==='en'&&EN[s]!=null?EN[s]:s;}
  function pick(a,k){
    if(LANG==='en'){var e=a[k+'_en'];if(e!=null&&e!=='')return e;if(k!=='contenu')return T(a[k]);}
    return a[k];
  }
  var ORIG=new WeakMap(),ATTS=['alt','placeholder','aria-label','title','data-desc'];
  function traduireDOM(){
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
    while((n=w.nextNode())){
      var pn=n.parentNode&&n.parentNode.nodeName;
      if(pn==='SCRIPT'||pn==='STYLE')continue;
      var o=ORIG.get(n);
      if(o===undefined){
        var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(n.nodeValue);
        o=m[2]?{a:m[1],k:m[2].replace(/\s+/g,' '),z:m[3],raw:n.nodeValue}:null;
        ORIG.set(n,o);
      }
      if(!o)continue;
      var v=LANG==='en'?EN[o.k]:null,nv=v!=null?o.a+v+o.z:o.raw;
      if(n.nodeValue!==nv)n.nodeValue=nv;
    }
    document.querySelectorAll('[alt],[placeholder],[aria-label],[title],[data-desc]').forEach(function(el){
      ATTS.forEach(function(at){
        if(!el.hasAttribute(at))return;
        var key='data-fr-'+at;
        if(!el.hasAttribute(key))el.setAttribute(key,el.getAttribute(at));
        var fr=el.getAttribute(key),v=LANG==='en'?EN[fr.replace(/\s+/g,' ').trim()]:null;
        el.setAttribute(at,v!=null?v:fr);
      });
    });
    document.documentElement.lang=LANG;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-l')===LANG?'true':'false');});
  }
  function appliquerLang(){
    if(ARTS)rendreNouvelles();
    courant=null;route(true);
    traduireDOM();
  }
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click',function(){
      var l=b.getAttribute('data-l');
      if(l===LANG)return;
      LANG=l;
      try{localStorage.setItem('lang',l);}catch(e){}
      appliquerLang();
    });
  });
  (function(){
    var items=[].slice.call(document.querySelectorAll('.faq details'));
    var reduit=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
    function anime(d,ouvre){
      var c=d.querySelector('.fa');
      if(d._a){d._a.cancel();d._a=null;c.style.overflow='';if(d._ferme){d.open=false;d._ferme=false;}}
      if(ouvre){
        d.open=true;
        if(reduit)return;
        var h=c.offsetHeight;
        c.style.overflow='hidden';
        d._a=c.animate([{height:'0px',paddingBottom:'0px',opacity:0},{height:h+'px',paddingBottom:'28px',opacity:1}],{duration:380,easing:'cubic-bezier(.2,.7,.2,1)'});
        d._a.onfinish=function(){d._a=null;c.style.overflow='';};
      }else{
        if(reduit){d.open=false;return;}
        var h2=c.offsetHeight;
        c.style.overflow='hidden';
        d._ferme=true;
        d._a=c.animate([{height:h2+'px',paddingBottom:'28px',opacity:1},{height:'0px',paddingBottom:'0px',opacity:0}],{duration:300,easing:'cubic-bezier(.4,0,.2,1)'});
        d._a.onfinish=function(){d._a=null;d._ferme=false;d.open=false;c.style.overflow='';};
      }
    }
    items.forEach(function(d){
      d.querySelector('summary').addEventListener('click',function(e){
        e.preventDefault();
        var ouvert=d.open&&!d._ferme;
        if(ouvert){anime(d,false);return;}
        items.forEach(function(o){if(o!==d&&o.open&&!o._ferme)anime(o,false);});
        anime(d,true);
      });
    });
  })();
  var CH=!!window.CHEMINS,BASE=window.BASE||'/';
  function lien(r){return CH?BASE+r:'#'+r;}
  var MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  var EXEMPLES=[
    {titre:'[Exemple] Titre de la première nouvelle',date:'2026-11-12',categorie:'Circonscription',resume:'[Deux lignes de résumé qui disent ce que ça change pour les gens.]',image:'',lien:'exemple-premiere-nouvelle',contenu:['## [Intertitre]','[Premier paragraphe de l’article.]','[Deuxième paragraphe de l’article.]']},
    {titre:'[Exemple] Titre de la deuxième nouvelle',date:'2026-11-05',categorie:'Assemblée nationale',resume:'[Deux lignes de résumé.]',image:'',lien:'exemple-deuxieme-nouvelle',contenu:['[Premier paragraphe de l’article.]','[Deuxième paragraphe de l’article.]']},
    {titre:'[Exemple] Titre de la troisième nouvelle',date:'2026-10-28',categorie:'Circonscription',resume:'[Deux lignes de résumé.]',image:'',lien:'exemple-troisieme-nouvelle',contenu:['[Premier paragraphe de l’article.]']}
  ];
  var ARTS=null,filtre='all';
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  var MOISEN=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function dateFr(d){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(d||'');if(!m)return esc(d);if(LANG==='en')return MOISEN[+m[2]-1]+' '+(+m[3])+', '+m[1];return (+m[3])+(m[3]==='01'?'er':'')+' '+MOIS[+m[2]-1]+' '+m[1];}
  function carte(a){
    var img=a.image?'<img src="'+esc(a.image)+'" alt="" loading="lazy">':'';
    return '<a class="post" href="'+lien('actualite/'+encodeURIComponent(a.lien))+'"><div class="thumb">'+img+'</div><div class="pbody"><small>'+esc(pick(a,'categorie'))+'</small><h3>'+esc(pick(a,'titre'))+'</h3><p>'+esc(pick(a,'resume'))+'</p><div class="pfoot"><time datetime="'+esc(a.date)+'">'+dateFr(a.date)+'</time><span class="more">'+T('Lire →')+'</span></div></div></a>';
  }
  function rendreNouvelles(){
    if(!ARTS)return;
    var liste=document.getElementById('news'),acc=document.getElementById('home-news'),ch=document.getElementById('chips');
    function catLabel(c){if(LANG==='en'){for(var i=0;i<ARTS.length;i++){if(ARTS[i].categorie===c&&ARTS[i].categorie_en)return ARTS[i].categorie_en;}}return T(c);}
    var cats=[];ARTS.forEach(function(a){if(a.categorie&&cats.indexOf(a.categorie)<0)cats.push(a.categorie);});
    if(cats.indexOf(filtre)<0)filtre='all';
    if(ch)ch.innerHTML=['all'].concat(cats).map(function(c){return '<button class="chip" type="button" data-filter="'+esc(c)+'" aria-pressed="'+(c===filtre?'true':'false')+'">'+(c==='all'?T('Tout'):esc(catLabel(c)))+'</button>';}).join('');
    if(liste){var vis=ARTS.filter(function(a){return filtre==='all'||a.categorie===filtre;});liste.innerHTML=vis.length?vis.map(carte).join(''):'<p class="vide">'+T('Aucune nouvelle pour le moment.')+'</p>';}
    if(acc)acc.innerHTML=ARTS.slice(0,3).map(carte).join('');
    traduireDOM();
    zs=Array.prototype.slice.call(document.querySelectorAll(ZSEL));
    if(!calm)zoom();
  }
  var chEl=document.getElementById('chips');
  if(chEl)chEl.addEventListener('click',function(e){
    var b=e.target.closest?e.target.closest('.chip'):null;
    if(!b)return;
    filtre=b.getAttribute('data-filter');
    rendreNouvelles();
  });
  function corps(c){
    var l=Array.isArray(c)?c:String(c||'').split(/\n{2,}/);
    return l.map(function(p){
      p=String(p).trim();
      if(!p)return '';
      if(p.indexOf('## ')===0)return '<h3>'+esc(p.slice(3))+'</h3>';
      return '<p>'+esc(p).replace(/\n/g,'<br>')+'</p>';
    }).join('');
  }
  function renderArticle(slug){
    var el=document.getElementById('art-contenu'),hd=document.getElementById('art-head');
    if(!el||!hd)return;
    if(!ARTS){el.innerHTML='<p>'+T('Chargement…')+'</p>';return;}
    var a=null;ARTS.forEach(function(x){if(x.lien===slug)a=x;});
    if(!a){hd.innerHTML='<div><h1>'+T('Article introuvable')+'</h1></div>';el.innerHTML='<p>'+T('Cette nouvelle n’existe pas ou a été retirée.')+'</p>';document.title=T('Article introuvable')+' — '+NOM;return;}
    hd.innerHTML='<div><small>'+esc(pick(a,'categorie'))+'</small><h1>'+esc(pick(a,'titre'))+'</h1><time datetime="'+esc(a.date)+'">'+dateFr(a.date)+'</time></div>';
    el.innerHTML=(a.image?'<img class="art-img" src="'+esc(a.image)+'" alt="">':'')+'<div class="art-body">'+corps(pick(a,'contenu'))+'</div>';
    document.title=pick(a,'titre')+' — '+NOM;
  }
  function trier(l){
    return l.filter(function(a){return a&&a.titre&&a.lien;}).sort(function(a,b){return String(b.date).localeCompare(String(a.date));});
  }
  function apresChargement(l){
    ARTS=trier(l);
    rendreNouvelles();
    if(courant&&courant.indexOf('actualite/')===0)renderArticle(courant.slice(10));
  }
  function listeNoms(dos){
    dos=dos||'nouvelles';
    var h=location.hostname,m=/^([^.]+)\.github\.io$/.exec(h),api=null;
    if(m){
      var seg=(CH?BASE:location.pathname).split('/')[1]||'';
      var depot=(seg&&seg.indexOf('.')<0)?seg:h;
      api=fetch('https://api.github.com/repos/'+m[1]+'/'+depot+'/contents/'+dos)
        .then(function(r){if(!r.ok)throw 0;return r.json();})
        .then(function(l){return l.map(function(f){return f.name;}).filter(function(n){return /\.json$/.test(n)&&n!=='index.json';});});
    }
    if(!api)api=Promise.reject(0);
    return api.catch(function(){
      return fetch(dos+'/index.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json();});
    });
  }
  if(window.fetch){
    listeNoms()
      .then(function(noms){
        return Promise.all(noms.map(function(n){
          return fetch('nouvelles/'+n,{cache:'no-cache'}).then(function(r){return r.json();}).catch(function(){return null;});
        }));
      })
      .catch(function(){return EXEMPLES;})
      .then(apresChargement);
  }else{apresChargement(EXEMPLES);}
  var accs=document.querySelectorAll('.acc-h');
  accs.forEach(function(h){
    h.addEventListener('click',function(){
      var ouvert=h.getAttribute('aria-expanded')==='true';
      accs.forEach(function(x){x.setAttribute('aria-expanded','false');});
      h.setAttribute('aria-expanded',ouvert?'false':'true');
    });
  });
  (function(){
    var tv=document.getElementById('tv'),fill=document.getElementById('tvFill');if(!tv)return;
    var its=[].slice.call(tv.querySelectorAll('.tv-item')),tick=false;
    function maj(){
      tick=false;
      if(!tv.getClientRects().length)return;
      var box=tv.getBoundingClientRect(),y=window.innerHeight*0.5-box.top,h=Math.max(0,Math.min(box.height,y)),cur=-1;
      fill.style.height=h+'px';
      its.forEach(function(el,i){var ok=h>=el.offsetTop+22;el.classList.toggle('reached',ok);if(ok)cur=i;});
      its.forEach(function(el,i){el.classList.toggle('current',i===cur);});
    }
    function dem(){if(!tick){tick=true;requestAnimationFrame(maj);}}
    window.addEventListener('scroll',dem,{passive:true});
    window.addEventListener('resize',dem);
    window.addEventListener('hashchange',function(){setTimeout(maj,60);setTimeout(maj,450);});
    setTimeout(maj,400);
  })();
  var PAGES={accueil:'Accueil',depute:'La députée',equipe:'Mon équipe',actualite:'Actualité',ressources:'Ressources',contact:'Contact',confidentialite:'Politique de confidentialité',conditions:'Termes et conditions'};
  var NOM='Maïté Blanchette Vézina';
  var pageEls=Object.keys(PAGES).map(function(id){var el=document.getElementById(id);if(el)el.classList.add('page');return el;});
  var artEl=document.getElementById('article');
  if(artEl){artEl.classList.add('page');pageEls.push(artEl);}
  var courant=null;
  function idDe(a){var h=a.getAttribute('href')||'';if(h.charAt(0)==='#')return h.slice(1);return (CH&&h.indexOf(BASE)===0)?h.slice(BASE.length):h;}
  function chemin(){var p=location.pathname;if(p.indexOf(BASE)===0)p=p.slice(BASE.length);return p.replace(/index\.html$/,'').replace(/^\/+|\/+$/g,'');}
  function route(first){
    var parts=(CH?chemin():(location.hash||'').replace(/^#\/?/,'')).split('/');
    var id=parts[0],slug='';
    try{slug=parts[1]?decodeURIComponent(parts[1]):'';}catch(e){slug=parts[1]||'';}
    if(!PAGES[id])id='accueil';
    var key=id+(id==='actualite'&&slug?'/'+slug:'');
    if(key===courant)return;
    courant=key;
    var show=(id==='actualite'&&slug)?'article':id;
    pageEls.forEach(function(el){if(el)el.classList.toggle('on',el.id===show);});
    links.forEach(function(l){
      if(idDe(l)===id){l.setAttribute('aria-current','true');}else{l.removeAttribute('aria-current');}
    });
    if(show==='article'){renderArticle(slug);}
    else{document.title=id==='accueil'?NOM:T(PAGES[id])+' — '+NOM;}
    traduireDOM();
    top.classList.remove('hide');
    if(!first)window.scrollTo(0,0);
    if(typeof zoom==='function'&&!calm)zoom();
  }
  if(CH){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){var h=a.getAttribute('href').slice(1);if(PAGES[h.split('/')[0]])a.setAttribute('href',BASE+h);});
    document.addEventListener('click',function(e){
      var a=e.target.closest?e.target.closest('a[href]'):null;
      if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
      var h=a.getAttribute('href')||'';
      if(h.indexOf(BASE)!==0)return;
      if(!PAGES[h.slice(BASE.length).split('/')[0]])return;
      e.preventDefault();
      history.pushState(null,'',h);
      route(false);
    });
    window.addEventListener('popstate',function(){route(false);});
  }else{window.addEventListener('hashchange',function(){route(false);});}
  route(true);
  traduireDOM();
  var form=document.getElementById('form'),status=document.getElementById('status');
  if(form)form.addEventListener('submit',function(e){
    e.preventDefault();
    var mail=document.getElementById('courriel').value.trim();
    if(!document.getElementById('nom').value.trim()||!mail||mail.indexOf('@')<1||!document.getElementById('msg').value.trim()){
      status.textContent='Il manque votre nom, un courriel valide ou votre message.';
      return;
    }
    status.textContent="Prototype : le message n'a pas été envoyé. Le formulaire sera relié au courriel du bureau à la mise en ligne.";
  });
})();
