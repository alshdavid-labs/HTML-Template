var screenSize = window.innerHeight;
var viewSize = screen.availHeight;
var mainBanner = document.getElementById("main-banner");
var pageHeader = document.getElementById("page-header");
var appImage = document.getElementById("igonre-app-image");

var portfolioSection = document.getElementById("portfolio-section");
var websitesSection = document.getElementById("websites-section");
var appsSection = document.getElementById("apps-section");
var desktopSection = document.getElementById("desktop-section");

var pageContent = document.getElementsByClassName('page-content');

mainBanner.style.height = screenSize + "px"
//pageContent.style.minHeight = screenSize + "px"

for (i = 0; i < pageContent.length; i++){
    pageContent[i].style.minHeight = viewSize + "px"
}

if (window.innerHeight < 600) {
    appImage.style.display = 'none'
}

//window.scroll()
if (window.innerWidth < 1050) {
    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop  || document.body.scrollTop == 0){
            pageHeader.classList.add('top')
        } else {
            pageHeader.classList.remove('top')
        }
    });
}

var menuStatus = false
function toggleMenu(){ 
    if (menuStatus == false) {
        document.getElementById("slide-menu").classList.add('open')
        document.getElementById("slide-menu-mask").classList.add('open')
        menuStatus = true
    } else {
        document.getElementById("slide-menu").classList.remove('open')
        document.getElementById("slide-menu-mask").classList.remove('open')
        menuStatus = false
    }
}


initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    document.getElementById('css-support-msg').className = 'supported';
    return;
  }

  var duration = 400;

  var pageUrl = location.hash ?
    stripHash(location.href) :
    location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) {
        a.addEventListener('click', onClick, false);
      });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop)
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

}
