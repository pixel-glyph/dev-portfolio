const docBody = document.body;
const mainBody = document.getElementById("home-main-body");
const aboutLink = document.getElementById("page-header-nav-about");
const navToggle = document.getElementById("mobile-nav-toggle");
const mobileNavMenu = document.getElementById("page-header-nav-mobile");
const mobileAboutLink = document.getElementById("page-header-nav-mobile-about");
const aboutModal = document.getElementById("about-modal");
const aboutModalClose = document.getElementById("about-modal-close");
const pageOverlay = document.getElementById("page-overlay");
const pageHeader = document.getElementById("page-header");
const copyrightDate = document.getElementById("copyright-date");

const toggleFreezeBody = () => docBody.classList.toggle("no-scroll");

const toggleOverlay = () => pageOverlay.classList.toggle("show");

const openCloseNav = () => {
  toggleFreezeBody();
  mobileNavMenu.classList.toggle("show");
};

const toggleAboutModal = () => {
  toggleFreezeBody();
  toggleOverlay();
  aboutModal.classList.toggle("show");
};

const toggleMobileAboutModal = () => {
  mobileNavMenu.addEventListener("transitionend", toggleAboutModal, {
    once: true
  });
  openCloseNav();
};

const onWindowScroll = () => {
  const scrollBreakPoint = window.innerWidth < 1250 ? 450 : 600;
  let didScroll;

  if (!didScroll && window.scrollY > scrollBreakPoint) {
    pageHeader.classList.add("page-header--fixToTop");
    mainBody.classList.add("home-main-body--fixedHeader");
    didScroll = true;
  } else if (window.scrollY < 1) {
    pageHeader.classList.remove("page-header--fixToTop");
    mainBody.classList.remove("home-main-body--fixedHeader");
    didScroll = false;
  }
};

const dOnWindowScroll = debounce(onWindowScroll, 100);

copyrightDate.textContent = new Date().getFullYear();

// event listeners
navToggle.addEventListener("click", openCloseNav);
aboutLink.addEventListener("click", toggleAboutModal);
aboutModalClose.addEventListener("click", toggleAboutModal);
pageOverlay.addEventListener("click", toggleAboutModal);
document.addEventListener("scroll", dOnWindowScroll);
mobileAboutLink.addEventListener("click", toggleMobileAboutModal);

function debounce(fn, delay = 200) {
  let timer;

  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    const args = arguments;
    timer = setTimeout(function() {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}
