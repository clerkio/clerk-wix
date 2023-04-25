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

class clerkBasketTracking extends HTMLElement {
    constructor() {
        super();
    }

    disconnectedCallback() {
        observer.disconnect();
    }

    connectedCallback() {
        this.className = window.clerk_init_class;
        this.dataset.api = 'log/basket/set';
        window.Clerk('content', `.${window.clerk_init_class}`);
        observer.observe(this, { attributes: true, childList: false, characterData: false });
    }
}

customElements.define('clerk-basket-tracking', clerkBasketTracking);
