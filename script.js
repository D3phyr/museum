//random gallery
image = new Array();
image[0] = "assets/galery1.jpg";
image[1] = "assets/galery2.jpg";
image[2] = "assets/galery3.jpg";
image[3] = "assets/galery4.jpg";
image[4] = "assets/galery5.jpg";
image[5] = "assets/galery6.jpg";
image[6] = "assets/galery7.jpg";
image[7] = "assets/galery8.jpg";
image[8] = "assets/galery9.jpg";
image[9] = "assets/galery10.jpg";
image[10] = "assets/galery11.jpg";
image[11] = "assets/galery12.jpg";
image[12] = "assets/galery13.jpg";
image[13] = "assets/galery14.jpg";
image[14] = "assets/galery15.jpg";
image.sort(() => Math.random() - 0.5);
let a = 0;
let imgs = ["galery1", "galery2", "galery3", "galery4", "galery5", "galery6", "galery7", "galery8", "galery9", "galery10", "galery11", "galery12", "galery13", "galery14", "galery15"];
imgs.forEach(function (elementId) {
  document.getElementById(elementId).src = image[a];
  a++;
});

//slide-in images
const sliderImages = document.querySelectorAll('.slide-in');
let gallery = document.querySelector('.gallery')
function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom + gallery.offsetTop -1150;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.remove('active');
    } else {
      sliderImage.classList.add('active');
    }
  });
}
window.addEventListener('scroll', checkSlide);

//price-counter
let btn = document.querySelector('.tickets-price-btn');
window.addEventListener('click', priceCalc);
function priceCalc() {
  let total = document.querySelector('.total');
  let Basic = document.querySelector('.num-basic');
  let Senior = document.querySelector('.num-senior');
  let BasicValue = Basic.value;
  let SeniorValue = Senior.value;
  total.innerHTML = BasicValue * 50 + SeniorValue * 25;
}

