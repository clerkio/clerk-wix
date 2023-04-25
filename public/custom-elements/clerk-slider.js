// Attributes with significance which are expected to be static.
const RESERVED_ATTRIBUTES = [
    'template',
    'keywords'
];

const keywordsRegex = /([[\]"',])/g;

const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (
            mutation.attributeName !== "data-products"
        ) {
            return
        }
        mutation.target.removeAttribute('data-clerk-content-id');
        mutation.target.innerHTML = '';
        window.Clerk('content', `.${window.clerk_init_class}`);
    }
}

const observer = new MutationObserver(mutationCallback);

class clerkSlider extends HTMLElement {
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
                if (newValue.includes('@')) {
                    this.dataset.template = newValue;
                    this.id = newValue.replace('@', '');
                }
            }
            if (name === 'keywords') {
                // If input given as JSON list remove quotes and brackets
                this.dataset.keywords = (newValue.match(keywordsRegex)) ? newValue.replace(keywordsRegex, '') : newValue;
            }
        }
    }

    disconnectedCallback() {
        observer.disconnect();
    }

    connectedCallback() {
        this.className = window.clerk_init_class;
        window.Clerk('content', `.${window.clerk_init_class}`);
        observer.observe(this, { attributes: true, childList: false, characterData: false });
    }

}

customElements.define('clerk-slider', clerkSlider);