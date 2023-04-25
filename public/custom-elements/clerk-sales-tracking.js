class clerkSalesTracking extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.className = window.clerk_init_class;
        this.dataset.api = 'log/sale';
        window.Clerk('content', `.${window.clerk_init_class}`);
    }

}

customElements.define('clerk-sales-tracking', clerkSalesTracking);