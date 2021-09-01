(function(){
    const container = document.querySelector('.image-container');

    document.addEventListener("DOMContentLoaded", function() {
        initImages(30);
        loadLazyImages();
        removeImage();
        suffleImages();
    });
    
    function initImages(count){
        let images = '';
        for(let i=0;i<count;i++){
            const w = Math.floor(200 + Math.random() * 100);
            images += `<div id="img-${i}" class="image-box">
            <div class="image-box-inner">
              <div class="image-box-front">
                <img class="lazy-image" src="https://via.placeholder.com/200" data-src="https://source.unsplash.com/random/${w}x${w}" alt="unspash captures">
              </div>
              <div class="image-box-back">
                <div class="desc">  
                    <h2>nature</h2>
                    <p>We love nature images.</p>
                    <button id="${i}" class="remove">X</button>
                </div>
              </div>
            </div>
          </div>`;
          container.innerHTML = images;
        }
    }
    
    
    function loadLazyImages(){
        let images = [...document.querySelectorAll('.lazy-image')];
        if ("IntersectionObserver" in window) {
            let imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy-image");
                    imageObserver.unobserve(image);
                  }
                });
              });
    
            images.forEach(image => imageObserver.observe(image));
        } else {
            // polyfill in case of unsupported browser handling
            let lazyloadThrottleTimeout;
            function lazyload () {
                if(lazyloadThrottleTimeout) {
                  clearTimeout(lazyloadThrottleTimeout);
                } 
                lazyloadThrottleTimeout = setTimeout(function() {
                    images.forEach(function(el) {
                        if(el.scrollTop + el.clientHeight >= el.scrollHeight){
                          const url = el.getAttribute("data-src");
                          el.setAttribute("src", url);
                          el.classList.remove("lazy-image");
                          images = [...document.querySelectorAll('.lazy-image')];
                        }
                    });
                    if(images.length == 0) { 
                      window.removeEventListener("scroll", lazyload);
                    }
                }, 20);
            } 
    
            window.addEventListener("scroll", lazyload);
        }
    }
    
    
    function removeImage(){
        container.addEventListener('click', function(e){
            if(e.target.classList.contains('remove')){
                const id = e.target.id;
                const el = document.getElementById(`img-${id}`);
                el.remove();
            }
        });
    }
    
    
    function suffleImages(){
        const btn = document.querySelector('.suffle-btn');
        btn.addEventListener('click', function(){
            for (let i = container.children.length - 1; i > 0; i--) {
                container.appendChild(container.children[Math.floor(Math.random() * (i + 1))]);
            }
        });
    }    
})();
