import service from '../services/service.js'
import { eventBus } from '../services/event-bus.service.js'
import bookReview from './book-review.cmp.js'

export default {
    props:['book'],
    template: `
    <section class="add-review">
    <form @submit.prevent="addReview">
        <input type="text" v-model="review.name" ref="inputReview">
        <input type="date" v-model="review.date">
        <select v-model="review.rate">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        <button>Add</button>
        <textarea cols="51" rows="7" v-model="review.reviewTxt"></textarea>
    </form>
    <book-review v-for="currReview in book.reviews" :key="currReview.id" :review="currReview" @remove="deleteReview"></book-review>
</section>
    `,
    data() {
        return {
            review: {
                name: '',
                date: '',
                reviewTxt: '',
                rate:'5',
            }
        }
    },
    methods: {
        addReview(review) {
            service.addReview(this.book.id, review)
                .then(bookNew => {

                    this.book = bookNew
                    eventBus.$emit('show-msg', 'sucssus');
                })
        },
        deleteReview(reviewId) {
            service.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book
                    eventBus.$emit('show-msg', 'sucssus');
                })
        },
    },
    created() {
        var local = new Date();
        this.review.date = local.toJSON().slice(0, 10);
    },
    mounted() {
        this.$refs.inputReview.focus()
    },
    computed: {

    },
    components: {
        bookReview
    }
}