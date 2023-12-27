window.addEventListener("DOMContentLoaded", (e) => {
  // e284532b259847f0be14d7edfead684e//
  function fetchnews(general) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${general}&apiKey=e284532b259847f0be14d7edfead684e`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        startSlideshow(data.articles);
        // console.log(data.articles);
        const id = document.getElementById("NewsBox");
        id.innerHTML = "";

        // =========================maincontainer======================
        data.articles.forEach((element) => {
          const title = element.title.slice(0, 30) + "...";
          const date = element.publishedAt.slice(0, 10);
          const description =
            element.description ||
            element.content ||
            `The “X” logo is a part of the larger effort to make the micro-blogging platform into an “everything app” modelled on the lines of Chinas WeChat`;

          const newscontainer = document.createElement("div");
          newscontainer.innerHTML = `
                <div class="card m-2 main-card" style="width: 18rem;" >
                <img src=${
                  element.urlToImage ||
                  "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
                } 
                class="card-img-top" id="mainimg" alt="...">
                <div class="card-body">
                <p class="author">${element.author || "Anonymous"}</p>
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description.slice(0, 80)}</p>
           <div class="smallbox">
           <a href=${
             element.url
           } class="btn btn-danger shadow" style="background-color:red;" >Read More</a>
           <p>${date}</p>
           </div>
           </div>
           </div>`;
          const id = document.getElementById("NewsBox");
          id.appendChild(newscontainer);
        });
      });
  }
  fetchnews("general");
  fetchbycat();

  // ======================carousel======================

  const slideshowImg = document.getElementById("slideshow-img");
  const showtitle = document.getElementById("showtitle");
  console.log(showtitle)
  function startSlideshow(articles) {
    let currentIndex = 0;
    function updateImage() {
      slideshowImg.src =
        articles[currentIndex].urlToImage ||
        "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg";
        showtitle.innerText = articles[currentIndex].title
        // console.log(show)
      currentIndex = (currentIndex + 1) % articles.length;
    }
    updateImage();
    setInterval(updateImage, 7000);
  }
  fetchnews("general");

  // ==============================================for navbar buttons =============
  function fetchbycat() {
    const nav = document.getElementsByClassName("nav-link");
    Array.from(nav).forEach((element) => {
      element.addEventListener("click", (e) => {
        const target = e.target.textContent.toLowerCase();
        fetchnews(target);
      });
    });
    // console.log("ld");
  }
});

