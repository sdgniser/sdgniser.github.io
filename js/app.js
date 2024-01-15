const elem = selector => {
  return document.querySelector(selector)
}

const today = new Date()
document.getElementById('year').innerHTML = today.getFullYear()

// PROJECTS SECTION --------------------
$(function () {
  $.getJSON('data/projects.json', function (data) {
    console.log('projects loaded');
    $.each(data.projects, function (i, project) {
      let figure = `<figure class="carousel-item">
          <img src="${project.image}" class="carousel__image">
          <figcaption class="carousel__caption">
            <h3 class="carousel__title">${project.name}</h3>
            <p class="carousel__subtitle"><a target="_blank" href="${project.website}">WEBSITE</a> | <a target="_blank" href="${project.source}">SOURCE CODE</a></p>
          </figcaption>
        </figure>`

      $('.carousel-items').append(figure);
    });
    
    let list = Object.values(document.querySelectorAll('.carousel-item'))
    console.log(list)
    let translate, caption, spotlight;
    let length = list.length
    let middleTerm = Math.ceil((length - 1) / 2)
    let spotlightIndex = middleTerm
    left.addEventListener('click', _ => {
      spotlightIndex = (spotlightIndex == 0) ? (list.length - 1) : (spotlightIndex - 1);
      spotlight = list[spotlightIndex]
      caption = spotlight.querySelector('figcaption')
      translate = (middleTerm - spotlightIndex) * 100;
      Object.keys(list).forEach(function (key) {
        list[key].style.transform = 'translateX(' + translate + '%)';
      })
    })
    right.addEventListener('click', _ => {
      spotlightIndex = (spotlightIndex == (list.length - 1)) ? 0 : (spotlightIndex + 1);
      spotlight = list[spotlightIndex]
      caption = spotlight.querySelector('figcaption')
      translate = (middleTerm - spotlightIndex) * 100;
      Object.keys(list).forEach(function (key) {
        list[key].style.transform = 'translateX(' + translate + '%)';
      })
    })
  }).error(function () {
    console.log('error');
  }
  );
});

// TEAM SECTION --------------------
const icon_github = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>';
const icon_mail = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>';

function getMemberDetails(member) {
  let figure = `<figure class="member-card">
  <div class="member-image">
    <img src="images/members/${member.image}" alt="${member.name}.jpg">
  </div>
  <figcaption>
      <p class="member-name">${member.name}</p>
      <p class="member-desc">${member.desc}</p>
      <p class="member-socials">`

  if (member.email) {
    figure += `<a href="mailto:${member.email}">${icon_mail}</a>`
  }
  if (member.github) {
    figure += `<a href="${member.github}">${icon_github}</a>`
  }
  figure += `</p></figcaption></figure>`
  return figure;
};

$(function () {
  $.getJSON('data/members.json', function (data) {
    console.log('success');
    $.each(data.current_members, function (i, member) {
      let figure = getMemberDetails(member)
      $('.team-current').append(figure);
    });
    $.each(data.older_members, function (i, member) {
      let figure = getMemberDetails(member)
      $('.team-alumni').append(figure);
    });
  }).error(function () {
    console.log('error');
  });
});

// BLOGS SECTION --------------------
$(function () {
  $.getJSON('data/blogs.json', function (data) {
    console.log('success');
    $.each(data.blogs, function (i, blog) {
      let blog_item = `<div class="blog">
          <div class="blog-content">
          <p class="blog-date">${blog.date}</p>
            <a href="${blog.link}"><h3 class="blog-title">${blog.title}</h3></a>
            <p class="blog-abstract">${blog.abstract}</p>
            <p class="blog-author">by ${blog.author}</p>
          </div>
          <!-- <a href="${blog.link}" class="blog-btn">Read</a> -->
        </div>`
      $('.blogs').append(blog_item);
    });
  }).error(function () {
    console.log('error');
  });
});

// NEWS SECTION --------------------
$(function () {
  $.getJSON('data/news.json', function (data) {
    console.log('success');
    $.each(data.news, function (i, news_item) {
      let article = `<div class="article">
            <div class="article-date">${news_item.date}</div>
            <div class="article-content">${news_item.content}</div>
            <a href="${news_item.link}" class="article-btn">Know More</a>
          </div>`
      $('.articles').append(article);
    });
  }).error(function () {
    console.log('error');
  });
});

