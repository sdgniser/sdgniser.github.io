//HELPERS
const $id = id => document.getElementById(id);
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
const afterLoading = callback => document.addEventListener('DOMContentLoaded', callback)
function fetchAdv(responseHandler, path, onSuccess = x => x, onError = console.error) {
  fetch(path).then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return responseHandler(response);
    })
    .then(data => onSuccess(data))
    .catch(err => onError(err));
}
const getJSON = (path, onSuccess, onError) => fetchAdv(res => res.json(), path, onSuccess, onError);
const getHTML = (path, onSuccess, onError) => fetchAdv(
  res => res.text().then(str => new DOMParser().parseFromString(str, 'text/html')),
  path, onSuccess, onError
);
//EFFECTS
function fadeOut(el, duration = 400) {
  return new Promise(resolve => {
    el.style.transition = `opacity ${duration}ms ease`;
    el.style.opacity = 0;
    setTimeout(() => resolve(el.style.display = 'none'), duration);
  });
}
function fadeIn(el, duration = 400, display = 'block') {
  return new Promise(resolve => {
    el.style.display = display;
    el.style.opacity = 0;
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => el.style.opacity = 1);
    setTimeout(() => resolve(), duration);
  });
}
function hide(el) { el.style.display = 'none'; }
function switchClass(el, prevClass, newClass) {
  el.classList.remove(prevClass)
  el.classList.add(newClass)
}


// by default, the dark mode is switched off
const themeSwitch = $id('theme-switch');
let darkMode = false;
function updateTheme() {
  document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  themeSwitch.innerHTML = darkMode ? '🌙' : '☀️';
}
themeSwitch.onclick = () => updateTheme(darkMode = !darkMode)
updateTheme();

$id('year').innerHTML = new Date().getFullYear()

// PROJECTS SECTION --------------------
afterLoading(() => {
  getJSON('data/projects.json', data => {
    console.log('projects loaded');
    $('.carousel-items').innerHTML = data.projects.map(project =>
      `<figure class="carousel-item">
        <div class="carousel__image">
          <img src="${project.image}">
        </div>
        <figcaption class="carousel__caption">
          <h3 class="carousel__title">${project.name}</h3>
          <p class="carousel__subtitle"><a target="_blank" href="${project.website}">WEBSITE</a> | <a target="_blank" href="${project.source}">SOURCE CODE</a></p>
        </figcaption>
      </figure>`
    ).join('');

    tns({
      container: '.carousel-items',
      items: 1,
      viewportMax: 300,
      responsive: {
        350: { items: 2, gutter: 20 },
        500: { items: 3, gutter: 20 }
      },
      center: true,
      rewind: true,
      mouseDrag: true,
      autoplay: true,
      navPosition: "bottom",
      autoplay: true,
      autoplayButton: "#autoplay-btn",
      controlsContainer: "#controls-container",
      navAsThumbnails: true
    });
  })
});

// TEAM SECTION --------------------
const icon_github = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>';
const icon_mail = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>';
const icon_website = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>'
const icon_linkedin = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>'

function getMembersDetails(members) {
  return members.map(member => `
    <figure class="member-card">
      <div class="member-image">
        <img src="images/members/${member.image}" alt="${member.name}.jpg">
      </div>
      <figcaption>
        <p class="member-name">${member.name}</p>
        <p class="member-desc">${member.desc}</p>
        <p class="member-socials">
          ${member.email ? `<a href="mailto:${member.email}">${icon_mail}</a>` : ''} 
          ${member.github ? `<a href="${member.github}">${icon_github}</a>` : ''}
          ${member.website ? `<a href="${member.website}">${icon_website}</a>` : ''}
          ${member.linkedin ? `<a href="${member.linkedin}">${icon_linkedin}</a>` : ''}
        </p>
      </figcaption>
    </figure>`
  ).join('');
};

afterLoading(() => {
  getJSON('data/members.json',
    data => {
      console.log('success');
      $('.team-current').innerHTML += getMembersDetails(data.current_members);
      $('.team-alumni').innerHTML += getMembersDetails(data.older_members);
    },
    err => console.log(`error: ${err}`)
  );
});