///explore-slider
function initComparisons() {
  var x, i;
  x = document.getElementsByClassName("explore-img-overlay");
  for (i = 0; i < x.length; i++) {
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = 60 + "px";
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.top = 0 + "px";
    slider.style.left = 60 + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
initComparisons();


/*video-player*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const thumb = player.querySelector('.progress__thumb');
const toggle = player.querySelector('.toggle');
const mute = player.querySelector('.mute');
const fullscreen = player.querySelector('.fullscreen');
const range = player.querySelector('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButtonPlay() {
  toggle.style.backgroundImage = 'url(assets/pause.svg)'
}

function updateButtonPause() {
  toggle.style.backgroundImage = 'url(assets/play.svg)'
}

let currentVolume;
let currentRange;
function updateButtonMute() {
  if (video.volume != 0) {
    currentVolume = video.volume;
    currentRange = range.value;
  }
  if (video.volume == 0) {
    mute.style.backgroundImage = 'url(assets/volume.svg)';
    video.volume = currentVolume;
    range.value = currentRange;
    range.style.background = `-webkit-linear-gradient(left,#710707 0%,#710707 ${range.value}%, #C4C4C4 ${range.value}%, #C4C4C4 100% )`;
  } else {
    mute.style.backgroundImage = 'url(assets/mute.svg)';
    video.volume = 0;
    range.value = 0;
    range.style.background = `-webkit-linear-gradient(left,#710707 0%,#710707 0%, #C4C4C4 0%, #C4C4C4 100% )`;
  }
}

function goFullscreen() {
  if (window.innerHeight != screen.height)
    video.webkitRequestFullScreen();
}

function handleRangeUpdate() {
  video.volume = range.value;
  if (video.volume == 0) mute.style.backgroundImage = 'url(assets/mute.svg)';
  if (video.volume > 0) mute.style.backgroundImage = 'url(assets/volume.svg)';
  var val = (range.value) * 100;
  range.style.background = `-webkit-linear-gradient(left,#710707 0%,#710707 ${val}%, #C4C4C4 ${val}%, #C4C4C4 100% )`;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  var val = (range.value) * 100;
  range.style.background = `-webkit-linear-gradient(left,#710707 0%,#710707 ${val}%, #C4C4C4 ${val}%, #C4C4C4 100% )`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function thumbUpdate() {
  let thumbValue = (video.currentTime / video.duration) * 100;
  thumb.style.left = thumbValue - 0.2 + '%';
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtonPlay);
video.addEventListener('pause', updateButtonPause);
mute.addEventListener('click', updateButtonMute);
fullscreen.addEventListener('click', goFullscreen);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
range.addEventListener('change', handleRangeUpdate);
range.addEventListener('mousemove', handleRangeUpdate);
range.addEventListener('mousedown', handleRangeUpdate);
video.addEventListener('timeupdate', thumbUpdate);



let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//wellcome slider 
const prev = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');
const num = document.getElementById('slider-number-changed');
let items = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;
let isEnabled = true;

function calc(){
  num.innerHTML=index + 1;
}

function activeDot(n){
  for(dot of dots){
    dot.classList.remove('active');
  }
  dots[n].classList.add('active');
}

function changeCurrentItem(n){
  index = (n+items.length) % items.length;
}

function hideItem(direction){
  isEnabled = false;
  items[index].classList.add(direction);
  items[index].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  });
}

function showItem(direction){
  items[index].classList.add('next', direction);
  items[index].addEventListener('animationend', function(){
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function previousItem(n){
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n){
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

dots.forEach((item, indexDot) =>{
  item.addEventListener('click', () => {
    if (indexDot == index) {}
    else if ((indexDot > index) && (isEnabled == true)){
    hideItem('to-left');
    index = indexDot;
    activeDot(index);
    calc();
    showItem('from-right');
  } else if ((indexDot < index) && (isEnabled == true)) {
    hideItem('to-right');
    index = indexDot;
    activeDot(index);
    calc();
    showItem('from-left');
  }
  })
})

prev.addEventListener('click', function() {
  if (isEnabled){
    previousItem(index);
    calc();
    activeDot(index);
  }
});

next.addEventListener('click', function() {
  if (isEnabled){
    nextItem(index);
    calc();
    activeDot(index);
  }
});

const swipedetect = (el) =>{
let surface = el;
let startX = 0; 
let startY = 0; 
let distX = 0; 
let distY = 0; 

let startTime = 0;
let elepsedTime = 0;

let threshold = 150;
let restraint = 100;
let allowedTime = 300;

surface.addEventListener('mousedown', function(e){
  startX = e.pageX;
  startY = e.pageY;
  startTime = new Date().getTime();
  e.preventDefault();
})

surface.addEventListener('mouseup', function(e){
  distX =  e.pageX - startX;
  distY =  e.pageY - startY;
  elepsedTime = new Date().getTime() - startTime;
if (elepsedTime <= allowedTime){
  if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
    if (distX > 0){
      if(isEnabled){
        previousItem(index);
        calc();
        activeDot(index);
      }
    } else {
      if(isEnabled){
        nextItem(index);
        calc();
        activeDot(index);
      }
    }
  }
}
  e.preventDefault();
})

surface.addEventListener('touchstart', function(e){
  let touchObj = e.changedTouches[0];
  startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
  e.preventDefault();
})

surface.addEventListener('touchmove', function(e){
  e.preventDefault();
})

surface.addEventListener('touchend', function(e){
  let touchObj = e.changedTouches[0];
  distX =  touchObj.pageX - startX;
  distY =  touchObj.pageY - startY;
  elepsedTime = new Date().getTime() - startTime;
if (elepsedTime <= allowedTime){
  if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
    if (distX > 0){
      if(isEnabled){
        previousItem(index);
        calc();
        activeDot(index);
      }
    } else {
      if(isEnabled){
        nextItem(index);
        calc();
        activeDot(index);
      }
    }
  }
}
  e.preventDefault();
})

}
let el=document.querySelector('.flex-wrapper');
swipedetect(el);

//video slider
const vprev = document.getElementById('video-btn-prev');
const vnext = document.getElementById('video-btn-next');
let videoPlayer = document.querySelector('.viewer');
const videoDots = document.querySelectorAll('.video-dot');
let ind = 0;

const activeVideoDot = n => {
  for (vdot of videoDots) {
    vdot.classList.remove('active');
  }
  videoDots[n].classList.add('active');
}

const nextVideo = () => {
  if (ind == 4) {
    ind = 0;
    activeVideoDot(ind);
    changeVideo()
  } else {
    ind++;
    activeVideoDot(ind);
    changeVideo()
  }
}

const prevVideo = () => {
  if (ind == 0) {
    ind = 4;
    activeVideoDot(ind);
    changeVideo()
  } else {
    ind--;
    activeVideoDot(ind);
    changeVideo()
  }
}

videoDots.forEach((videoItem, indexVideoDot) => {
  videoItem.addEventListener('click', () => {
    ind = indexVideoDot;
    activeVideoDot(ind);
    changeVideo()
  })
})

function changeVideo() {
  if (ind == 0) {
    videoPlayer.src = 'assets/video0.mp4'
    videoPlayer.poster = "assets/poster0.jpg"
  }
  if (ind == 1) {
    videoPlayer.src = 'assets/video1.mp4'
    videoPlayer.poster = "assets/poster1.jpg"
  }
  if (ind == 2) {
    videoPlayer.src = 'assets/video2.mp4'
    videoPlayer.poster = "assets/poster2.jpg"
  }
  if (ind == 3) {
    videoPlayer.src = 'assets/video3.mp4'
    videoPlayer.poster = "assets/poster3.jpg"
  }
  if (ind == 4) {
    videoPlayer.src = 'assets/video4.mp4'
    videoPlayer.poster = "assets/poster4.jpg"
  }
}

vnext.addEventListener('click', nextVideo);
vprev.addEventListener('click', prevVideo);
