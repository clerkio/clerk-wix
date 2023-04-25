// ELEMENT SELECTORS FOR PRODUCT PAGE SLIDERS
const element_selectors = ["#clerkSlider1"];

/* CLERK.IO PRODUCT PAGE CODE START */
import wixLocation from 'wix-location';
import { clerkHydrateProductSlider } from 'public/clerk-wix.js'

wixLocation.onChange( async (location) => {
	// Use to detect route changes
	await clerkHydrateProductSlider(element_selectors);
});

$w.onReady( async () => {
	// Use to detect route changes
	await clerkHydrateProductSlider(element_selectors);
});
/* CLERK.IO PRODUCT PAGE CODE END */
