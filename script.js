'user strict';

const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector('#toggle-icon');
const images = Array.from({ length: 3 }, (_, index) => document.querySelector(`#about-img-${index + 1}`));

function switchImages(theme) {
	return images.map((img) => {
		const newSrc = img.src.replace(/(light|dark)(?=\.svg)/gi, theme);
		img.src = newSrc;
	});
}

function switchTheme(isDark) {
	const html = document.documentElement;
	const text = toggleIcon.children[0];
	const icon = toggleIcon.children[1];

	if (isDark) {
		html.setAttribute('data-theme', 'dark');
		icon.classList.replace('fa-sun', 'fa-moon');
		text.textContent = 'Dark Mode';
		localStorage.theme = 'dark';
		switchImages('dark');
	} else {
		html.removeAttribute('data-theme');
		icon.classList.replace('fa-moon', 'fa-sun');
		text.textContent = 'Light Mode';
		localStorage.theme = 'light';
		switchImages('light');
	}
}

function initializeTheme() {
	const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && isDarkModePreferred);

	if (isDark) toggleSwitch.checked = true;
	switchTheme(isDark);
}

initializeTheme();
toggleSwitch.addEventListener('change', (e) => switchTheme(e.target.checked));
