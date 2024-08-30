// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const videos = [
        {
            title: 'Enron: Sample Documentary',
            date: '1 Year Ago',
            url: 'https://www.youtube.com/embed/i9mF9ILeMWs?si=Rky57984Yfeo51Ih'
        },
        {
            title: 'Eleven Labs: A Test of AI power',
            date: '2 Years Ago',
            url: 'https://www.youtube.com/embed/w_7-Ky6UASw?si=eBVAgOt8HPkOmhHW'
        },
        {
            title: 'Showreel For Fiverr',
            date: '2 Years Ago',
            url: 'https://www.youtube.com/embed/302Ub1j-_IU?si=xdS4Z8i-Mz5EzCYH'
        },
        // Add more video objects as needed
    ];
    const videoGrid = document.querySelector('.video-grid');
    const dynamicIsland = document.getElementById('dynamic-island');
    const toolbar = document.getElementById('toolbar');
    const toggleDateButton = document.getElementById('toggle-date');
    const toggleColorButton = document.getElementById('toggle-color');
    const videoDetails = document.querySelectorAll('.video-details p');
    const timeDisplay = document.createElement('p');
    const aboutMeButton = document.getElementById('about-me-btn');
    const contactMeButtonToolbar = document.getElementById('contact-me-btn');
    timeDisplay.id = 'time-display';
    timeDisplay.style.display = 'none';
    document.body.appendChild(timeDisplay);
    let dateVisible = localStorage.getItem('dateVisible') === 'true';
    let darkMode = localStorage.getItem('darkMode') === 'true';
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

    // Apply saved states
    if (dateVisible) {
        videoDetails.forEach(detail => {
            detail.style.display = 'block';
        });
    } else {
        videoDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    

    dynamicIsland.addEventListener('click', () => {
        toolbar.classList.toggle('hidden');
        dynamicIsland.style.transform = toolbar.classList.contains('hidden') ? 'translateX(-50%)' : 'translateX(-50%) translateY(50px)';
    });

    toggleDateButton.addEventListener('click', () => {
        dateVisible = !dateVisible;
        localStorage.setItem('dateVisible', dateVisible);
        videoDetails.forEach(detail => {
            detail.style.display = dateVisible ? 'block' : 'none';
        });
    });

    toggleColorButton.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark-mode');
    });
    aboutMeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
    contactMeButtonToolbar.addEventListener('click', () => {
        window.location.href = 'mailto:perfectusdavid@writeme.com?subject=Your%20Subject%20Here&body=Your%20message%20here'; 
    });

    if (videoGrid) {
        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');

            videoItem.innerHTML = `
              <iframe  src = "${video.url}  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div class="video-details">
                    <h3>${video.title}</h3>
                    <p>Uploaded : ${video.date}</p>
                </div>
            `;

            videoGrid.appendChild(videoItem);
        });
    }

    const contactMeButton = document.getElementById('contact-me');
    if (contactMeButton) {
        contactMeButton.addEventListener('click', () => {
            window.location.href = 'https://forms.gle/your-google-form-link';
        });
    }
    const fetchTime = async () => {
        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/Africa/Lagos');
            const data = await response.json();
            const currentTime = new Date(data.datetime).toLocaleTimeString();
            timeDisplay.textContent = `Current Time: ${currentTime}`;
            timeDisplay.style.display = 'block';
        } catch (error) {
            console.error('Error fetching time:', error);
        }
    };

    toggleDateButton.addEventListener('click', () => {
        if (timeDisplay.style.display === 'none') {
            fetchTime();
        } else {
            timeDisplay.style.display = 'none';
        }
    });
});