import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    //carousl elements
    immagineAttiva: 0,

    //searchbar
    address: '',
    check_in: '',
    check_out: '',
    guests: '',
    results: [],

})