// SMOOTH SCROLLING --------------------
let scrollLink = $('.scroll');
scrollLink.click(function (e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $(this.hash).offset().top - $('nav').height() - 20
  }, 1000);
});

// PARALLAX --------------------
let nav = elem('nav')
let introHeight = elem('.section--intro').offsetHeight
let aboutOffset = $('#about').offset().top - ($(window).height() / 1.2)
let teamOffset = $('#team').offset().top - ($(window).height() / 1.5)
let projectsOffset = elem('#projects').offsetTop - ($(window).height() / 1.6)
let footerOffset = elem('footer').offsetTop //- ($(window).height() / 1)

$(window).scroll(function () {
  let wScroll = $(window).scrollTop()

  // NAVIGATION
  if (wScroll > introHeight) {
    nav.classList.add('alone')
    $('#niser-logo').attr("src", "images/n_logo_color.png")
  }
  if (wScroll < introHeight) {
    nav.classList.remove('alone')
    $('#niser-logo').attr("src", "images/n_logo.png")
  }

  // LANDING ELEMENTS
  if (wScroll > projectsOffset) { $('#projects .section__title').addClass('is-showing'); }
  if (wScroll > teamOffset) { $('#team .section__title').addClass('is-showing'); }

  if (wScroll > aboutOffset * 1.2) { elem('#about .section__title').classList.add('is-showing'); }
  if (wScroll > aboutOffset) { elem('#about .section__image').classList.add('is-showing'); }
  // if (wScroll > footerOffset) {
  //   elem('footer .logo').classList.add('is-showing');
  //   // console.log('shownmf')
  // }
  // console.log(wScroll, footerOffset)

})

// CAROUSEL --------------------
const left = document.getElementById('js-left')
const right = document.getElementById('js-right')

// ONLOAD ANIMATION --------------------
window.onload = function () {
  checkNav()

  typingAnimation('CODING CLUB', 100, "typing")
  typingAnimation('NISER', 100, "typing-2")

}

function typingAnimation(txt, speed, container) {
  var i = 0;

  function typeWriter() {
    if (i < txt.length) {
      let char = txt.charAt(i)
      if (char == ' ') {
        char = '<br/>'
      }
      document.getElementById(container).innerHTML += char;
      i++;
      setTimeout(typeWriter, speed);
    }
  }

    typeWriter()
    typeWriter()

  typeWriter()

}

// TEAM SECTION SWITCH FUNCTIONALITY --------------------
$('.team-switch-current').click(function () {
  $('.team-alumni').fadeOut()
  $('.team-current').fadeIn()
  $('.team-switch-current').addClass('active')
  $('.team-switch-alumni').removeClass('active')
})
$('.team-switch-alumni').click(function () {
  $('.team-current').fadeOut()
  $('.team-alumni').fadeIn()
  $('.team-switch-current').removeClass('active')
  $('.team-switch-alumni').addClass('active')
})

// MOBILE NAVIGATION BAR --------------------
$('#nav-close').click(function () {
  $('.logo-2').hide()
  $('nav ul').hide()
  $('#nav-close').hide()
  $('nav').addClass('small')
  $('nav').removeClass('small-open')
})

$('#nav-open').click(function () {
  $('nav').removeClass('small')
  $('nav').addClass('small-open')
  $('.logo-2').fadeIn()
  $('nav ul').fadeIn()
  $('#nav-close').fadeIn()
  $('#nav-close').attr('style', 'display:block')
})

$('nav ul li').click(function () {
  if ($('nav').hasClass('small-open')) {
    $('.logo-2').hide()
    $('nav ul').fadeOut()
    $('#nav-close').hide()
    $('nav').addClass('small')
    $('nav').removeClass('small-open')
  }
})

$(window).resize(checkNav())

function checkNav() {
  if ($(window).width() > 700) {
    $('nav').removeClass('small')
  }
  else {
    $('nav').addClass('small')
  }
}