let countries = [];

window.onload = async function() {
    const root = document.querySelector('#root');
    const header = document.querySelector('.header');    
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
            path: '/about',
            name: 'About'
        }
    ]);

    // grab the current path
    const currentPath = window.location.pathname;
    if(currentPath === '/') {
        // Header Style change
        header.classList.remove('fixed')
		root.innerHTML = `
		<div class="hero-area">
			<div class="container">
				<div class="row">
					<div class="col-md-7 offset-md-2">
						<div class="hero-text">
							<h1>All Around The <span>World</span></h1>
							<p>A nation with its own government, occupying a particular territory. "the country's increasingly precarious economic position" is called a Country</p>
						<a href="pages/countries.html" class="boxed-btn active">View Country List<i class="fas fa-long-arrow-alt-right"></i></a>
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
            root.innerHTML = `No pattern matches`;
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
            root.innerHTML = `
			<div class="hero-area">
				<div class="container">
					<div class="row">
						<div class="col-md-7 offset-md-2">
							<div class="hero-text">
								<h1>All Around The <span>World</span></h1>
								<p>A nation with its own government, occupying a particular territory. "the country's increasingly precarious economic position" is called a Country</p>
							<a href="pages/countries.html" class="boxed-btn active">View Country List<i class="fas fa-long-arrow-alt-right"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
            `
            if(routeInfo.name === 'Countries') {
                header.classList.add('fixed')
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
                                <table class="table table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Capital</th>
                                            <th>Phone</th>
                                            <th>Native</th>
                                            <th>Continent</th>
                                            <th>Languages</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbody">
                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">
                                                        Country<span>List</span>
                                                    </h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p class="name"></p>
                                                        <p class="capital"></p>
                                                        <p class="phone"></p>
                                                        <p class="native"></p>
                                                        <p class="continent"></p>
                                                        <p class="languages"></p>
                                                        <a href="" class="learnMoreBtn"></a>
                                                    </div>
                                                    <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
            `
			fetchAndUpdate()
			}
			if(routeInfo.name === "About") {
				root.innerHTML = `
					<h3 class="pd-50 bg-success text-center">About Page</h3>
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
	link.style.cursor = "url('http://bringerp.free.fr/Files/RotMG/cursor.gif'), auto";
	// link.classList.add('toolTip')
	// link.setAttribute( 'data-toggle','tooltip')
	// link.setAttribute( 'data-placement','top')
	link.setAttribute( 'title','Click here to see details')

	link.addEventListener('click', () => {
		// grab the information from API and destructuring them.
		const {name,capital,languages,phone,continent,native} = country;
		// Button inside Modal Body to know more about single country
		const learnMoreBtn = document.querySelector('.learnMoreBtn')
		learnMoreBtn.innerHTML = `learn more <i class="fas fa-long-arrow-alt-right"></i>`
		learnMoreBtn.setAttribute('href',`https://en.wikipedia.org/wiki/${country.name}`)
		learnMoreBtn.setAttribute('target', '_blank');
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
    console.log(singleContinent)
	singleContinent.addEventListener('click', nProgessActivationFunction)
})

// NProgess for main menu item
const mainMenu = document.querySelectorAll('.menu li');
mainMenu.forEach(menu => {
	menu.addEventListener('click', nProgessActivationFunction)
})
