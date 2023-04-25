/* ACTIVE Imports */
import { cart } from 'wix-stores';

export const clerkGetCart = async () => {
    const currentCart = await cart.getCurrentCart();
    const cartInfo = { cartId: currentCart._id, cartLineItems: currentCart.lineItems }
    return cartInfo;
}

export const clerkGetCartProducts = async () => {
	const cart = await clerkGetCart();
    const product_ids = cart.cartLineItems.map(line_item => {
        return line_item?.productId
    });
	return product_ids;
}

export const clerkHydrateBasketTracking = async (selector_list=['']) => {
	const product_ids = await clerkGetCartProducts();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', product_ids);
		}
	});
}

export const clerkHydrateCartSlider = async (selector_list=['']) => {
    const product_ids = await clerkGetCartProducts();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', `${JSON.stringify(product_ids)}`);
		}
	});
}

export const clerkHydrateProductSlider = async (selector_list=['']) => {
    const product_id = await clerkGetProduct();
	selector_list.forEach(el => {
		if($w(el).length !== 0){
			$w(el).setAttribute('data-products', `["${product_id}"]`);
		}
	});
}

export const clerkHydrateSalesTracking = async (selector_list=['']) => {
    const order_details = await clerkGetOrder();
	const order_products = order_details.lineItems.map(line_item => {
		return {id: line_item.productId, quantity: line_item.quantity, price: line_item.tax + line_item.priceData.price}
	});
	selector_list.forEach(el => {
        if($w(el).length !== 0){
            $w(el).setAttribute('data-sale', order_details._id);
            $w(el).setAttribute('data-email', order_details.buyerInfo.email);
            $w(el).setAttribute('data-products', order_products);
        }
	});
}

export const clerkHydrateSearchPage = (selector_list=[''], wixLocation) => {
    const query = clerkGetQuery(wixLocation);
    selector_list.forEach(el => {
        if($w(el).length !== 0){
            $w(el).setAttribute('data-query', query);
        }
	});
}

export const clerkGetProduct = async () => {
	const product = await $w('#productPage1').getProduct();
	return product?._id;
}

export const clerkGetOrder = async () => {
	const order = await $w('#thankYouPage1').getOrder();
	return order;
}

export const clerkGetQuery = (wixLocation) => {
	return wixLocation.query['q'];
}
