// ELEMENT SELECTORS FOR CART SLIDERS
const element_selectors = ["#clerkSlider1"];

/* CLERK.IO PRODUCT PAGE CODE START */
import wixLocation from 'wix-location';
import { clerkHydrateCartSlider } from 'public/clerk-wix.js';

wixLocation.onChange(async () => {
	// Use to detect route changes
	await clerkHydrateCartSlider(element_selectors);
});

$w.onReady(async () => {
	// Use to detect route changes
	await clerkHydrateCartSlider(element_selectors);
});
/* CLERK.IO PRODUCT PAGE CODE END */
