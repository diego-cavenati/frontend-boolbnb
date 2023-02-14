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
    loading: true,
    datePicker: '',
    guests: 1,
    lat: '',
    lon: '',

    test_categorys: [
        {
            category_id: 1,
            name: 'Minicasa',
            img: 'Minicasa-1'
        },
        {
            category_id: 2,
            name: 'Luxury',
            img: 'Luxury-2'
        },
        {
            category_id: 3,
            name: 'Fronte lago',
            img: 'Fronte-lago-3'
        },
        {
            category_id: 4,
            name: 'Fronte mare',
            img: 'Fronte-mare-4'
        },
        {
            category_id: 5,
            name: 'Sulle piste',
            img: 'Sulle-piste-5'
        },
        {
            category_id: 6,
            name: 'Design',
            img: 'Design-6'
        },
        {
            category_id: 7,
            name: 'Dimore storiche',
            img: 'Dimore-storiche-7'
        },
        {
            category_id: 8,
            name: 'Case galleggianti',
            img: 'Case-galleggianti-8'
        },
        {
            category_id: 9,
            name: "Case sull'albero",
            img: "Case-sull'albero-9"
        },
        {
            category_id: 10,
            name: "Nel deserto",
            img: "Nel-deserto-10"
        },
    ],
    services: [],


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