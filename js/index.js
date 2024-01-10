// 메인 효과
let didScroll = false;
let paralaxTitles = document.querySelectorAll('.paralax-title');
let paralaxTitles02 = document.querySelectorAll('.paralax-title02');
let profileImg = document.querySelectorAll('.prImg');
let paralaxBox = document.querySelectorAll('.image-container');



const scrollInProgress = () => {
  didScroll = true
}

const raf = () => {
  if(didScroll) {
    paralaxTitles.forEach((element, index) => {
      element.style.transform = "scale(5)"
    })
		paralaxTitles02.forEach((element, index) => {
      element.style.transform = "translateX("+ window.scrollY / -5 + "%)"
    })
    paralaxBox.forEach((element, index) => {
      // element.style.transform = "translate("+ window.scrollY / 5 + "%)"
      // element.style.transform = "rotate("+ window.scrollY / -10 + "deg)"
    })
		profileImg.forEach((element, index) => {
      element.style.transform ="scale("+ window.scrollY / 20 + "%)"
    })


  
    didScroll = false;
		
  }
  requestAnimationFrame(raf);
}


requestAnimationFrame(raf);
window.addEventListener('scroll', scrollInProgress)




















const scroller = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
})

gsap.registerPlugin(ScrollTrigger)


scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
  '.container', {
      scrollTop(value) {
          return arguments.length ?
          scroller.scrollTo(value, 0, 0) :
          scroller.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
          return {
              left: 0, top: 0, 
              width: window.innerWidth,
              height: window.innerHeight
          }
      }
  }
)


ScrollTrigger.create({
  trigger: '.image-mask',
  scroller: '.container',
  start: 'top+=30% 50%',
  end: 'bottom-=40% 50%',
  animation: gsap.to('.image-mask', {backgroundSize: '120%'}),
  scrub: 2,
  // markers: true
})


ScrollTrigger.addEventListener('refresh', () => scroller.update())


ScrollTrigger.refresh()












window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = document.querySelector(".bgContainer");
  pageContainer.setAttribute("data-scroll-container", "");

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    getDirection: true
  });

  scroller.on("scroll", function (t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
  });

  // Pinning and horizontal scrolling

  let horizontalSections = document.querySelectorAll(".horizontal-scroll");

  horizontalSections.forEach((horizontalSection) => {
    let pinWrap = horizontalSection.querySelector(".pin-wrap");
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    gsap.to(pinWrap, {
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        scrub: true,
        trigger: horizontalSection,
        pin: true,
        start: "top top",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: -horizontalScrollLength,
      ease: "none"
    });
  });

  /* COLOR CHANGER */

  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: "[data-scroll-container]",
      start: "top 50%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());

  ScrollTrigger.refresh();
});











document.addEventListener('mousemove', (e) => {
  let mouseX = e.pageX + 10; // document의 x좌표값
  let mouseY = e.pageY + 10; // document의 y좌표값

  let cursor = document.querySelector('.cursor');
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
})

























let cursor = document.getElementById("cursor");
let close = document.getElementById("close");
let body = document.body;
let iframe = document.getElementById("pen");
let penLink = document.getElementById("penlink");
let links = document.getElementsByTagName("a");

let frames = [
  "https://codepen.io/cobra_winfrey/debug/xxVJZwo",
  "https://cdpn.io/cobra_winfrey/debug/wvGyKEY",
  "https://codepen.io/cobra_winfrey/debug/OJVJJoj",
  "https://cdpn.io/cobra_winfrey/debug/YzXOBEN",
  "https://codepen.io/cobra_winfrey/debug/qBZWVmO",
  "https://codepen.io/cobra_winfrey/debug/eYOXOdB",
  "https://codepen.io/cobra_winfrey/debug/OJXJeod",
  "https://codepen.io/cobra_winfrey/debug/PoqVQRq",
  "https://cdpn.io/cobra_winfrey/debug/qgEGMZ",
  "https://codepen.io/cobra_winfrey/debug/RwWYGxj"
];

// Load iFrames on demand & remove after modal is closed to reduce weight & smooth out transitions


let cards = document.getElementsByClassName("inner");
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("mousemove", function (event) {
    cursor.classList.add("active");
  });
  cards[i].addEventListener("mouseover", function (event) {
    cursor.classList.add("active");
  });

  cards[i].addEventListener("mouseout", function (event) {
    cursor.classList.remove("active");
  });
  cards[i].addEventListener(
    "click",
    function (i) {
      body.classList.add("active");
      iframe.setAttribute("src", frames[i]);
      let penDebug = frames[i];
      let penFull = penDebug.replace("debug", "pen");
      penLink.setAttribute("href", penFull);
    }.bind(null, i)
  );
}

// hover events for social links

for (link of links) {
  link.addEventListener("mouseover", function (event) {
    cursor.classList.add("linkhover");
  });
  link.addEventListener("mousemove", function (event) {
    cursor.classList.add("linkhover");
  });
  link.addEventListener("mouseout", function (event) {
    cursor.classList.remove("linkhover");
  });
}

// Escape key option to exit active state

document.onkeydown = function (evt) {
  evt = evt || window.event;
  let isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    body.classList.remove("active");
    setTimeout(() => {
      iframe.setAttribute("src", "");
    }, 2000);
  }
};

close.addEventListener("click", function (event) {
  body.classList.remove("active");
  setTimeout(() => {
    iframe.setAttribute("src", "");
  }, 2000);
});

gsap.set("#cursor", { xPercent: -50, yPercent: -50 });
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

Splitting();

// Individual section scroll progress

gsap.utils.toArray(".panel").forEach((section, index) => {
  gsap.to(this, {
    scrollTrigger: {
      trigger: section,
      start: "top 100%",
      end: "bottom 25%",
      scrub: 0,
      onUpdate: (self) => {
        section.style.setProperty("--progress", self.progress);
      }
    }
  });
});

// Full page scroll progress

gsap.to("body", {
  scrollTrigger: {
    trigger: "body",
    start: "top 100%",
    end: "50% 50%",
    scrub: 0,
    onUpdate: (self) => {
      body.style.setProperty("--progress", self.progress);
    }
  }
});

// Pull out the preloader

document.addEventListener("DOMContentLoaded", function () {
  body.classList.add("loaded");
});

// Set a delay on Scrolltrigger recalculation to accommodate element transition times

function refresh() {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 2500);
}

window.addEventListener("resize", refresh);











var swiper1 = new Swiper('.swiper-container', {
  loop : true,
  slidesPerView: 1,
  spaceBetween: 0,
  freeMode: false,
  autoplay: {
    delay: 800,
    disableOnInteraction: false,
  },
  effect : 'fade', 
  fadeEffect: 
  { crossFade: true },

 
}); 












