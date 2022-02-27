const menuButton = document.querySelector('[data-menu-button]');
const menuList = document.querySelector('[data-menu-list]');

if (menuButton) {
  menuButton.addEventListener('click', function () {
    menuList.classList.toggle('site-header__nav-list--visible');

    menuButton.setAttribute(
      'aria-expanded',
      menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
  });
}
