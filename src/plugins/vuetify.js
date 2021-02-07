import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    theme: {
        themes: {
            light: {
                '--background-1': '#fff',
                '--background-2': '#f5f5f5',
                '--background-3': 'red',
                '--surface-1': '#fff',
                '--surface-2': '#f1f1f1',
                '--surface-3': '#f1f1f1',
                '--primary-1': '#ffc107',
                '--primary-2': '#fbcf4b',
                '--primary-3': '#ffc107',
                '--text-1': '#000',
                '--text-2': '#666',
                '--text-3': '#fff',
                '--accent-1': '#2196F3',
                '--accent-2': '#2196F3',
                '--accent-3': '#2196F3',
                '--success-1': '#4CAF50',
                '--success-2': '#4CAF50',
                '--success-3': '#4CAF50',
                '--error-1': '#F44336',
                '--error-2': '#F44336',
                '--error-3': '#F44336',
            },
        }
    }
});
