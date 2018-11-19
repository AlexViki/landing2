function showMenu() {
    var menu = document.getElementById('menu');
    var menuStatus = menu.classList.contains('menu_state_open');
    var menuStateOpen = 'menu_state_open';
    if (menuStatus) {
        console.log('Yes');
    } else {
        console.log('No');;
    };
    menu.classList.toggle(menuStateOpen);
};

var btnMenu = document.getElementById('menu-mobile-btn');

btnMenu.onclick = showMenu;