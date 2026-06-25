/*=========================================
NAVBAR
=========================================*/
let lastScroll = 0;

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    // Add glass effect after scrolling
    if(currentScroll > 50){
        header.classList.add("scrolled");
    }
    else{
        header.classList.remove("scrolled");
    }

    // Always show navbar near the top
    if(currentScroll <= 100){
        header.classList.remove("hide");
        lastScroll = currentScroll;
        return;
    }

    // Scrolling down → hide navbar
    if(currentScroll > lastScroll){

        header.classList.add("hide");

    }

    // Scrolling up → show navbar
    else{

        header.classList.remove("hide");

    }

    lastScroll = currentScroll;

});

/*=========================================
MOBILE MENU
=========================================*/

function openModal(modal){

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeModal(modal){

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/*=========================================
MOBILE MENU
=========================================*/
const hamburger =
document.querySelector(".hamburger");

const mobileMenu =
document.querySelector(".mobile-menu");

hamburger.addEventListener("click",()=>{

hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");

        hamburger.classList.remove("active");

    });

});

const closeMenu =
document.querySelector(".close-menu");

closeMenu.addEventListener("click",()=>{

    mobileMenu.classList.remove("active");

    hamburger.classList.remove("active");

});

/*=========================================
PORTFOLIO FILTER
=========================================*/
const portfolioData = {

    handpoke: [

        "img/tattoo1.webp",
        "img/tattoo2.webp",
        "img/tattoo3.webp",
        "img/tattoo4.webp"

    ],

    machine: [

        "img/machine1.webp",
        "img/machine2.webp",
        "img/machine3.webp",
        "img/machine4.webp"

    ]

};

const portfolioGrid =
document.querySelector(".portfolio-grid");

function renderPortfolio(category){

    portfolioGrid.innerHTML="";

    const label =
        category==="handpoke"
        ? "Handpoke"
        : "Machine";

    portfolioData[category].forEach((image,index)=>{

        portfolioGrid.innerHTML += `

        <div class="portfolio-card"
             style="animation-delay:${index*.1}s">

            <img src="${image}">

            <span class="tattoo-type">

                ${label}

            </span>

        </div>

        `;

    });

}

renderPortfolio("handpoke");

const filters =
document.querySelectorAll(".portfolio-filter button");

filters.forEach(button=>{

    button.addEventListener("click",()=>{

        filters.forEach(btn=>
            btn.classList.remove("active-filter")
        );

        button.classList.add("active-filter");

        portfolioGrid.classList.add("fade-out");

        setTimeout(()=>{

            renderPortfolio(button.dataset.category);

            portfolioGrid.classList.remove("fade-out");

        },300);

    });

});
/*=========================================
GALLERY MODAL
=========================================*/
const openGallery =
document.querySelector(".open-gallery");

const galleryModal =
document.querySelector(".gallery-modal");

const closeGallery =
document.querySelector(".close-gallery");

const galleryBtns =
document.querySelectorAll(".gallery-filter button");





// OPEN MODAL
openGallery.addEventListener("click",()=>{

openModal(galleryModal);

    renderGallery("all");

});

// CLOSE MODAL
closeGallery.addEventListener("click",()=>{

closeModal(galleryModal);

});
/*=========================================
GALLERY DATA
=========================================*/
 const galleryGrid =
document.querySelector(".gallery-grid");

