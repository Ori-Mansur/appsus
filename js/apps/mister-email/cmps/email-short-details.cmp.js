'use strict'

import emailService from '../services/email-service.js'
import longText from '../cmps/long-text.cmg.js'
import {eventBus} from '../../../general-service/event-bus-service.js'


export default {
    props:['email','filter','type'],
    template:`
    <section class="emails-short-details-container">
        <p class="short-subject">{{email.subject}}</p>
        <section class="short-details-btn-p">
        <long-text :txt="email.body" :show="email.isShowingMore" :link="email.isLink"></long-text>
        <div class="btn-short-details">
            <!-- <router-link v-if="email.type!== 'draft'" :to="'email/'+email.id"><button v-if="checkEmailType" class="email-read-details">❐</button></router-link> -->
            <!-- <button v-if="checkEmailType" class="email-read-details"><router-link v-if="email.type!== 'draft'" :to="'email/'+email.id" class="ignore-link">❐</router-link></button> -->
            <button v-if="checkEmailType" class="email-read-details">
                <router-link v-if="email.type === 'inbox'" :to="'email/'+email.id" class="ignore-link">❐</router-link>
                <router-link v-else-if="email.type === 'starred' && type === 'inbox' " :to="'email/'+email.id" class="ignore-link">❐</router-link>
                <router-link v-else="email.type === 'starred'" :to="email.id" class="ignore-link">❐</router-link>

            </button>

            <button v-if="email.type!== 'draft'" @click="emailToKeep(email)" class="email-note-details">📝</button>
            <button @click="deleteEmail(email.id)" class="email-delete-details">🗑</button>
        </div>
        </section>
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
        },
        emailToKeep(email){
            emailService.saveEmailToStorage(email)
            var msg = {
               txt: 'Email kept in notes!',
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