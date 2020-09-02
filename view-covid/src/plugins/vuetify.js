import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);

const theme = {
    primary: '#49beac',
    secondary: '#e74d4b',
    accent: '#53a857',
    info: '#fca439',
    bg: '#fafffe',
    button_toggle: '#edfcf9'
  }

export default new Vuetify({
    theme: {
        themes: {
          dark: theme,
          light: theme,
        },
      },
    icons: {
        iconfont: 'fa' 
    },
});
