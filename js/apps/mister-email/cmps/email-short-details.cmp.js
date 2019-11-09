'use strict'

import emailService from '../services/email-service.js'
import longText from '../cmps/long-text.cmg.js'
import {eventBus} from '../../../general-service/event-bus-service.js'


export default {
    props:['email','filter'],
    template:`
    <section class="emails-short-details-container">
        <div class="btn-short-details">
            <router-link v-if="email.type!== 'draft'" :to="'email/'+email.id"><button v-if="checkEmailType" class="email-read-details">⬜</button></router-link>
            <button v-if="email.type!== 'draft'" @click="emailToKeep(email)" class="email-note-details">📝</button>
            <button @click="deleteEmail(email.id)" class="email-delete-details">🗑</button>
        </div>
        <p class="short-subject">{{email.subject}}</p>
        <!-- <p>{{email.body}}</p> -->
        <long-text :txt="email.body" :show="email.isShowingMore"></long-text>
    </section>`
    ,
    methods:{
        deleteEmail(emailId){
            var prmUserDecision = Swal.fire({
                title: 'Delete this email?',
                icon: 'warning',
                showCancelButton: true,
              })
              
              prmUserDecision.then(res => {
                if (res.value) {
                  Swal.fire(
                    'Deleted!',
                    'Your Email has been deleted.',
                    'success'
                  )
                  emailService.deleteMail(emailId)
                .then(()=>{
                    this.$emit('deleted',true)
                    eventBus.$emit('update-percent');
                });
                }
              })
            // emailService.deleteMail(emailId)
            //     .then(emails=>{
            //         this.$emit('deleted',true)
            //         eventBus.$emit('update-percent');
            //     });
        },
        emailToKeep(email){
            emailService.saveEmailToStorage(email)
            var msg = {
               txt: 'Email was sent to notes',
               type: 'email-notes'
            }
            eventBus.$emit('show-msg',msg)
        },
    },
    computed:{
        checkEmailType(){
            if(this.email.type === 'inbox' || this.email.type === 'starred') return true;
            return false;
        }
    },
    created(){
        emailService.readEmail(this.email.id)
        
    },
    components:{
        longText,
    }

}