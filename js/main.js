import myRoutes from './routes.js'

import userMsg from'./cmps/user-msg-cmp.js'
import { eventBus, EVENT_SHOW_MSG } from './services/eventbus-service.js'






console.log('routes', myRoutes);
Vue.use(VueRouter);

const myRouter = new VueRouter({ routes: myRoutes })

new Vue({
    router: myRouter,
    el: '#app',
 
  
    components:{
        userMsg
    }

});
