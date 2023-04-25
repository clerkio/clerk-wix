// ELEMENT SELECTORS FOR THANKYOU PAGE SALES TRACKING
const element_selectors = ["#customElement4"];

import { clerkHydrateSalesTracking } from 'public/clerk-wix.js'

/* CLERK.IO SALES TRACKING CODE START */
$w.onReady(async () => {
	// Use to detect route changes
	await clerkHydrateSalesTracking(element_selectors);
});
/* CLERK.IO SALES TRACKING CODE END */