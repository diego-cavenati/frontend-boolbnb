import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    //carousl elements
    immagineAttiva: 0,
    //toggle class per i servizi
    isActive: false,
    // radius range ricerca
    radius: 20,
    // posti letto per la ricerca
    beds: '',

    pages: null,
    // tomtom key
    tomtom_key: 'FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn',
    //searchbar
    address: '',
    check_in: '',
    check_out: '',
    price: '',
    //le call api inseriscono i risultati dentro results
    results: [],
    loading: false,
    datePicker: '',
    guests: 1,
    lat: '',
    lon: '',
    url_back: 'http://127.0.0.1:8000',
    //booleano per verificare che il componente della ricerca sia stato montato correttamente
    isAdvancedSearchViewLoaded: null,
    isSearchbarComponentLoaded: null,

    // categorie che riceviamo dal back e stampiamo
    categories: [],
    // categorie da inviare al back, ne inviamo solo 1 e facciamo la call per un risultato 
    activeCategoryIndex: null,
    categories_back: [],
    //servizi che riceviamo dal back e stampiamo
    services: [],
    servicesIndex: [],
    // raccolta di ID di servizi da inviare al back
    services_back: [],

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
    },
    mutations: {
        updateAddress(state, address) {
            state.address = address;
        }
    }
})