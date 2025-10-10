const audio = document.getElementById('bg-audio');
const timeDisplay = document.getElementById('audio-time');

// Update timer for audio
audio.addEventListener('timeupdate', () => {
  const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  const mins = Math.floor(audio.currentTime / 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${mins}:${secs}`;
});

// Small fade-in effect when scrolling
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('opacity-100', 'translate-y-0');
    }
  });
});
