// ELEMENT SELECTORS FOR SEARCH PAGE ELEMENTS
const element_selectors = ["#customElement3"];

/* CLERK.IO SEARCH PAGE CODE START */
import wixLocation from 'wix-location';
import { clerkHydrateSearchPage } from 'public/clerk-wix.js'

wixLocation.onChange( async () => {
	// Use to detect route changes
	clerkHydrateSearchPage(element_selectors, wixLocation);
});

$w.onReady( async () => {
	// Use to detect route changes
	clerkHydrateSearchPage(element_selectors, wixLocation);
});
/* CLERK.IO SEARCH PAGE CODE END */