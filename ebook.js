const searchBox = document.querySelector('.ebook-search');
const cards = document.querySelectorAll('.ebook-card');
searchBox.addEventListener('input', function() {
  const val = this.value.trim().toLowerCase();
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(val) ? 'flex' : 'none';
  });
});
