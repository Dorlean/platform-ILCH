// ===== Menu mobile =====
function toggleMobileMenu(){
  var menu=document.getElementById('mobile-menu');
  var btn=document.getElementById('nav-hamburger');
  if(!menu||!btn) return;
  var isOpen = menu.style.display==='flex';
  if(isOpen){
    menu.style.display='none';
    btn.classList.remove('open');
  } else {
    menu.style.display='flex';
    btn.classList.add('open');
  }
}
function closeMobileMenu(){
  var menu=document.getElementById('mobile-menu');
  var btn=document.getElementById('nav-hamburger');
  if(!menu||!btn) return;
  menu.style.display='none';
  btn.classList.remove('open');
}
window.addEventListener('scroll',function(){
  var menu=document.getElementById('mobile-menu');
  if(menu&&menu.style.display==='flex') closeMobileMenu();
});

// ===== PWA Service Worker =====
if("serviceWorker" in navigator){
  window.addEventListener("load",function(){
    navigator.serviceWorker.register("/sw.js").then(function(reg){
      console.log("[ILCH] PWA Service Worker actif");
    }).catch(function(err){console.log("[ILCH] SW erreur:",err);});
  });
}

// ===== Mini slider (carte "Journée culturelle") =====
(function(){
  var miniSlides = document.querySelectorAll('.mini-slide');
  var miniDots   = document.querySelectorAll('.mini-dot');
  if(!miniSlides.length) return;
  var miniCurrent = 0;

  window.goMini = function(n) {
    miniSlides[miniCurrent].style.opacity = '0';
    miniDots[miniCurrent].style.background = 'rgba(255,255,255,0.5)';
    miniCurrent = (n + miniSlides.length) % miniSlides.length;
    miniSlides[miniCurrent].style.opacity = '1';
    miniDots[miniCurrent].style.background = 'var(--gold)';
  };
  setInterval(function(){ goMini(miniCurrent + 1); }, 3000);
})();

// ===== Sliders pleine largeur / cartes (fw-slider) =====
function fwGetParts(el){
  var slider = el.closest('.fw-slider');
  return { slider: slider, slides: slider.querySelectorAll('.fw-slide'), dots: slider.querySelectorAll('.fw-dot') };
}
function fwShow(slider, slides, dots, index){
  var current = slider.getAttribute('data-current');
  current = current === null ? 0 : parseInt(current, 10);
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  var next = (index + slides.length) % slides.length;
  slides[next].classList.add('active');
  dots[next].classList.add('active');
  slider.setAttribute('data-current', next);
}
function fwResetTimer(slider, slides, dots){
  if (slider._fwTimer) clearInterval(slider._fwTimer);
  slider._fwTimer = setInterval(function(){
    var current = parseInt(slider.getAttribute('data-current') || 0, 10);
    fwShow(slider, slides, dots, current + 1);
  }, 4500);
}
function fwMove(el, dir){
  var p = fwGetParts(el);
  var current = parseInt(p.slider.getAttribute('data-current') || 0, 10);
  fwShow(p.slider, p.slides, p.dots, current + dir);
  fwResetTimer(p.slider, p.slides, p.dots);
}
function fwGoTo(el, index){
  var p = fwGetParts(el);
  fwShow(p.slider, p.slides, p.dots, index);
  fwResetTimer(p.slider, p.slides, p.dots);
}
document.querySelectorAll('.fw-slider').forEach(function(slider){
  var slides = slider.querySelectorAll('.fw-slide');
  var dots = slider.querySelectorAll('.fw-dot');
  if(!slides.length) return;
  slider.setAttribute('data-current', 0);
  fwResetTimer(slider, slides, dots);
});

// ===== Slider principal (bannière d'accueil) =====
(function(){
  var slides = document.querySelectorAll('.slide');
  if(!slides.length) return;

  var currentSlide = 0;
  var totalSlides = slides.length;
  var autoTimer;

  window.goToSlide = function(n) {
    var dots = document.querySelectorAll('.slider-dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    var counter = document.getElementById('slide-current');
    if(counter) counter.textContent = currentSlide + 1;
  };

  window.changeSlide = function(dir) {
    clearInterval(autoTimer);
    goToSlide(currentSlide + dir);
    startAuto();
  };

  function startAuto() {
    autoTimer = setInterval(function(){ goToSlide(currentSlide + 1); }, 5000);
  }

  startAuto();
})();
