import { eventBus, EVENT_SHOW_MSG } from '../services/eventbus-service.js'

export default {
    
    template:`
    <section v-if="showMsg" class="user-msg flex justify-center align-center">
        <div :class="msgType" >
            <div class="flex">
            <i :class="iconClass"></i>
            <div>
            <h2>success</h2>
                    <p>{{msgStr}}</p>
            </div>
                    
            </div>
           <button :style="{color:btnColor}"  @click="closeMsg" class="fas fa-times-circle"></button>
        </div>
        
    </section>
    `,
     data() {
        return {
            showMsg: false,
            msgStr: '',
            msgType:'',
            
            
        }
    },
    created() {
        eventBus.$on(EVENT_SHOW_MSG,(msg,type) => {
            this.showMsg = true
            this.msgStr = msg;
            this.msgType = type
        })
    },
    methods:{
        closeMsg() {
            this.showMsg =!this.showMsg
        }
    },
   
    computed :{
        iconClass(){
            var iconClass = this.msgType === 'success' ?'fas fa-check':'fas fa-times';
            return iconClass;
        },
        btnColor(){
            return this.msgType === 'success' ?'green':'red';
             
        }
    }

    
}