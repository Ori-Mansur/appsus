'use strict'

export default {
    template:`
    <section class="email-compose-container">
        <h2>New Message</h2>
        <form @submit.prevent="sendEmail">
            <input type="text" placeholder="To:">
            <input type="text" placeholder="Subject:">
            <textarea cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
    </section>
    `,
    data(){
        return {
            email:{
                subject: '',
                body: '',
                isRead: false,
                sentAt : null
            }
        }
    },
    methods:{
        checkEmailData(){
            if(!this.email.subject) console.log('Missing subject');
            if(!this.email.body) console.log('Missing body');
            
        }
    }

}