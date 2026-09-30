const toast = document.getElementById('toast');
function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2200); }
document.getElementById('exportButton').addEventListener('click', () => showToast('Report export prepared'));
document.getElementById('insightsButton').addEventListener('click', () => showToast('Full insights coming soon'));
document.getElementById('previousMonth').addEventListener('click', () => showToast('Showing July 2025 comparison'));
document.getElementById('nextMonth').addEventListener('click', () => showToast('September report is not available yet'));
