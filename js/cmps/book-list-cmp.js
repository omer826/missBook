
import bookPreview from './book-preview-cmp.js'


export default {
    props: ['books'],
    template: `
    <section class="book-list">
    
    <ul class="flex">
    <li v-for="(book,idx) in books" class="flex-col"  v-on:click="selected(book)" >
    <book-preview v-bind:book="book" >
    </book-preview>
    </li>
    </ul>
    </section>
    `,
 
    methods: {
        selected(book) {
            var bookId= book.id
            var urlTo = `/book/${bookId}`
            this.$router.push(urlTo)
        },
    },
    components: {
        bookPreview
    }

}

