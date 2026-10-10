const copyLinks = document.querySelectorAll('[data-copy]');
const copyToast = document.querySelector('#copy-toast');
let toastTimer;

function showCopyMessage(message) {
  copyToast.textContent = message;
  copyToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => copyToast.classList.remove('is-visible'), 2200);
}

copyLinks.forEach((link) => {
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    const value = link.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    }

    showCopyMessage(link.dataset.message);
  });
});
