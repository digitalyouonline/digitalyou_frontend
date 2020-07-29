import Vue from "vue";
import Vuetify from "vuetify/lib";
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
        theme: {
            themes: {
              light: {
                primary: '#2d4052',
                secondary: '#57be8e'
              }
            }
          }
    }
});
