const docBody = document.body;
const mainBody = document.getElementById("home-main-body");
const aboutLink = document.getElementById("page-header-nav-about");
const mobileAboutLink = document.getElementById("page-header-nav-mobile-about");
const mobileContactLink = document.getElementById(
  "page-header-nav-mobile-contact"
);
const contactLink = document.getElementById("page-header-nav-contact");
const navToggle = document.getElementById("mobile-nav-toggle");
const mobileNavMenu = document.getElementById("page-header-nav-mobile");
const aboutModal = document.getElementById("about-modal");
const contactModal = document.getElementById("contact-modal");
const aboutModalClose = document.getElementById("about-modal-close");
const contactModalClose = document.getElementById("contact-modal-close");
const pageOverlay = document.getElementById("page-overlay");
const pageHeader = document.getElementById("page-header");
const copyrightDate = document.getElementById("copyright-date");
const contactMessageButton = document.getElementById(
  "home-contact-message-btn"
);

const toggleFreezeBody = () => docBody.classList.toggle("no-scroll");

const toggleOverlay = () => pageOverlay.classList.toggle("show");

const openCloseNav = () => {
  toggleFreezeBody();
  mobileNavMenu.classList.toggle("show");
};

const toggleModal = modalName => {
  const modal = modalName
    ? document.getElementById(`${modalName}-modal`)
    : document.querySelector(".home-modal.show");

  if (modal.classList.contains("show")) {
    modal.classList.remove("show");
    modal.classList.add("hide");
  } else {
    modal.classList.add("show");
    modal.classList.remove("hide");
  }

  toggleOverlay();
};

const toggleMobileModal = modalName => {
  mobileNavMenu.addEventListener(
    "transitionend",
    () => toggleModal(modalName),
    {
      once: true
    }
  );
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

// dynamically set copyright year in footer
copyrightDate.textContent = new Date().getFullYear();

// event listeners
navToggle.addEventListener("click", openCloseNav);
aboutLink.addEventListener("click", () => toggleModal("about"));
contactLink.addEventListener("click", () => toggleModal("contact"));
aboutModalClose.addEventListener("click", () => toggleModal());
contactModalClose.addEventListener("click", () => toggleModal());
pageOverlay.addEventListener("click", () => toggleModal());
document.addEventListener("scroll", dOnWindowScroll);
mobileAboutLink.addEventListener("click", () => toggleMobileModal("about"));
mobileContactLink.addEventListener("click", () => toggleMobileModal("contact"));
contactMessageButton.addEventListener("click", () => toggleModal("contact"));

// debounce helper
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
