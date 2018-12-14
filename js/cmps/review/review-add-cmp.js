import bookService from '../../services/book-service.js'
import reviewsList from './review-list-cmp.js'
import { eventBus, EVENT_SHOW_MSG } from '../../services/eventbus-service.js'




export default {


    template: `
    <section v-if="book" class="review-book">
 
    <button  class="back-btn fas fa-arrow-circle-left" @click="back"></button>
        <div class="flex space-around">

        <form class="flex-col align-center">
            <h1 class="form-header">Book review</h1>
                <h3>user name:</h3>
                <input  name="userName" type="text" v-model="userName" />
                <h3>Book name:</h3>
                <input  name="bookName" type="text" v-model="bookName" />
            
                <h3>Star:</h3>
                <select v-model="selectedStar" >
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>
                <h3>Read at: </h3>
            <input v-model="dateRead"  type="date"  />
            <h3>comments:</h3>
                    <textarea  v-model="txt" placeholder="enter a comment">

                    </textarea>
                
                <button @click.prevent="onSave" :disabled="!isValid">
                    save
                </button>
        </form>
        <reviews-list :feedbacks="listOfFeedbacks" v-if="listOfFeedbacks"
        @deleteFeedback="onDeleteReview"
         v-bind:bookSelectedId="this.book.id">
            </reviews-list> 

        </div>
    </section>
    `,

    data() {
        return {
            book: null,
            userName: 'Books Reader',
            bookName: null,
            selectedStar: 4,
            dateRead: null,
            txt: '',
            listOfFeedbacks: null,
            feedbackReview:null
        }
    },
    created() {
        bookService.getById(this.$route.params.id)
        .then(book => {
            if(book){
                this.book = book
                this.bookName = this.book.title
            }
            
              bookService.getFeedbacks(this.book.id)
              .then(feedbacksList => {
                this.listOfFeedbacks = feedbacksList
              })
    
        })
      
    },
    methods: {
        onSave() {
            
             this.feedbackReview = {
                bookId: this.book.id,
                bookName: this.bookName,
                userName: this.userName,
                dateRead: this.dateRead,
                selectedStar: this.selectedStar,
                comments: this.txt
            }
       
                bookService.addFeedback(this.book.id, this.feedbackReview)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG,'review Saved','success')
                    bookService.getFeedbacks(this.book.id)
                    .then(reviews =>{
                        this.listOfFeedbacks = reviews
                    })
                })
            
        },
        onDeleteReview(idx) {
            bookService.deleteFeedback(this.book.id, idx)
            .then(feedbacks =>{
                this.listOfFeedbacks = feedbacks
            })
        },
        back(){
            var bookId= this.book.id
            var urlTo = `/book/${bookId}`
            this.$router.push(urlTo)
        }

    },
    computed: {
        isValid() {
            return this.selectedStar && this.dateRead && this.userName
        },

    },
    components: {
        reviewsList

    }
}


{/* */ }