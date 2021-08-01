import Breadcrumb from './UI/Breadcrumb.vue';
import BaseCard from './UI/BaseCard.vue';

export default app => {
    app.component('Breadcrumb', Breadcrumb);
    app.component('BaseCard', BaseCard);
}