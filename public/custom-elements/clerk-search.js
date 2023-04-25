// Attributes with significance which are expected to be static.
const RESERVED_ATTRIBUTES = [
    'template',
    'target',
    'facets-target',
    'facets-attributes',
    'facets-titles',
    'facets-price-prepend',
    'facets-in-url',
    'facets-view-more-text',
    'facets-searchbox-text',
    'facets-design'
];

const DEFAULT_INNER_HTML = `<div id="clerk-search-page-wrap">
                                <div id="clerk-facets-wrap">
                                    <div id="clerk-facet-toggle"></div>
                                    <div id="clerk-search-filters"></div>
                                </div>
                                <div id="clerk-search-results"></div>
                            </div>`;


const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (
            mutation.attributeName !== "data-query"
        ) {
            return
        }
        mutation.target.removeAttribute('data-clerk-content-id');
        mutation.target.innerHTML = DEFAULT_INNER_HTML;
        window.Clerk('content', `.${window.clerk_init_class}`);
    }
}

const observer = new MutationObserver(mutationCallback);

class clerkSearch extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return RESERVED_ATTRIBUTES;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this && newValue) {
            if (RESERVED_ATTRIBUTES.includes(name)) {
                this.removeAttribute(name);
            }
            if (name === 'template') {
                // If input template, set data attribute and force ID on element
                this.dataset.template = newValue;
                this.id = newValue.replace('@', '');
            }
            if (name === 'target') {
                this.dataset.target = newValue;
            }
            if (name === 'facets-target') {
                this.dataset.facetsTarget = newValue;
            }
            if (name === 'facets-attributes') {
                this.dataset.facetsAttributes = newValue;
            }
            if (name === 'facets-titles') {
                this.dataset.facetsTitles = newValue;
            }
            if (name === 'facets-price-prepend') {
                this.dataset.facetsPricePrepend = newValue;
            }
            if (name === 'facets-in-url') {
                this.dataset.facetsInUrl = newValue;
            }
            if (name === 'facets-view-more-text') {
                this.dataset.facetsViewMoreText = newValue;
            }
            if (name === 'facets-design') {
                this.dataset.facetsDesign = newValue;
            }
        }
    }

    disconnectedCallback() {
        observer.disconnect();
    }

    connectedCallback() {
        // Setting Default values and propagating event.
        this.className = window.clerk_init_class;
        this.dataset.template = '@search-page';
        this.dataset.target = '#clerk-search-results';
        this.dataset.facetsTarget = '#clerk-search-filters';
        this.innerHTML = DEFAULT_INNER_HTML;
        window.Clerk('content', `.${window.clerk_init_class}`);
        observer.observe(this, { attributes: true, childList: false, characterData: false });
    }

}

customElements.define('clerk-search', clerkSearch);