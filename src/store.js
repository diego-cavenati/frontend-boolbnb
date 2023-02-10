import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';

export const store = reactive({
    // Call API
    // error: null,
    // apartments: [],
    // loading: true,
    // base_api_url: 'http://127.0.0.1:8000/api/apartments',
    // max: 100,

    immagineAttiva: 0,
    images: [
        {
            img: [
                'https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg',
                //'https://storage.superpixel.com/cover/2f4c5302af3bb6ea2b8201ee6d8ca8dd.png@200x200',
                // 
                // 'https://upload.wikimedia.org/wikipedia/commons/9/96/Logo-warga-200x200.png',
            ]
        },
        // {
        //     img : [
        //         'https://upload.wikimedia.org/wikipedia/commons/6/60/W-200x200-300dpi.png',
        //         'https://masterx.iulm.it/wp-content/uploads/2019/01/braccio-di-ferro-200x200.jpg',

        //     ]
        // },
        // {
        //     img : [
        //         'https://upload.wikimedia.org/wikipedia/commons/6/60/W-200x200-300dpi.png',
        //     ]
        // },
        // {
        //     img : [
        //         'https://masterx.iulm.it/wp-content/uploads/2019/01/braccio-di-ferro-200x200.jpg',
        //     ]
        // },
    ],
    services: [
        {
            img: 'fa-solid fa-hippo',
            text: 'Cucina'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Wi-fi'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Piscina'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'TV'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'vasca da bagno'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Allarme antincendio'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Parchegigo gratuito della proprietà'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Vasca idromassaggio privata'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Lavatrice'
        },
        {
            img: 'fa-solid fa-hippo',
            text: 'Rivelatore di monossido di carbonio'
        },
    ],

    // Call API apartments all
    // getApartments(url) {
    //     axios
    //         .get(url)
    //         .then(response => {
    //             this.apartments = response.results.data;
    //             // this.apartments = response.data.
    //             console.log('FUNZIONO');
    //             this.loading = false;
    //         })
    //         .catch(error => {
    //             console.error(error)
    //             this.error = error.message;
    //             this.loading = false;
    //         })
    // },
    // getImagePath(path) {
    //     if (path) {
    //         return this.base_api_url + '/storage/' + path;
    //     }
    // },
    /**
     * 
     * @param {string} text the project body
     */
    trimBody(text) {
        if (text.length > this.max) {
            return text.slice(0, this.max) + '...'
        }
        return text
    },
    prevPage(url) {
        console.log(url)
        this.getApartments(url)
    },
    nextPage(url) {
        console.log(url)
        this.getApartments(url)
    }


})