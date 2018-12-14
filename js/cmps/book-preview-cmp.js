


export default {
    props: ['book'],

    template: `
        <section class="book-preview">
        <div>
            <h3>{{book.title}}</h3>
            <img v-bind:src="book.thumbnail">
            <p>amount: {{book.listPrice.amount}} {{IconCuurency}}</p>
        </div>
        </section>
    `,
    data() {
        return {
            currCuurency: this.book.listPrice.currencyCode
        }
    },

    computed: {
        IconCuurency: function () {
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
            return symbol[this.currCuurency]

        }
    }

}

