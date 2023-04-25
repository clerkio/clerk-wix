// Attributes with significance which are expected to be static.
const RESERVED_ATTRIBUTES = [
	'template',
	'instant-search',
    'instant-search-suggestions',
    'instant-search-categories',
    'instant-search-pages',
    'instant-search-positioning'
];

class clerkLiveSearch extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return RESERVED_ATTRIBUTES;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(this && newValue){
			if(RESERVED_ATTRIBUTES.includes(name)) {
				this.removeAttribute(name);
			}
			if(name === 'template'){
				// If input template, set data attribute and force ID on element
				this.dataset.template = newValue;
				this.id = newValue.replace('@', '');
			}
			if(name === 'instant-search'){
				this.dataset.instantSearch = newValue;
			}
            if(name === 'instant-search-suggestions'){
				this.dataset.instantSearchSuggestions = newValue;
			}
            if(name === 'instant-search-categories'){
				this.dataset.instantSearchCategories = newValue;
			}
            if(name === 'instant-search-pages'){
				this.dataset.instantSearchPages = newValue;
			}
            if(name === 'instant-search-positioning'){
				this.dataset.instantSearchPositioning = newValue;
			}
		}
	}

	connectedCallback() {
        // Setting Default values and propagating event.
		this.className = window.clerk_init_class;
        this.dataset.template = '@live-search';
        this.dataset.instantSearch = 'input[type="search"]';
		this.dataset.instantSearchSuggestions = 5;
		this.dataset.instantSearchCategories = 5;
		this.dataset.instantSearchPages = 5;
		this.dataset.instantSearchPositioning = 'left';
		window.Clerk('content', `.${window.clerk_init_class}`);
	}

}

customElements.define('clerk-live-search', clerkLiveSearch);