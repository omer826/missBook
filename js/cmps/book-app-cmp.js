import bookService from '../services/book-service.js'
import bookList from'./book-list-cmp.js'
import bookFilter from'./book-filter-cmp.js'
import bookAdd from'./book-add-cmp.js'

// import { eventBus, EVENT_SHOW_MSG } from '../services/eventbus-service.js'

export default{

    template: `
    <section class="book-app">
    <header>
        <h1>Miss books</h1>
    </header>
    <button   v-if="SelectedBook" v-on:click="SelectedBook = null">
    <span  class="fas fa-arrow-circle-left"></span>
    </button>

    <book-filter v-if="!SelectedBook" v-on:filtered="setFilter"></book-filter>  
    <book-add></book-add>     
    <book-list  v-bind:books="bookstoshow" v-on:selectBook="onSelectBook">
    </book-list>
 
    </section>
    `,
    data() {
        return {
            SelectedBook: null,
            filter: null,
            books :[],
          
        }
    },
    created() {
        bookService.init();
		bookService.query()
			.then(books => {
                this.books = books
            })

	},

    methods: {
        onSelectBook(book) {
            this.SelectedBook = book
        },
        setFilter(searchObj) {
            
            if (searchObj) {
                bookService.searchBook(searchObj)
                .then(books =>{
                    this.filter = books
                })
            } else {
                this.filter = null
            }

        }
    },
    computed: {
        bookstoshow() {
            
            var books = JSON.parse(JSON.stringify(this.books));

            if (this.filter) {
                books = this.filter
            } else {
               
                books = this.books
            }
            return books
        }
    },
    components: {
        bookList,
        bookFilter,
        bookAdd
        
    }
}

