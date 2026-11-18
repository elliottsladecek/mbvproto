(function(){
  // Fiche des membres de l'équipe (popup)
  var fiche=document.getElementById('fiche'),lastM=null;
  function ouvrir(m){
    lastM=m;
    document.getElementById('fiche-nom').textContent=m.querySelector('b').textContent;
    document.getElementById('fiche-role').textContent=m.querySelector('span').textContent;
    document.getElementById('fiche-desc').textContent=m.getAttribute('data-desc')||'';
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

  // Menu mobile
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

  // Barre de navigation : se cache en descendant, réapparaît dès qu'on remonte
  var top=document.querySelector('.top'),lastY=window.pageYOffset,ticking=false;
  function onScroll(){
    var y=window.pageYOffset;
    if(nav.classList.contains('open')||y<80||y<lastY-4){top.classList.remove('hide');}
    else if(y>lastY+4){top.classList.add('hide');}
    lastY=y;ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});
  top.addEventListener('focusin',function(){top.classList.remove('hide');});

  // Effet de zoom : les éléments grossissent vers l'œil en arrivant dans l'écran
  var zs=Array.prototype.slice.call(document.querySelectorAll('.sec-head,.member,.post,.acc,.contact .info,.contact form,footer .wrap'));
  var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var zt=false;
  function zoom(){
    var vh=window.innerHeight;
    zs.forEach(function(el){
      var r=el.getBoundingClientRect();
      var t=(vh-r.top)/(vh*0.55);
      t=t<0?0:t>1?1:t;
      t=1-Math.pow(1-t,3);
      el.style.scale=(0.86+0.14*t).toFixed(3);
      el.style.opacity=(0.25+0.75*t).toFixed(3);
    });
    zt=false;
  }
  if(!calm){
    window.addEventListener('scroll',function(){if(!zt){zt=true;requestAnimationFrame(zoom);}},{passive:true});
    window.addEventListener('resize',zoom);
    zoom();
  }

  // Lien actif selon la section visible
  var links=Array.prototype.slice.call(nav.querySelectorAll('a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;
        links.forEach(function(l){
          if(l.getAttribute('href')==='#'+en.target.id){l.setAttribute('aria-current','true');}
          else{l.removeAttribute('aria-current');}
        });
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    links.forEach(function(l){
      var s=document.querySelector(l.getAttribute('href'));
      if(s)io.observe(s);
    });
  }

  // Nouvelles : lues dans nouvelles/*.json (la liste des fichiers est dans nouvelles/index.json)
  var MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  var EXEMPLES=[
    {titre:'[Exemple] Titre de la première nouvelle',date:'2026-11-12',categorie:'Circonscription',resume:'[Deux lignes de résumé qui disent ce que ça change pour les gens.]',image:'',lien:'exemple-premiere-nouvelle',contenu:['## [Intertitre]','[Premier paragraphe de l’article.]','[Deuxième paragraphe de l’article.]']},
    {titre:'[Exemple] Titre de la deuxième nouvelle',date:'2026-11-05',categorie:'Assemblée nationale',resume:'[Deux lignes de résumé.]',image:'',lien:'exemple-deuxieme-nouvelle',contenu:['[Premier paragraphe de l’article.]','[Deuxième paragraphe de l’article.]']},
    {titre:'[Exemple] Titre de la troisième nouvelle',date:'2026-10-28',categorie:'Circonscription',resume:'[Deux lignes de résumé.]',image:'',lien:'exemple-troisieme-nouvelle',contenu:['[Premier paragraphe de l’article.]']}
  ];
  var ARTS=null,filtre='all';
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function dateFr(d){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(d||'');return m?((+m[3])+(m[3]==='01'?'er':'')+' '+MOIS[+m[2]-1]+' '+m[1]):esc(d);}
  function carte(a){
    var img=a.image?'<img src="'+esc(a.image)+'" alt="" loading="lazy">':'';
    return '<a class="post" href="#actualite/'+encodeURIComponent(a.lien)+'"><div class="thumb">'+img+'</div><div class="pbody"><small>'+esc(a.categorie)+'</small><h3>'+esc(a.titre)+'</h3><p>'+esc(a.resume)+'</p><div class="pfoot"><time datetime="'+esc(a.date)+'">'+dateFr(a.date)+'</time><span class="more">Lire →</span></div></div></a>';
  }
  function rendreNouvelles(){
    if(!ARTS)return;
    var liste=document.getElementById('news'),acc=document.getElementById('home-news'),ch=document.getElementById('chips');
    var cats=[];ARTS.forEach(function(a){if(a.categorie&&cats.indexOf(a.categorie)<0)cats.push(a.categorie);});
    if(cats.indexOf(filtre)<0)filtre='all';
    if(ch)ch.innerHTML=['all'].concat(cats).map(function(c){return '<button class="chip" type="button" data-filter="'+esc(c)+'" aria-pressed="'+(c===filtre?'true':'false')+'">'+(c==='all'?'Tout':esc(c))+'</button>';}).join('');
    if(liste){var vis=ARTS.filter(function(a){return filtre==='all'||a.categorie===filtre;});liste.innerHTML=vis.length?vis.map(carte).join(''):'<p class="vide">Aucune nouvelle pour le moment.</p>';}
    if(acc)acc.innerHTML=ARTS.slice(0,3).map(carte).join('');
    zs=Array.prototype.slice.call(document.querySelectorAll('.sec-head,.member,.post,.acc,.contact .info,.contact form,footer .wrap'));
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
    var el=document.getElementById('art-contenu');
    if(!el)return;
    if(!ARTS){el.innerHTML='<p>Chargement…</p>';return;}
    var a=null;ARTS.forEach(function(x){if(x.lien===slug)a=x;});
    if(!a){el.innerHTML='<h1>Article introuvable</h1><p>Cette nouvelle n’existe pas ou a été retirée.</p>';document.title='Article introuvable — '+NOM;return;}
    el.innerHTML='<small>'+esc(a.categorie)+'</small><h1>'+esc(a.titre)+'</h1><time datetime="'+esc(a.date)+'">'+dateFr(a.date)+'</time>'+(a.image?'<img class="art-img" src="'+esc(a.image)+'" alt="">':'')+'<div class="art-body">'+corps(a.contenu)+'</div>';
    document.title=a.titre+' — '+NOM;
  }
  function trier(l){
    return l.filter(function(a){return a&&a.titre&&a.lien;}).sort(function(a,b){return String(b.date).localeCompare(String(a.date));});
  }
  function apresChargement(l){
    ARTS=trier(l);
    rendreNouvelles();
    if(courant&&courant.indexOf('actualite/')===0)renderArticle(courant.slice(10));
  }
  if(window.fetch){
    fetch('nouvelles/index.json',{cache:'no-cache'})
      .then(function(r){if(!r.ok)throw 0;return r.json();})
      .then(function(noms){
        return Promise.all(noms.map(function(n){
          return fetch('nouvelles/'+n,{cache:'no-cache'}).then(function(r){return r.json();}).catch(function(){return null;});
        }));
      })
      .catch(function(){return EXEMPLES;})
      .then(apresChargement);
  }else{apresChargement(EXEMPLES);}

  // Accordéon des ressources : un seul panneau ouvert à la fois
  var accs=document.querySelectorAll('.acc-h');
  accs.forEach(function(h){
    h.addEventListener('click',function(){
      var ouvert=h.getAttribute('aria-expanded')==='true';
      accs.forEach(function(x){x.setAttribute('aria-expanded','false');});
      h.setAttribute('aria-expanded',ouvert?'false':'true');
    });
  });

  // Pages distinctes : chaque section a son adresse (#equipe, #actualite, ...)
  var PAGES={accueil:'Accueil',equipe:'Mon équipe',actualite:'Actualité',ressources:'Ressources',contact:'Contact'};
  var NOM='Maïté Blanchette Vézina';
  var pageEls=Object.keys(PAGES).map(function(id){var el=document.getElementById(id);if(el)el.classList.add('page');return el;});
  var artEl=document.getElementById('article');
  if(artEl){artEl.classList.add('page');pageEls.push(artEl);}
  var courant=null;
  function route(first){
    var parts=(location.hash||'').replace(/^#\/?/,'').split('/');
    var id=parts[0],slug='';
    try{slug=parts[1]?decodeURIComponent(parts[1]):'';}catch(e){slug=parts[1]||'';}
    if(!PAGES[id])id='accueil';
    var key=id+(id==='actualite'&&slug?'/'+slug:'');
    if(key===courant)return;
    courant=key;
    var show=(id==='actualite'&&slug)?'article':id;
    pageEls.forEach(function(el){if(el)el.classList.toggle('on',el.id===show);});
    links.forEach(function(l){
      if(l.getAttribute('href')==='#'+id){l.setAttribute('aria-current','true');}else{l.removeAttribute('aria-current');}
    });
    if(show==='article'){renderArticle(slug);}
    else{document.title=id==='accueil'?NOM:PAGES[id]+' — '+NOM;}
    top.classList.remove('hide');
    if(!first)window.scrollTo(0,0);
    if(typeof zoom==='function'&&!calm)zoom();
  }
  window.addEventListener('hashchange',function(){route(false);});
  route(true);

  // Formulaire : prototype, rien n'est envoyé
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
