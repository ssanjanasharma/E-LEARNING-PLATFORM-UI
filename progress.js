// Sample data structure for course progress (replace with real data or localStorage read)
const courseProgressData = {
  "Basics of HTML, CSS & JS": 100,
  "Front End Development": 80,
  "Full Stack Development": 50,
  "Python Programming": 70,
  "UI/UX Design": 20,
  "Java Programming": 40,
};

// Populate the progress bars dynamically
const progressContainer = document.getElementById('progressList');

for (const [courseName, progressValue] of Object.entries(courseProgressData)) {
  const item = document.createElement('div');
  item.className = 'progress-item';

  item.innerHTML = `
    <div class="progress-item-title">${courseName}</div>
    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressValue}">
      <div class="progress-fill" style="width: ${progressValue}%;"></div>
    </div>
    <div class="progress-value">${progressValue}% complete</div>
  `;

  progressContainer.appendChild(item);
}