const galleryImages = {

    all:[

        {src:"img/tattoo1.webp",type:"Handpoke"},
        {src:"img/tattoo2.webp",type:"Handpoke"},
        {src:"img/tattoo3.webp",type:"Handpoke"},
        {src:"img/tattoo4.webp",type:"Handpoke"},

        {src:"img/machine1.webp",type:"Machine"},
        {src:"img/machine2.webp",type:"Machine"},
        {src:"img/machine3.webp",type:"Machine"},
        {src:"img/machine4.webp",type:"Machine"}

    ],

    handpoke:[

        {src:"img/tattoo1.webp",type:"Handpoke"},
        {src:"img/tattoo2.webp",type:"Handpoke"},
        {src:"img/tattoo3.webp",type:"Handpoke"},
        {src:"img/tattoo4.webp",type:"Handpoke"}

    ],

    machine:[

        {src:"img/machine1.webp",type:"Machine"},
        {src:"img/machine2.webp",type:"Machine"},
        {src:"img/machine3.webp",type:"Machine"},
        {src:"img/machine4.webp",type:"Machine"}

    ]

};
/*=========================================
RENDER GALLERY
=========================================*/
 function renderGallery(category){

    galleryGrid.classList.add("fade-out");

    setTimeout(()=>{

        galleryGrid.innerHTML="";

        galleryImages[category].forEach(item=>{

            galleryGrid.innerHTML += `

            <div class="gallery-card">

                <img src="${item.src}">

                <span>${item.type}</span>

            </div>

            `;

        });

        galleryGrid.classList.remove("fade-out");

        attachLightbox();

    },300);

}

galleryBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        galleryBtns.forEach(button=>{

            button.classList.remove("gallery-active");

        });

        btn.classList.add("gallery-active");

        renderGallery(btn.dataset.gallery);

    });

});
/*=========================================
LIGHTBOX
=========================================*/
const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.getElementById("lightbox-image");

const label =
document.querySelector(".lightbox-label");

const count =
document.querySelector(".lightbox-count");

let currentIndex = 0;

let images = [];

function attachLightbox(){

    images =
    [...document.querySelectorAll(".gallery-card img")];

    images.forEach((img,index)=>{

        img.onclick = ()=>{

            currentIndex = index;

            showImage();

            lightbox.classList.add("active");

        };

    });

}

function showImage(){

    lightboxImg.src=images[currentIndex].src;

    label.textContent=
    images[currentIndex]
    .parentElement
    .querySelector("span")
    .textContent;

    count.textContent=
    `${currentIndex+1} / ${images.length}`;

}

const closeLightbox =
document.querySelector(".lightbox-close");

const prevBtn =
document.querySelector(".prev-btn");

const nextBtn =
document.querySelector(".next-btn");


// CLOSE
closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});


// NEXT
nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    showImage();

});


// PREVIOUS
prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    showImage();

});


lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});


/*=========================================
FLOWERPATH
=========================================*/

const flower = document.querySelector(".about-flower");
const paths = document.querySelectorAll(".flower-path");

paths.forEach(path => {

    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

});

const flowerObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            paths.forEach((path,i)=>{

                path.animate(
                    [
                        {strokeDashoffset:path.getTotalLength()},
                        {strokeDashoffset:0}
                    ],
                    {
                        duration:1200,
                        delay:i*20,
                        fill:"forwards",
                        easing:"ease-out"
                    }
                );

            });

            flowerObserver.unobserve(flower);

        }

    });

},{
    threshold:.3
});

flowerObserver.observe(flower);

/*=========================================
KEYBOARD SHORTCUTS
=========================================*/
document.addEventListener("keydown",(e)=>{

    if(lightbox.classList.contains("active")){

        if(e.key==="Escape"){

            lightbox.classList.remove("active");

        }

        if(e.key==="ArrowRight"){

            currentIndex++;

            if(currentIndex >= images.length){

                currentIndex = 0;

            }

            showImage();

        }

        if(e.key==="ArrowLeft"){

            currentIndex--;

            if(currentIndex < 0){

                currentIndex = images.length - 1;

            }

            showImage();

        }

        return;
    }

if(e.key==="Escape" && lalaModal.classList.contains("active")){

    lalaModal.classList.remove("active");
      document.body.style.overflow = "";

    return;

}

    if(e.key==="Escape" && galleryModal.classList.contains("active")){

     closeModal(galleryModal);

        return;
    }

    if(e.key==="Escape" && mobileMenu.classList.contains("active")){

        mobileMenu.classList.remove("active");

        hamburger.classList.remove("active");

    }

    if(e.key==="Escape" &&
bookingModal.classList.contains("active")){

   closeModal(bookingModal);

    return;

}

});


/*=========================================
SCROLL REVEAL
=========================================*/

const reveals = document.querySelectorAll(
".reveal-up, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{
    threshold:.15
}

);

