
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
	// for bootstrap tooltip
	const span = document.createElement('span')
	span.setAttribute('data-toggle','modal')
	span.setAttribute('data-target','#exampleModal')
	// for single country list modal popup
	const link = document.createElement('a');
	// link.classList.add('toolTip')
	// link.setAttribute( 'data-toggle','tooltip')
	// link.setAttribute( 'data-placement','top')
	link.setAttribute( 'title','Click here to see details')

	link.addEventListener('click', e => {
		// grab the information from API and destructuring them.
		const {name,capital,languages,phone,continent,native} = country;
		// Button inside Modal Body to know more about single country
		const learnMoreBtn = document.querySelector('.learnMoreBtn')
		learnMoreBtn.innerHTML = `learn more <i class="fas fa-long-arrow-alt-right"></i>`
		learnMoreBtn.setAttribute('href',`https://en.wikipedia.org/wiki/${country.name}`)
		// Set data to modal body 
		const countryName = document.querySelector('.name').innerHTML =`Name: <span>${name}</span>`;
		const countryCapital = document.querySelector('.capital').innerHTML =`Capital: <span>${capital}</span>`;
		const countryPhone = document.querySelector('.phone').innerHTML =`Phone Code: <span>${phone}</span>`;
		const countryContinent = document.querySelector('.continent').innerHTML =`Continet: <span>${continent}</span>`;
		const countryLanguages = document.querySelector('.languages').innerHTML =`Languages: <span>${languages}</span>`;
		const countryNative = document.querySelector('.native').innerHTML =`Native: <span>${native}</span>`;
	})
	span.appendChild(link)
	link.appendChild(tdName)
	tr.appendChild(span)

	const tdCapital = document.createElement('td')
	tdCapital.innerHTML = country.capital ? country.capital: 'N/A'
	tr.appendChild(tdCapital)

	const tdPhone = document.createElement('td')
	tdPhone.innerHTML = country.phone;
	tr.appendChild(tdPhone)

	const tdNative = document.createElement('td')
	tdNative.innerHTML = country.native;
	tr.appendChild(tdNative)

	const tdContinent = document.createElement('td')
	tdContinent.innerHTML = country.continent;
	tr.appendChild(tdContinent)

	const tdLanguages = document.createElement('td')
	tdLanguages.innerHTML = country.languages;
	tr.appendChild(tdLanguages)

	parentClass.appendChild(tr) 
}


// AutoComple.js Scripts
// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete", function (event) {
	console.log(event.detail);
	console.log(autoCompletejs);
  });
  
  // The autoComplete.js Engine instance creator
  const autoCompletejs = new autoComplete({
	data: {
	  src: async function () {
		// Loading placeholder text
		document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
		// Fetch External Data Source
		const source = await fetch("http://countriesnode.herokuapp.com/v1/countries/");
		const data = await source.json();
		// Returns Fetched data
		// console.log(data);
		return data;
	  },
	  key: ["name","capital","native"],
	},
	sort: function (a, b) {
	  if (a.match < b.match) {
		return -1;
	  }
	  if (a.match > b.match) {
		return 1;
	  }
	  return 0;
	},
	query: {
	  manipulate: function (query) {
		return query.replace("@pizza", "burger");
	  },
	},
	placeHolder: "Search Country name",
	selector: "#autoComplete",
	threshold: 0,
	debounce: 0,
	searchEngine: "strict",
	highlight: true,
	maxResults: 10,
	resultsList: {
	  render: true,
	  container: function (source) {
		source.setAttribute("id", "autoComplete_results_list");
	  },
	  element: "ul",
	  destination: document.querySelector("#autoComplete"),
	  position: "afterend",
	},
	resultItem: {
	  content: function (data, source) {
		source.innerHTML = data.match;
	  },
	  element: "li",
	},
	noResults: function () {
	  const result = document.createElement("li");
	  result.setAttribute("class", "no_result");
	  result.setAttribute("tabindex", "1");
	  result.innerHTML = "No Results";
	  document.querySelector("#autoComplete_results_list").appendChild(result);
	},
	onSelection: function (feedback) {
	  const selection = feedback.selection.value.food;
	  // Render selected choice to selection div
	  document.querySelector(".selection").innerHTML = selection;
	  // Clear Input
	  document.querySelector("#autoComplete").value = "";
	  // Change placeholder with the selected value
	  document.querySelector("#autoComplete").setAttribute("placeholder", selection);
	  // Concole log autoComplete data feedback
	  console.log(feedback);
	},
  });
  
//   // On page load add class to input field
  window.addEventListener("load", function () {
	document.querySelector("#autoComplete").classList.add("out");
  });
 



const nProgessActivationFunction = () => {
	NProgress.start();
	NProgress.set(0.6); 
	NProgress.inc(); 
	NProgress.configure({ ease: 'ease', speed: 1000 }); 
	NProgress.configure({trickleSpeed: 1000 });
	NProgress.configure({ showSpinner: true });
	NProgress.done(); 
}

// NProgrss | Start only by clicking filtering items
const continent = document.querySelectorAll('.filter-continent li');
continent.forEach(singleContinent => {
	singleContinent.addEventListener('click', nProgessActivationFunction)
})

// NProgess for main menu item
const mainMenu = document.querySelectorAll('.menu li a');
mainMenu.forEach(menu => {
	menu.addEventListener('click', nProgessActivationFunction)
})