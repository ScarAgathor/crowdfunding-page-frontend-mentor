const body = document.querySelector('body');
const menu_open = document.querySelector('.mobile__menu__button');
const mobileNav = document.querySelector('.nav__modal');
const desktopNav = document.querySelector(".nav__desktop");
const pledgeRadios = document.querySelectorAll('.pledge__radio');
const pledgeModal = document.querySelector('.pledges__modal');
const overlay = document.querySelector('.overlay');
const modalOpen = document.querySelector('.button--project');
const modalClose = document.querySelector('.modal-close');
const editionButtons = document.querySelectorAll('.button--editions');
const progressBar = document.querySelector('.numbers__progress--green');
const backed = document.getElementById('backed-number');
const backers = document.querySelector('.numbers__total-backers');
let backedNo = Number(backed.textContent.replace(",", ""))
let backersNo = Number(backers.textContent.replace(",", ""))

const thankModal = document.querySelector('.thank__modal');

setBarWidth();

window.onload = () => {
    showMenuButton()
}

window.onresize = () => {
    showMenuButton()
}

menu_open.addEventListener('click', () => {
    if(menu_open.dataset.menu == "closed") {
        openMobileNav()
    } else if(menu_open.dataset.menu == "open") {
        closeMobileNav()
    }
})

modalOpen.addEventListener('click', () => {
    pledgeModal.style.display = 'flex';
    overlay.style.display = "block";
    pledgeRadios.forEach(radio => {
        radio.checked = false;
        for(let i = 0; i < pledgeRadios.length - 1; i++) {
            pledgeInteract = pledgeRadios[i].parentElement.parentElement.nextElementSibling;
            pledgeInteract.classList.add('pledge__active-display');
        }
    })
})

modalClose.addEventListener('click', () => {
    pledgeModal.style.display = 'none';
    overlay.style.display = "none";
})

function openModal(radio) {
    pledgeModal.style.display = 'flex';
    overlay.style.display = "block";
    for(let i = 0; i < pledgeRadios.length - 1; i++) {
        if(pledgeRadios[i].id == radio.id) {
            pledgeRadios[i].checked = true;
            showPledgeInputs();
        }
    }
}

pledgeRadios.forEach(radio => {
    radio.addEventListener('click', () => {
        let pledgeInteract;
        if(radio.checked) {
            for(let i = 0; i < pledgeRadios.length - 1; i++) {
                pledgeInteract = pledgeRadios[i].parentElement.parentElement.nextElementSibling;
                pledgeInteract.classList.add('pledge__active-display');
            }
            pledgeInteract = radio.parentElement.parentElement.nextElementSibling;
            pledgeInteract.classList.remove('pledge__active-display');
        }
    })
})

function setBarWidth() {
    let barWidth = backedNo/100000 * 100
    progressBar.style.width = `${barWidth}%`
}

function showMenuButton() {
    if(body.clientWidth <= 600) {
        menu_open.classList.remove('nav--hidden');
        desktopNav.classList.add('nav--hidden');
    } else if(body.clientWidth > 600) {
        menu_open.classList.add('nav--hidden');
        desktopNav.classList.remove('nav--hidden');
        closeMobileNav();
    }
}

function openMobileNav() {
    menu_open.innerHTML = `<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z"/><path d="M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z"/></g></svg>`;
    mobileNav.style.height = `${mobileNav.scrollHeight}px`;
    menu_open.dataset.menu = "open";
}

function closeMobileNav() {
    menu_open.innerHTML = `<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/></g></svg>`;
    mobileNav.style.height = `0px`;
    menu_open.dataset.menu = "closed";
}

function showPledgeInputs() {
    pledgeRadios.forEach(radio => {
        let pledgeInteract;
        if(radio.checked) {
            for(let i = 0; i < pledgeRadios.length - 1; i++) {
                pledgeInteract = pledgeRadios[i].parentElement.parentElement.nextElementSibling;
                pledgeInteract.classList.add('pledge__active-display');
            }
            pledgeInteract = radio.parentElement.parentElement.nextElementSibling;
            pledgeInteract.classList.remove('pledge__active-display');
        }
    })
}

function bookmark(button) {
    if(button.dataset.bookmarked == "false") {
        button.classList.add('button--bookmark-active');
        button.lastElementChild.textContent = `Bookmarked`;
        button.dataset.bookmarked = "true";
    } else if(button.dataset.bookmarked == "true") {
        button.classList.remove('button--bookmark-active');
        button.lastElementChild.textContent = `Bookmark`;
        button.dataset.bookmarked = "false";
    }
}

function pledge(button, input) {
    backedNo = Number(backed.textContent.replace(",", ""));
    backersNo = Number(backers.textContent.replace(",", ""));
    thankModal.classList.remove('thank__modal-display');
    pledgeModal.style.display = 'none';
    overlay.style.display = "block";
    
    let amountBacked = Number(input.value)

    let newBackedNo = amountBacked + backedNo;
    let newBackersNo = backersNo + 1;

    backed.textContent = newBackedNo.toLocaleString("en-US");
    backers.textContent = newBackersNo.toLocaleString("en-US");
    setBarWidth()
}


function pledgeNo(button) {
    thankModal.classList.remove('thank__modal-display');
    pledgeModal.style.display = 'none';
    overlay.style.display = "block";
}

function thankYou(button) {
    thankModal.classList.add('thank__modal-display');
    overlay.style.display = "none";



}