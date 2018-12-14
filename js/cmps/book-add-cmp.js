import bookService from '../services/book-service.js'


export default {
    template: `
    <section class="book-add book-filter flex-col">
        <div class="flex justify-center">
        <input type="search"  v-model="serachInput" @input="onsearch"
        placeholder="Search a book in google" title="search in google" >
        </div>
        <ul v-if="listBook" class="google-res clean-list" >
            <li v-for="item in listBook" @click="addBook(item)">
                <div class="flex space-between align-center">
                <p>{{item.volumeInfo.title}}</p>
                <button class="fas fa-plus-circle" ></button>
                </div>
            </li>

        </ul>

    </section>
    `,
    data() {
        return {
            serachInput: '',
            listBook: null,
            newBook: bookService.emptyBook()
        }
    },

    created() {

    },
    methods: {
        onsearch() {
            console.log(this.serachInput)

            if (this.serachInput === '') this.listBook = null
            else {
                bookService.getBooksData(this.serachInput)
                    .then(res => {
                        console.log(res.data)
                        this.listBook = res.data.items;

                    }).catch(err => {
                        console.log(err)
                    })
            }
        },
        addBook(book) {
            var newBook = this.newBook
            try {
                newBook.id = book.id;
                newBook.title = book.volumeInfo.title;
                newBook.subtitle = book.volumeInfo.subtitle;
                newBook.authors = book.volumeInfo.authors;

                newBook.publishedDate = book.volumeInfo.publishedDate;
                newBook.description = book.volumeInfo.description;
                newBook.pageCount = book.volumeInfo.subtitle;
                newBook.categories = book.volumeInfo.categories;

                newBook.thumbnail = book.volumeInfo.imageLinks.thumbnail;
                newBook.language = book.volumeInfo.language;
                newBook.pageCount = book.volumeInfo.pageCount;
                if (book.saleInfo.saleability === 'FOR_SALE') {
                    newBook.listPrice.amount = book.saleInfo.listPrice.amount || 0;
                    newBook.listPrice.currencyCode = book.saleInfo.listPrice.currencyCode;
                    newBook.listPrice.isOnSale = book.saleInfo.isEbook;
                }


                bookService.addBook(newBook)
                    .then(() => {
                        this.newBook = bookService.emptyBook()
                        swal('The book added to your list');
                    })
                console.log('new book', this.newBook)
            } catch (eror) {
                console.log('eror in add', eror)
            }

        }
    }
}

