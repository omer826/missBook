export default {
    props:['value'],
    template: `
    <section>
        <div>
            <p>
               {{convertStar}} 
            </p>
        </div>

    </section>
    `,

computed: {
    convertStar() {
        return '★'.repeat(this.value)
    }
},
}