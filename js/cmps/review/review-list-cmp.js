import bookService from '../../services/book-service.js'
import convertChar from '../convert-char-cmp.js'


export default {
    props: ['bookSelectedId','feedbacks'],
    template: ` 
    <section class="review-list">  
    <div>
    <h1 v-if="feedbacks">Book reviews</h1>
    <ul class="clean-list"  
    v-for = "(feedback,idx) in feedbacks">
        <li class="reviews-item" >
            <button class="back-btn fa fa-times" @click="deleteFeedback(idx)"></button>
            <h5>writer: {{feedback.userName}}</h5>
            <p>date of read:{{feedback.dateRead}}</p>
            <p> star</p>
            <convert-char :value="feedback.selectedStar">
            </convert-char>
            <p>comments: {{feedback.txt}}</p>
        </li>

    </ul>
</div>
    </section>
    `
    ,
    data() {
        return {
            bookId: this.bookSelectedId,
            
        }

    },
    methods: {
        deleteFeedback(idx) {
            this.$emit('deleteFeedback', idx);
            // bookService.deleteFeedback(this.bookId, idx)
            // .then(feedback =>{
            //     this.reviewsList = feedback
            // })
        }
    },
  
    
    components:{
        convertChar
    }
}



