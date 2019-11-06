'use strict'

export default {
    props:['email'],
    template:`
    <section class="emails-short-details-container">
        

        <div><button>Delete</button><router-link :to="'email/'+email.id"><button>Read More</button></router-link></div>
        <h2>{{email.subject}}</h2>
        <h4>Name</h4><span>User Mail</span>
        <p>{{email.body}}</p>
    </section>
    `

}