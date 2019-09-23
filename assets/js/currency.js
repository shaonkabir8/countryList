
// Smooth scrolling effect 
const scrollTop = document.querySelector('.scrollTop');
scrollTop.addEventListener('click', e => {
	e.preventDefault();
	window.scrollTo({top: 0, behavior: 'smooth'});
})
// if scroll will be 100 =>
window.onscroll = function() {
	if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		scrollTop.setAttribute('style','display:block;')
	} else {
		scrollTop.setAttribute('style','display:none')
	}
}

// Countries List function
const tbody = document.querySelector('.tbody')
let countries = [];
window.onload = async function() {
    const res = await fetch('https://countriesnode.herokuapp.com/v1/countries');
    const json = await res.json();
    countries = json
	updateDom(countries)
}

function updateDom(countries) {
	tbody.innerHTML = ""
	if(countries) {
	  countries.forEach(country => {
		  createTdElement(country, tbody)
	  })
	}
  }

function filterByContinent(continent) {
	const filterContinent = countries.filter(item => {
		return item.continent === continent
	})
	updateDom(filterContinent)
}



// creating a function to display data as table
function createTdElement(country,parentClass) {

	const tr = document.createElement('tr');

	const tdName = document.createElement('td')
    tdName.innerHTML = country.name
    tr.appendChild(tdName)

    const tdCurrency = document.createElement('td')
	tdCurrency.innerHTML = country.currency;
	// for bootstrap tooltip
	const span = document.createElement('span')
	span.setAttribute('data-toggle','modal')
	span.setAttribute('data-target','#exampleModal')
	// for single country list modal popup
	const link = document.createElement('a');
	link.style.cursor = "url('http://bringerp.free.fr/Files/RotMG/cursor.gif'), auto";
	// link.classList.add('toolTip')
	// link.setAttribute( 'data-toggle','tooltip')
	// link.setAttribute( 'data-placement','top')
	link.setAttribute( 'title','Click here to see details')

	link.addEventListener('click', e => {
		// grab the information from API and destructuring them.
		const {name,capital,languages,currency} = country;
		// Button inside Modal Body to know more about single country
		const learnMoreBtn = document.querySelector('.learnMoreBtn')
		learnMoreBtn.innerHTML = `learn more <i class="fas fa-long-arrow-alt-right"></i>`
		learnMoreBtn.setAttribute('href',`https://en.wikipedia.org/wiki/${currency}`)
		learnMoreBtn.setAttribute('target', '_blank');
		// Set data to modal body 
		const countryName = document.querySelector('.name').innerHTML =`Country Name : <span>${name}</span>`;
		const countryCapital = document.querySelector('.capital').innerHTML =`Capital: <span>${capital}</span>`;
		const countryCurrency = document.querySelector('.currency').innerHTML =`Currency: <span>${currency}</span>`;
		const countryLanguages = document.querySelector('.languages').innerHTML =`Languages: <span>${languages}</span>`;
	})
	span.appendChild(link)
	link.appendChild(tdCurrency)
	tr.appendChild(span)

	const tdLanguages = document.createElement('td')
	tdLanguages.innerHTML = country.languages;
	tr.appendChild(tdLanguages)

	parentClass.appendChild(tr) 
}

const nProgessActivationFunction = () => {
	NProgress.start();
	NProgress.set(0.6); 
	NProgress.inc(); 
	NProgress.configure({ ease: 'ease', speed: 1000 }); 
	NProgress.configure({trickleSpeed: 1000 });
	NProgress.configure({ showSpinner: true });
	NProgress.done(); 
}

// NProgess for main menu item
const mainMenu = document.querySelectorAll('.menu li a');
mainMenu.forEach(menu => {
	menu.addEventListener('click', nProgessActivationFunction)
})