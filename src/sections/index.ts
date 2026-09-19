export { default as EcommerceView } from './e-commerce/view/e-commerce-view';
export { default as AnalyticsView } from './analytics/view/analytics-view';

export * from './product/view';
export * from './user/view';


// Layouts
import ProductRoutesLayout from './product/product-routes-layout';
import UserRoutesLayout from './user/user-routes-layout';

export { 
    ProductRoutesLayout, 
    UserRoutesLayout
};