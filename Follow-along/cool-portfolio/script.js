let menuIcon = document.querySelector('#menu-icon');
let navabr = document.querySelector('.navbar');
let sections = document.querySelector('selection');
let navlinks = document.querySelector('#header nav a');

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttriute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove('active');
        document
          .querySelector('header nav a [href*=' + id + ' ]')
          .classList.add('active');
      });
    }
  });
};
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navabr.classList.toggle('active');
};
