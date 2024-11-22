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
          <div class="carousel__image">
            <img src="${project.image}">
          </div>
          <figcaption class="carousel__caption">
            <h3 class="carousel__title">${project.name}</h3>
            <p class="carousel__subtitle"><a target="_blank" href="${project.website}">WEBSITE</a> | <a target="_blank" href="${project.source}">SOURCE CODE</a></p>
          </figcaption>
        </figure>`

      $('.carousel-items').append(figure);
    });
    
    let list = Object.values(document.querySelectorAll('.carousel-item'))
    let length = list.length

    slider = tns({
      container: '.carousel-items',
      items: 1,
      viewportMax: 300,
      responsive: {
        350: {
          // fixedWidth: 400,
          items: 2,
          gutter: 20
        },
        500: {
          items: 3,
          gutter: 20
        }
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
      // prevButton: 'previous',
      // nextButton: true
    });

    // console.log(list)
    // let translate, caption, spotlight;
    // let middleTerm = Math.ceil((length - 1) / 2)
    // let spotlightIndex = middleTerm
    // left.addEventListener('click', _ => {
    //   spotlightIndex = (spotlightIndex == 0) ? (list.length - 1) : (spotlightIndex - 1);
    //   spotlight = list[spotlightIndex]
    //   caption = spotlight.querySelector('figcaption')
    //   translate = (middleTerm - spotlightIndex) * 100;
    //   Object.keys(list).forEach(function (key) {
    //     list[key].style.transform = 'translateX(' + translate + '%)';
    //   })
    // })
    // right.addEventListener('click', _ => {
    //   spotlightIndex = (spotlightIndex == (list.length - 1)) ? 0 : (spotlightIndex + 1);
    //   spotlight = list[spotlightIndex]
    //   caption = spotlight.querySelector('figcaption')
    //   translate = (middleTerm - spotlightIndex) * 100;
    //   Object.keys(list).forEach(function (key) {
    //     list[key].style.transform = 'translateX(' + translate + '%)';
    //   })
    // })
  }).error(function () {
    console.log('error');
  }
  );
});

// TEAM SECTION --------------------
const icon_github = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>';
const icon_mail = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>';
const icon_website = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>'
const icon_linkedin = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>'

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
  if (member.website) {
    figure += `<a href="${member.website}">${icon_website}</a>`
  }
  if (member.linkedin) {
    figure += `<a href="${member.linkedin}">${icon_linkedin}</a>`
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
// $(function () {
//   const blogsUrl = "https://sdgniser.github.io/coding_club_blogs/";
//   $.getJSON('data/blogs.json', function (data) {
//     console.log('success');
//     $.each(data.blogs, function (i, blog) {
//       let blog_item = `<div class="blog">
//           <div class="blog-content">
//           <p class="blog-date">${blog.date}</p>
//             <a href="${blog.link}"><h3 class="blog-title">${blog.title}</h3></a>
//             <p class="blog-abstract">${blog.abstract}</p>
//             <p class="blog-author">by ${blog.author}</p>
//           </div>
//           <!-- <a href="${blog.link}" class="blog-btn">Read</a> -->
//         </div>`
//       $('.blogs').append(blog_item);
//     });
//   }).error(function () {
//     console.log('error');
//   });
// });

// $(function () {
//   const blogsUrl = "https://sdgniser.github.io/coding_club_blogs/";
  
//   $.get(blogsUrl, function (html) {
//     console.log('Fetched blogs webpage successfully.');
//     const $html = $(html);
//     const blogs = $html.find('ul.post-list > li');

//     blogs.each(function () {
//       const $blog = $(this);
//       const date = $blog.find('.post-meta').first().text();
//       const title = $blog.find('h3.post-h3 > a').text();
//       let link = $blog.find('h3.post-h3 > a').attr('href');
//       if (link.startsWith('/')) {
//         link = blogsUrl + link.slice(1); 
//       }
//       const url = new URL(link);
//       let linkArray = url.pathname.split('/').filter(component => component);    
//       const complete_link_path = `${blogsUrl}${linkArray.slice(2).join("/")}`;
//       const author = $blog.find('.post-meta').last().text();
//       const abstract = $blog.find('p.post-abstract').text() || 'No abstract available.';

//         // Create the blog item once the abstract is fetched
//         const blog_item = `
//           <div class="blog">
//             <div class="blog-content">
//               <p class="blog-date">${date}</p>
//               <a href="${complete_link_path}" target="_blank"><h3 class="blog-title">${title}</h3></a>
//               <p class="blog-author">by ${author}</p>
//               <p class="blog-abstract">${abstract}</p>
//             </div>
//           </div>`;
//         $('.blogs').append(blog_item);
//       }).fail(function () {
//         console.log(`Error fetching blog page: ${complete_link_path}`);
//       });
//     });
//   }).fail(function () {
//     console.log('Error fetching blogs webpage.');
//   });
$(function () {
  const blogsUrl = "https://sdgniser.github.io/coding_club_blogs/";

  $.get(blogsUrl, function (html) {
    console.log('Fetched blogs webpage successfully.');
    const $html = $(html);
    const blogs = $html.find('ul.post-list > li');

    const blogData = [];

    blogs.each(function () {
      const $blog = $(this);
      const date = $blog.find('.post-meta').first().text();
      const title = $blog.find('h3.post-h3 > a').text();
      let link = $blog.find('h3.post-h3 > a').attr('href');

      // Resolve relative paths
      if (link.startsWith('/')) {
        link = blogsUrl + link.slice(1);
      }

      const abstract = $blog.find('p.post-abstract').text() || 'No abstract available.';
      const author = $blog.find('.post-meta').last().text();

      blogData.push({ date, title, link, abstract, author });
    });

    // Generate blog items and append to the DOM
    $.each(blogData, function (i, blog) {
      const blog_item = `
        <div class="blog">
          <div class="blog-content">
            <p class="blog-date">${blog.date}</p>
            <a href="${blog.link}" target="_blank">
              <h3 class="blog-title">${blog.title}</h3>
            </a>
            <p class="blog-abstract">${blog.abstract}</p>
            <p class="blog-author">by ${blog.author}</p>
          </div>
        </div>`;
      $('.blogs').append(blog_item);
    });
  }).fail(function () {
    console.log('Error fetching blogs webpage.');
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
// let scrollLink = $('.scroll');
// scrollLink.click(function (e) {
//   e.preventDefault();
//   $('body,html').animate({
//     scrollTop: $(this.hash).offset().top - $('nav').height() - 20
//   }, 1000);
// });

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