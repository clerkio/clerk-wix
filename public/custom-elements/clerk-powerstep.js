// Attributes with significance which are expected to be static.
const RESERVED_ATTRIBUTES = [
	'template',
	'keywords'
];

const DEFAULT_STYLE = `<style>
		.clerk-popup-close {
			position: absolute;
			right: 8px;
			top: 3px;
			cursor: pointer;
			font-family: Arial;
			font-size: 32px;
			line-height: 1;
			color: gray;
		}
		.clerk-popup {
			position: fixed;
			top: 10%;
			z-index: 16777271;
			display: none;
			width: 90%;
			padding: 20px;
			margin: 0 5%;
			background-color: white;
			border: 1px solid #eee;
			border-radius: 5px;
			box-shadow: 0px 8px 40px 0px rgba(0,0,60,0.15);
		}
		.clerk_powerstep_headline {
			margin: 14px 0px 14px 0px;
			font-weight: 100;
		}
		.clerk_powerstep_product_name {
			font-weight: bold;
		}
		.clerk_powerstep_header, .clerk_powerstep_image {
			text-align: center;
		}

		.clerk_powerstep_image {
			margin: 0px 0px 24px 0px;
		}
		.clerk_powerstep_image img{
			display: inline;
			max-width: 25%;
		}
		.clerk_powerstep_clear {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			overflow: hidden;

		}

		:root{
			--clerk-popup-width:60ch
		}
		@media screen and (max-width:600px){
			:root{
				--clerk-popup-width:84vw
			}
			.clerk_powerstep_headline {
				margin: 1em 0 1em 0;
			}
			.clerk_powerstep_clear {
				font-size: 0.8em;
			}
		}
		@-webkit-keyframes popin{
			from{
				top:translate(-50%,-150%);
				opacity:0
			}
			to{
				transform:translate(-50%,-50%);
				opacity:1
			}
		}
		@keyframes popin{
			from{
				transform:translate(-50%,-150%);
				opacity:0
			}
			to{
				transform:translate(-50%,-50%);
				opacity:1
			}
		}
		.clerk-vert-spacer{
			margin-bottom:10px
		}
		.popin{
			animation:popin .5s ease-in-out
		}
		.clerk_hidden{
			display:none !important
		}
		.clerk-popup{
			width:clamp(var(--clerk-popup-width),60%,100ch) !important;
			top:50% !important;
			left:50% !important;
			transform:translate(-50%,-50%);
			margin:0 !important;
			border:none !important;
			border-radius:5px !important;
			max-height:calc(85vh);
			overflow-y:scroll;
			overflow-y:overlay;
			-ms-overflow-style:none;
			scrollbar-width:none;
			animation:popin .5s ease-in-out
		}
		.clerk-popup-close{
			right:15px !important;
			top:10px !important
		}
		#clerk-power-popup .price-box{
			display:flex;
			flex-direction:column
		}
		#clerk-power-popup .success-msg{
			margin-bottom:10px;
			margin-top:10px
		}
		#clerk-power-popup > * > *:first-child{
			font-size:clamp(1rem,.5714rem + 1.9048vw,2rem)
		}
		.clerk-popup::-webkit-scrollbar{
			display:none
		}
	</style>`;

const DEFAULT_INNER_HTML = `<div id="clerk_powerstep" class="clerk-popup">
	<span class="clerk-popup-close">×</span>
	<div class="clerk_powerstep_header">
		<h2 class="clerk_powerstep_headline">
			<span class="clerk_powerstep_product_name"></span>
		</h2>
	</div>
	<div class="clerk_powerstep_image">
        <img src />
	</div>
	<div class="clerk_powerstep_clear actions">
		<button class="button clerk-powerstep-close">Back</button>
		<button class="button alt powerstep-cart" onclick="location.href = '/cart';"
				type="button" title="Go to cart">
			<span>Go to cart</span>
		</button>
	</div>
	<div id="clerk_powerstep_template">
	
	</div>
    ${DEFAULT_STYLE}
</div>`;

const keywordsRegex = /([[\]"',])/g;

const mutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.attributeName !== "data-products"
    ) {
      return
    }
	mutation.target.removeAttribute('data-clerk-content-id');
	mutation.target.querSelector('#clerk_powerstep_template').innerHTML = '';
	window.Clerk('content', `.clerk_powerstep`);
  }
}

const observer = new MutationObserver(mutationCallback);

class clerkPowerstep extends HTMLElement {
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
				if(newValue.includes('@')){
					this.dataset.template = newValue;
					this.id = newValue.replace('@', '');
				}
			}
			if(name === 'keywords'){
				// If input given as JSON list remove quotes and brackets
				this.dataset.keywords = (newValue.match(keywordsRegex)) ? newValue.replace(keywordsRegex, '') : newValue;
			}
		}
	}

	disconnectedCallback() {
		observer.disconnect();
	}

	connectedCallback() {
		this.className = 'clerk_powerstep';
        this.dataset.target = '#clerk_powerstep_template';
        this.innerHTML = DEFAULT_INNER_HTML;
		observer.observe(this, {attributes: true, childList: false, characterData: false});
	}

}

customElements.define('clerk-powerstep', clerkPowerstep);