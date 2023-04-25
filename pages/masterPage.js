// ELEMENT SELECTORS FOR BASKET TRACKING
const basket_element_selector = ["#clerkBaskTracking"];
const powerstep_element_selector = ["#clerkPowerstep"];


/* CLERK.IO BASKET TRACKING START */
import wixLocation from 'wix-location';
import { clerkHydrateBasketTracking, clerkInitPowerStep } from 'public/clerk-wix.js';

$w.onReady(async () => {
	await clerkUpdate();
});

wixLocation.onChange(async () => {
	await clerkUpdate();
});

// NEST ALL FUNCTIONS INSIDE OF THIS FUNC, TO ENSURE EXECUTION ON EACH "pageload"
const clerkUpdate = async () => {
	await clerkHydrateBasketTracking(basket_element_selector);
	await clerkInitPowerStep(powerstep_element_selector);
}
/* CLERK.IO BASKET TRACKING END */