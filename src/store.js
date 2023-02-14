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
    price: '',
    guests: '',
    results: [],
    datePicker: '',
    guests: 1,

    parseDates(dates) {
        let firstDate = new Date(dates[0]);
        let secondDate = new Date(dates[1]);

        firstDate = firstDate.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit'
        });
        secondDate = secondDate.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit'
        });

        this.$store.dispatch('updateDates', { firstDate, secondDate });
    }

})