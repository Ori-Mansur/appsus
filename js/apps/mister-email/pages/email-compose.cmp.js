'use strict'

export default {
    template:`
    <section class="email-compose-container">
        <h2>New Message</h2>
        <form>
            <input type="text" placeholder="To:">
            <input type="text" placeholder="Subject:">
            <textarea cols="30" rows="10"></textarea>
            <button>Send</button>
        </form>
    </section>
    `
}