import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseDialog from "./components/BaseDialog.vue";
import BaseSpinner from "./components/BaseSpinner.vue";
import AppNavigationBar from "./components/AppNavigationBar.vue";
import AppNavigationDrawer from "./components/AppNavigationDrawer.vue";

const app = createApp(App)
app.component('base-dialog',BaseDialog)
app.component('base-spinner',BaseSpinner)
app.component('app-navigaion-bar',AppNavigationBar);
app.component('app-navigaion-drawer',AppNavigationDrawer);
app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
