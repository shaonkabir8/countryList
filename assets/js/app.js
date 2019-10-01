let countries = [];
const header = document.querySelector('.header');

window.onload = async function() {
    const root = document.querySelector('#root');
    // Create a Router Constructor
    function Router(name, routes) {
        return{
            name:name,
            routes: routes
        }
    }
    // my first routes
    const Routes = new Router('Routes', [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/countries',
            name: 'Countries'
        },
        {
            path: '/country',
            name: 'singleCountry'
        },
        {
            path: '/about',
            name: 'About'
        }
    ]);

    // grab the current path
    const currentPath = window.location.pathname;
    if(currentPath === '/') {
        // Header Style change
        header.classList.remove('fixed')
        document.querySelector('.search-box').style.display = 'none'

		root.innerHTML = `
            <div class="hero-area">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 offset-md-2">
                            <div class="hero-text">
                                <h1>All Around The <span>World</span></h1>
                                <p>A nation with its own government, occupying a particular territory. "the country's increasingly precarious economic position" is called a Country</p>
                            <a
                                route="/countries"
                                class="boxed-btn active"
                            >
                                View Country List
                                <i class="fas fa-long-arrow-alt-right"></i>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		`
    } else {
        const route = Routes.routes.filter(singleRoute => singleRoute.path === currentPath)[0];
        if(route) {
            root.innerHTML = `You are on ${route.name} path`;
        } else {
            root.innerHTML = `
            <div class="hero-area">
			<div class="container">
				<div class="row">
					<div class="col-md-7 offset-md-2">
						<div class="hero-text">
							<h1>All Around The <span>World</span></h1>
							<p>A nation with its own government, occupying a particular territory. "the country's increasingly precarious economic position" is called a Country</p>
                        <a
                            route="/countries"
                            class="boxed-btn active"
                        >
                            View Country List
                            <i class="fas fa-long-arrow-alt-right"></i>
                        </a>
						</div>
					</div>
				</div>
			</div>
		</div>                                              
            `;
        }
    }

    // grab the active routes
    const activeRoutes = Array.from(document.querySelectorAll('[route]'));

    // Navigate function
    const navigate = (e) => {
        const route = e.target.attributes[0].value
        const routeInfo = Routes.routes.filter(singleRoute => singleRoute.path === route)[0];
		console.log(route)

        if(!routeInfo) {
            window.history.pushState({}, 'name', '404');
            root.innerHTML = "No Path Exists !!"
        } else {
            window.history.pushState({}, 'name', routeInfo.path);
            header.classList.remove('fixed')
            document.querySelector('.search-box').style.display = 'none'
            root.innerHTML = `
			<div class="hero-area">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7 offset-md-2">
                            <div class="hero-text">
                                <h1>All Around The <span>World</span></h1>
                                <p>A nation with its own government, occupying a particular territory. "the country's increasingly precarious economic position" is called a Country</p>
                            <a
                                route="/countries"
                                class="boxed-btn active"
                            >
                                View Country List
                                <i class="fas fa-long-arrow-alt-right"></i>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            if(routeInfo.name === 'Countries') {
                header.classList.add('fixed')
                document.querySelector('.search-box').style.display = 'inline-block'

                root.innerHTML = `
				<div class="country-list">
                <div class="container">
                    <div class="row filter">
                        <div class="col-md-12">
                            <ul class="filter-continent">
                                <li onclick="filterByContinent('')" class="active show">All</li>
                                <li onclick="filterByContinent('AS')">Asia</li>
                                <li onclick="filterByContinent('EU')">Europe</li>
                                <li onclick="filterByContinent('NA')">North America</li>
                                <li onclick="filterByContinent('SA')">South America</li>
                                <li onclick="filterByContinent('OC')">Australia</li>
                                <li onclick="filterByContinent('AF')">Africa</li>
                                <li onclick="filterByContinent('AN')">Anterctica</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover table-responsive-sm">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Capital</th>
                                            <th>Currency</th>
                                            <th>Code</th>
                                            <th>Phone</th>
                                            <th>Native</th>
                                            <th>Continent</th>
                                            <th>Languages</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <a href="" class="scrollTop"></a>
                </div>
			</div>
            `
			fetchAndUpdate()
            scrollFunction()
            filterNProgress()
            changeActiveClass()
			}
			if(routeInfo.name === "About") {
				root.innerHTML = `
                <div class="about-page">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 offset-md-2">
                                <div class="about-content">
                                    <h5>Stack and Tools Used :)</h5>
                                    <div class="stack">
                                        <ul>
                                            <li><a href=""><i class="fab fa-html5"></i> <span>HTML</span></a></li>
                                            <li><a href=""><i class="fab fa-css3"></i> <span>CSS</span></a></li>
                                            <li><a href=""><i class="fab fa-js"></i> <span>JavaScript</span></a></li>
                                            <li><a href=""><i class="fab fa-bootstrap"></i> <span>Bootstrap</span></a></li>
                                            <li><a href=""><i class="fab fa-font-awesome"></i> <span>Font Awesome</span></a></li>
                                            <li><a href=""><i class="fas fa-font"></i> <span>Google Font</span></a></li>
                                        </ul>
                                        <p>View Source Code on <a href="https://github.com.com/Shaonkabir/countries" target="_blank">Github <i class="fab fa-github"></i></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				`
            }
        }
    }
    // Event Listener
    activeRoutes.forEach(route => {
        route.addEventListener('click', navigate, false)
    })	
}


	// Country List 
async function fetchAndUpdate () {
	const res = await fetch('https://countriesnode.herokuapp.com/v1/countries');
	const json = await res.json();
	countries = json;
	console.log(countries)
	updateDom(countries);
}

function updateDom(countries) {
	const tbody = document.querySelector('.tbody')
	tbody.innerHTML = ""
	if(countries) {
		countries.forEach(country => {
			createTdElement(country, tbody)
		})
	}
}


function filterByContinent(continent) {
    if(continent) {
        const filterContinent = countries.filter(item => {
            return item.continent === continent
        })
        updateDom(filterContinent)
    } else {
        updateDom(countries)
    }
}



// creating a function to display data as table
function createTdElement(country,parentClass) {
    const {name,capital,currency,languages,phone,continent,native,code} = country;
    
    const tr = document.createElement('tr');
    
	const tdName = document.createElement('td')
	tdName.innerHTML = country.name;
	tdName.style.cursor = "url('http://bringerp.free.fr/Files/RotMG/cursor.gif'), auto";
	tdName.setAttribute( 'title','Click here to see details')
    
	tdName.addEventListener('click', () => {
        // Change URL accroding to click with actual data
        window.history.pushState({}, '', `/countries/${code}`)
        
        // Remove 'fixed' Class from Header
        document.querySelector('.header').classList.remove('fixed');
        // Hide autoComplete
        document.querySelector('#autoComplete').style.display = 'none'
        // Change Root Element Content
        document.querySelector('#root').innerHTML = `
            <div class="single-country-list">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="country-header">
                                <h3>${name}</h3>
                            </div>
                            <div class="country-content">
                                <h5>Country Name: <span>${name}</span></h5>
                                <h5>Capital: <span>${capital ? capital: 'N/A'}</span></h5>
                                <h5>Currency: <span>${currency}</span></h5>
                                <h5>Phone Code: <span>${phone}</span></h5>
                                <h5>Country Code: <span>${code}</span></h5>
                                <h5>Native: <span>${native}</span></h5>
                                <h5>Languages: <span>${languages}</span></h5>
                                <h5>Continent: <span>${continent}</span></h5>
                                <a href="https://en.wikipedia.org/wiki/${name}" target="_blank" class="boxed-btn">Learn More<i class="fas fa-long-arrow-alt-right"></i></a>
                                <a href="/" class="boxed-btn">Back to Home Page <i class="fas fa-long-arrow-alt-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

	})
	tr.appendChild(tdName)

	const tdCapital = document.createElement('td')
	tdCapital.innerHTML = capital ? capital: 'N/A'
	tr.appendChild(tdCapital)

	const tdCurrency = document.createElement('td')
	tdCurrency.innerHTML = currency;
	tr.appendChild(tdCurrency)

	const tdCode = document.createElement('td')
	tdCode.innerHTML = code;
	tr.appendChild(tdCode)

	const tdPhone = document.createElement('td')
	tdPhone.innerHTML = phone;
	tr.appendChild(tdPhone)

	const tdNative = document.createElement('td')
	tdNative.innerHTML = native;
	tr.appendChild(tdNative)

	const tdContinent = document.createElement('td')
	tdContinent.innerHTML = continent;
	tr.appendChild(tdContinent)

	const tdLanguages = document.createElement('td')
	tdLanguages.innerHTML = languages;
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

