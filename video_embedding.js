// Select all video links and the iframe player
const videoLinks = document.querySelectorAll('.video-links a');
const videoFrame = document.getElementById('courseVideo');

videoLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    // Get video URL from data attribute
    const videoURL = link.getAttribute('data-video');

    // Update iframe src
    videoFrame.src = videoURL;

    // Update active state styling
    videoLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
