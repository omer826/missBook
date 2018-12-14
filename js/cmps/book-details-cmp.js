
import longText from './long-text-cmp.js'
import bookService from '../services/book-service.js'




export default {
    template: `
    <section v-if="book" class="book-details flex space-around">
        <div class="flex book-details-container">
            <div class="book-details-img">
            <img class="book-img" v-bind:src="book.thumbnail">
            </div>

            <div class="book-details-header flex-col align-center">
            <h1>{{book.title}}</h1>
            <h3>{{book.subtitle}}</h3>

            <p><span>authors:</span>{{book.authors.toString()}}</p>
            <h3>published Date</h3>
            <h5>{{this.book.publishedDate}} - <span>{{publishedDateTxt}}</span></h5>

            <div  class="book-details-main flex-col align-center">
            <p class="book-desc"><span>description:</span>{{cutDesc}}</p>
            <long-text v-if ="showDesc" v-bind:txt="this.book.description" v-bind:len=100></long-text>

            <button class="more-btn" v-if="book.description.length > 100" v-on:click="openTxt">{{txtMore}}</button>
            <p><span>page Count:</span>{{book.pageCount}} {{currTxt}}</p>
            <p><span>categories:</span>{{book.categories.toString()}}</p>
            <p><span class="fa fa-globe"></span>:{{book.language}}</p>
            <div class="amount flex">
            <p  v-bind:class="amountColor"><span>amount:</span>{{book.listPrice.amount}} {{IconCuurency}}</p>
            <p > <span v-if="!book.listPrice.isOnSale">not in sale</span>  <img class="sale-icon" v-else src="img/sale.png"></p>
        </div>
    </div>
    <button  @click="reviewBook">
    <i class="fas fa-pen"></i>
    add review
    </button>

    </div>
</div>
    </section>
    `,
    data() {
        return {
            // book: bookService.getById(this.$route.params.id),
            book: null,
            showDesc: null,
            txtMore: 'more'
        }
    },
    created() {
        bookService.getById(this.$route.params.id)
            .then(book => {
                this.book = book
            })
        this.showDesc = false,
            this.txtMore = 'more'
    },

    methods: {

        openTxt() {
            this.showDesc = !this.showDesc
            this.txtMore = this.txtMore === 'more' ? 'less' : 'more'
        },
        reviewBook() {
            var bookId = this.book.id
            var urlTo = `/bookReview/${bookId}`
            this.$router.push(urlTo)
        }
    },

    computed: {
        IconCuurency() {
            var symbol = {
                USD: '$', // US Dollar
                EUR: '€', // Euro
                CRC: '₡', // Costa Rican Colón
                GBP: '£', // British Pound Sterling
                ILS: '₪', // Israeli New Sheqel
                INR: '₹', // Indian Rupee
                JPY: '¥', // Japanese Yen
                KRW: '₩', // South Korean Won
                NGN: '₦', // Nigerian Naira
                PHP: '₱', // Philippine Peso
                PLN: 'zł', // Polish Zloty
                PYG: '₲', // Paraguayan Guarani
                THB: '฿', // Thai Baht
                UAH: '₴', // Ukrainian Hryvnia
                VND: '₫', // Vietnamese Dong

            }
            return symbol[this.book.listPrice.currencyCode]

        },
        currTxt() {
            var spanTxt = ''
            var currLen = this.book.pageCount
            if (currLen < 100) {
                spanTxt = '(Light Reading)'
            }
            else if (currLen > 200 && currLen < 500) {
                spanTxt = '(Decent Reading)'
            } else if (currLen > 500) {
                spanTxt = '(Long reading)'
            }

            return spanTxt;

        },
        publishedDateTxt() {
            var currYear = (new Date()).getFullYear();
            var bookYear = currYear - (this.book.publishedDate)
            if (bookYear > 10) {
                return 'Veteran Book'
            } else if (bookYear < 1) {
                return 'New'
            } else {
                return ''
            }
        },
        amountColor() {
            var currPrice = this.book.listPrice.amount;
            if (currPrice < 20) {
                return 'green'
            } else if (currPrice > 150) {
                return 'red'
            } else {
                return ''
            }
        },
        cutDesc() {
            var bookDesc = this.book.description
            if (bookDesc.length > 100) {
                bookDesc = bookDesc.substring(0, 100);
            }
            return bookDesc
        }
    },
    components: {
        longText,
    }

}