// NProgrss | Start only by clicking filtering items
const filterNProgress = () => {
    document.querySelectorAll('.filter-continent li').forEach(singleContinent => {
        singleContinent.addEventListener('click', nProgessActivationFunction)
    })
}

// NProgess for main menu item
const mainMenu = document.querySelectorAll('.menu li');
mainMenu.forEach(menu => {
	menu.addEventListener('click', nProgessActivationFunction)
})

// Active Class Changing for Filtering Button
function changeActiveClass(){
    var btns = document.querySelectorAll('.filter-continent li');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.querySelectorAll('.filter-continent li.active');
            this.className += "active";
            current[0].className = current[0].className.replace("active", "");
        });
    }
}


// Scroll Top Icon
const scrollFunction = () => {
    // Smooth scrolling effect 
    const scrollTop = document.querySelector('.scrollTop');
    scrollTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    // Scroll ToTop will be vissable after 100px of scrolling [Scroll Function]
    window.onscroll = function() {
        if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTop.setAttribute('style','display:block;')
        } else {
            scrollTop.setAttribute('style','display:none')
        }
    }
}



// AUTO COMPLETE BOX

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



  // Media Query for Humburger Menu
window.onresize = function() {
    const smallMenu = document.querySelector('.smallScreenMenu');
    const mainMenu = document.querySelector('.menu')
    let width =  window.innerWidth;
    // // @media (min-width: 768px) { ... }
    if(width <= 768) {
        smallMenu.style.display = 'block';
        mainMenu.style.display = 'none';
        document.querySelector("#autoComplete").style.display = 'none'
    } else {
        smallMenu.style.display = 'none';
        mainMenu.style.display = 'block';
    }

    // @media (min-width:550px) and (max-width:990px)
    if(width >=550 && width <= 990) {
        const root = document.querySelector('#root');
       if(header.classList.contains('fixed')) {
           root.style.paddingTop = '50px'
           document.querySelector('.navbar-toggler.smallScreenMenu').style.top = '-55px'
       } else {
        root.style.paddingTop = '0px';
        document.querySelector('.navbar-toggler.smallScreenMenu').style.top = '-35px'
       }
    }
    // @media (max-width:500)
    if(width > 500) {
        if(header.classList.contains('fixed')) {
            root.style.paddingTop = '60px'; 
        }     
    }
    // @media (max-width:990)
    if(width > 990) {
        if(header.classList.contains('fixed')) {
            root.style.paddingTop = '30px'; 
        }     
    }
    // @media (max-width:1200)
    if(width > 1200) {
        if(header.classList.contains('fixed')) {
            root.style.paddingTop = '15px'; 
        }     
    }
};