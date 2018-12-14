


// Vue.component('long-text',
 export default {
    props: ['txt','len'],
    template: `
    <section class="long-text">
    <p>{{showdTxT}}</p>
    </section>`
    ,
    data() {
        return {
            size:this.len
        }
        
    },
    computed:  {
        showdTxT(){
            if (this.txt.length > this.size) {
             var moreTxt = this.txt.slice(this.size, -1);
             return moreTxt
            }
        }
    }
}