document.addEventListener('DOMContentLoaded', () => {
    const botGif = document.getElementById('bot-gif');
    const welcomeGif = document.getElementById('welcome-gif');
    const description = document.getElementById('description');
    const blueFlame = document.getElementById('blue-flame');
    const blueTickPng = document.getElementById('blue-tick-png');
    const name = document.getElementById('name');
    const socialGifs = document.querySelectorAll('.social-gif');
    const blueTick = document.getElementById('blue-tick');
    const gpsGif = document.getElementById('gps-gif');
    const video = document.getElementById('background-video');
    const flickerImages = document.getElementById('flicker-images');
    const modal = document.getElementById('certModal');
    const closeModal = document.querySelector('.close');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const videoContainer = document.querySelector('.video-container');
    const certifications = document.getElementById('certifications');
    const text = `Hey, I'm Alex. I've been editing videos for about 5 years now, and I absolutely love it. There's something magical about taking a bunch of random clips and turning them into a story that actually means something.
    I've worked on all kinds of projects - music videos, documentaries, you name it. Each one is different and that's what keeps it exciting for me. I'm always trying to come up with new ideas and push myself creatively.
If you check out my portfolio, you'll see some of the work I'm most proud of. I put a ton of effort into getting all the little details right - the pacing, the music, the color grading. It's those small touches that can really make a video pop.
I'm a bit of a tech nerd too, so I'm always on the lookout for new tools and techniques to improve my craft. At the end of the day, my goal is pretty simple - I want to make videos that grab people's attention and stick with them.
Take a look at my stuff and let me know what you think. If you've got a project in mind, I'd love to hear about it. Maybe we can team up and create something awesome.`;

   document.addEventListener('contextmenu', function(e) {
     e.preventDefault();
     
   });
   
   document.onkeydown = function(e) {
    if(e.keyCode == 123) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}


    // Show the blue flame first
    blueFlame.classList.remove('hidden');

    // Show the name after the blue flame
    setTimeout(() => {
        name.classList.remove('hidden');
    }, 2000); // 2 seconds delay for the blue flame

    // Show the blue tick after the name
    setTimeout(() => {
        blueTick.classList.remove('hidden');
    }, 4000); // 2 seconds after the name appears

    setTimeout(() => {
        blueTickGif.classList.add('hidden');
        blueTickPng.classList.remove('hidden');
    }, 8000); // 4 seconds after the blue tick GIF appears

    // Show the bot GIF first
    botGif.classList.remove('hidden');

    // Show the welcome GIF after the bot GIF drops down
    setTimeout(() => {
        welcomeGif.classList.remove('hidden');
    }, 2000); // 2 seconds delay for the bot GIF to drop down
    
    setTimeout(() => {
        gpsGif.classList.remove('hidden');
    }, 1000); 
    
    // Hide the welcome GIF before the bot GIF
    setTimeout(() => {
        welcomeGif.classList.add('hidden');
    }, 9000); // 4 seconds after the welcome GIF appears

    // Show social GIFs one by one
    socialGifs.forEach((gif, index) => {
        setTimeout(() => {
            gif.classList.remove('hidden');
            gif.style.opacity = '1';
            gif.style.transform = 'translateX(0)';
        }, index * 17000); // Delay each GIF by 500ms
    });

    // Typing effect for the description
    video.addEventListener('ended', () => {
      videoContainer.classList.add('hide')
        setTimeout(() => {
            videoContainer.classList.remove('hide')
            video.play();
        }, 60000); // 1 minute interval
    });

    // Typing effect for the description
    let index = 0;
    function type() {
        if (index < text.length) {
            description.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            // Show the video container after the text is fully typed out
            videoContainer.classList.remove('hide');
            video.play(); // Start playing the video
        }
    }
    type();

    let currentIndex = 0;

    // Show modal on click
    flickerImages.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Add blur effect
        showImage(currentIndex); // Show the initial image
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Remove blur effect
    });

    // Function to show image based on currentIndex with animation
    function showImage(index) {
        carouselImages.forEach((img, idx) => {
            if (idx === index) {
                img.style.opacity = '0';
                img.style.display = 'block';
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.5s ease-in-out'; // Fade-in animation
                }, 50);
            } else {
                img.style.display = 'none';
            }
        });
    }

    // Function to navigate to the next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        showImage(currentIndex);
    }

    // Function to navigate to the previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        showImage(currentIndex);
    }

    // Automatically switch to the next image every 3 seconds
    let autoSlide = setInterval(showNextImage, 15000);

    // Pause the auto-slide when the user interacts with the carousel
    function pauseAutoSlide() {
        clearInterval(autoSlide);
    }

    // Resume the auto-slide after a delay
    function resumeAutoSlide() {
        autoSlide = setInterval(showNextImage, 27000);
    }

    // Swipe functionality
    let startX;
    modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        pauseAutoSlide(); // Pause auto-slide when user starts swiping
    });

    modal.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            showNextImage();
        } else if (startX < endX - 50) {
            showPrevImage();
        }
        resumeAutoSlide(); // Resume auto-slide after swiping
    });

    // Hide modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Remove blur effect
            clearInterval(autoSlide); // Stop auto-slide when modal is closed
        }
    });

    // Initial display of the first image
    showImage(currentIndex);
});