afterLoading(() => {
  const blogsUrl = "https://sdgniser.github.io/coding_club_blogs/";

  getHTML(blogsUrl, html => {
    console.log('Fetched blogs webpage successfully.');
    $('.blogs').innerHTML += $$('ul.post-list > li', html).map(blog => {
      const _$ = query => $(query, blog);
      const authors = $$('.post-meta', blog);
      return `
        <div class="blog">
          <div class="blog-content">
            <p class="blog-date">${_$('.post-meta').innerText}</p>
            <a href="${new URL(_$('h3.post-h3 > a').href, blogsUrl).href}" target="_blank">
              <h3 class="blog-title">${_$('h3.post-h3 > a').innerText}</h3>
            </a>
            <p class="blog-abstract">${_$('p.post-abstract').innerText || 'No abstract available.'}</p>
            <p class="blog-author">by ${authors[authors.length-1].innerText}</p>
          </div>
        </div>`
      }).join('');
    },
    () => console.log('Error fetching blogs webpage.')
  );
});




// NEWS SECTION --------------------
/*
afterLoading(() => {
  getJSON('data/news.json', data => {
    console.log('success');
    $('.articles').innerHTML += data.news.map(news_item =>
      `<div class="article">
        <div class="article-date">${news_item.date}</div>
        <div class="article-content">${news_item.content}</div>
        <a href="${news_item.link}" class="article-btn">Know More</a>
      </div>`
    ).join('');
  },
  err => console.warn(`${err}
    """
    This error is being shown probably because '.articles' is commented out
    if you don't need it anymore consider removing this part of the code!
    """`))
});
*/

// PARALLAX --------------------
let nav = $('nav')
let introHeight = $('.section--intro').offsetHeight
let aboutOffset = $id('about').offsetTop - (window.innerHeight / 1.2)
let teamOffset = $id('team').offsetTop - (window.innerHeight / 1.5)
let projectsOffset = $id('projects').offsetTop - (window.innerHeight / 1.6)
let footerOffset = $('footer').offsetTop //- ($(window).height() / 1)

window.addEventListener('scroll', () => {
  const wScroll = window.scrollY
  nav.classList.toggle('alone', wScroll > introHeight);
  [ // LANDING ELEMENTS
    [projectsOffset,    '#projects .section__title'],
    [teamOffset,        '#team .section__title'],
    [aboutOffset * 1.2, '#about .section__title'],
    [aboutOffset,       '#about .section__image']
  ].forEach(([offset, query]) => { if (wScroll > offset) $(query).classList.add('is-showing'); });
  // use $(query).classList.toggle('is-showing', wScroll > offset); if you want to get the effects if scrolled from the top again
})

// ONLOAD ANIMATION --------------------
function typingAnimation(txt, containerId, speed = 100) {
  let i = 0;
  const typing = setInterval(() => {
    if (i >= txt.length) return clearInterval(typing);
    let char = txt[i++];
    $id(containerId).innerHTML += char === ' ' ? '<br/>' : char;
  }, speed)
}
window.onload = () => {
  checkNav()
  typingAnimation('CODING CLUB', "typing")
  typingAnimation('NISER', "typing-2")
}


// TEAM SECTION SWITCH FUNCTIONALITY --------------------
async function switchTeam(prevteam, newTeam) {
  await fadeOut($(`.team-${prevteam}`))
  await fadeIn($(`.team-${newTeam}`), 400, "flex")
  $(`.team-switch-${newTeam}`).classList.add('active')
  $(`.team-switch-${prevteam}`).classList.remove('active')
}
$('.team-switch-current').onclick = () => switchTeam("alumni", "current");
$('.team-switch-alumni').onclick = () => switchTeam("current", "alumni")

// MOBILE NAVIGATION BAR --------------------
$id('nav-close').onclick = () => {
  Promise.all([ $('.logo-2'), $('nav ul'), $id('nav-close') ].map(fadeOut))
  .then(() => switchClass(nav, 'small-open', 'small'));
}

$id('nav-open').onclick = () => {
  switchClass(nav, 'small', 'small-open');
  Promise.all([ fadeIn($('.logo-2')), fadeIn($('nav ul'), 400, 'flex'), fadeIn($id('nav-close'), 400, 'inline') ]);
}

$('nav ul li').onclick = () => {
  if (!nav.classList.includes('small-open')) return;
  [$('.logo-2'), $id('nav-close')].forEach(hide)
  switchClass(nav, 'small-open', 'small')
  await fadeOut($('nav ul'))
};

window.onresize = checkNav;
function checkNav() { nav.classList.toggle('small', window.innerWidth <= 700) }