reveals.forEach(item=>{

    observer.observe(item);

});

/*=========================================
MEET LALA MODAL
=========================================*/

const meetLalaBtn =
document.getElementById("meet-lala-btn");

const lalaModal =
document.querySelector(".lala-modal");

const closeLala =
document.querySelector(".close-lala");

const lalaLinks =
document.querySelectorAll(".lala-buttons a");

lalaLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        closeModal(lalaModal);

    });

});


// OPEN

meetLalaBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    openModal(lalaModal);

});



// CLOSE

closeLala.addEventListener("click",()=>{

closeModal(lalaModal);

});


// CLOSE ON BACKGROUND

lalaModal.addEventListener("click",(e)=>{

    if(e.target===lalaModal){

        closeModal(lalaModal);

    }

});


/*=========================================
FILE UPLOAD NAME
=========================================*/

const fileInput =
document.getElementById("reference-upload");

const fileName =
document.querySelector(".file-name");

const uploadRow =
document.querySelector(".upload-row");

fileInput.addEventListener("change", ()=>{

    const count = fileInput.files.length;

    // Limit to 5 images
    if(count > 5){

        alert("Please upload a maximum of 5 images.");

        fileInput.value = "";

        fileName.textContent = "No file selected";

        uploadRow.classList.remove("has-file");

        return;

    }

    // No files
    if(count === 0){

        fileName.textContent = "No file selected";

        uploadRow.classList.remove("has-file");

    }

    // One file
    else if(count === 1){

        fileName.textContent = "1 image selected";

        uploadRow.classList.add("has-file");

    }

    // Multiple files
    else{

        fileName.textContent = `${count} images selected`;

        uploadRow.classList.add("has-file");

    }

});



/*=========================================
BOOKING FORM SUBMIT
=========================================*/

const bookingForm = document.getElementById("booking-form");
const submitBtn = document.getElementById("booking-submit");

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Required fields
    const name = document.getElementById("name");
    const instagram = document.getElementById("instagram");
    const email = document.getElementById("email");
    const idea = document.getElementById("idea");

    if (
        !name.value.trim() ||
        !instagram.value.trim() ||
        !email.value.trim() ||
        !idea.value.trim()
    ) {
        alert("Please complete all required fields.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(bookingForm);

    try {

        const response = await fetch(
            "https://formspree.io/f/xvzjzqbo",
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if(response.ok){

            submitBtn.textContent = "✓ Request Sent";

            sessionStorage.setItem(
                "formSubmitted",
                "true"
            );

            setTimeout(()=>{

                window.location.href =
                "thank-you.html";

            },1000);

        }

        else{

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Request Consultation";

            alert(
                "Something went wrong. Please try again."
            );

        }

    }

    catch(error){

        submitBtn.disabled = false;

        submitBtn.textContent =
            "Request Consultation";

        alert(
            "Unable to send your request. Please check your internet connection and try again."
        );

    }

});

/*=========================================
BOOKING INFO MODAL
=========================================*/

const bookingInfoBtn =
document.getElementById("booking-info-btn");

const bookingModal =
document.querySelector(".booking-modal");

const closeBooking =
document.querySelector(".close-booking");

const bookingLinks =
document.querySelectorAll(".close-booking-modal");

bookingLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        closeModal(bookingModal);

    });

});

bookingInfoBtn.addEventListener("click",(e)=>{

    e.preventDefault();

  openModal(bookingModal);

});

closeBooking.addEventListener("click",()=>{

    closeModal(bookingModal);

});

bookingModal.addEventListener("click",(e)=>{

    if(e.target===bookingModal){

        closeModal(bookingModal);

    }

});

const bookingLink =
document.querySelector(".close-booking-link");

if(bookingLink){

    bookingLink.addEventListener("click",()=>{

       closeModal(bookingModal);

    });

}

/*=========================================
FAQ ACCORDION
=========================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const header = item.querySelector(".faq-header");

    header.addEventListener("click",()=>{

        // Close others
        faqItems.forEach(faq=>{

            if(faq !== item){

                faq.classList.remove("active");

            }

        });

        // Toggle current
        item.classList.toggle("active");

    });

});
