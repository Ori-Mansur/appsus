'use strict'





export default {
    props:['txt','show','valid','read','starred'],
    template:`
    <section class="long-text-container">
        <p>{{showTxt}}</p>
        <div class="long-text-btn-container">
            <button v-if="!show && !valid" @click.stop="editDraft">✎</button>
            <button v-if="!show && valid" @click.stop="makeStarred" class="starred" v-bind:style="{ color: getStarredColor }">{{isEmailStarred}}</button>
            <button v-if="!show && valid" @click.stop="readToggle" v-bind:style="{ color: getUnreadColor }">{{isEmailRead}}</button>
        </div>
    </section>
     `
    ,
    computed: {
        showTxt(){
            if(this.show) return this.txt.substring(0,80)+'...'
            else if(this.txt.length>100) return this.txt.substring(0,40)+'...'
            else return this.txt
        },
        isEmailRead(){
            if(this.read) return '☖'
            return '☗'
        },
        isEmailStarred(){
            if(this.starred) return '☑'
            return '☐'
        },
        getStarredColor(){
            if(this.starred) return '#080346fc'; 
        },
        getUnreadColor(){
            if(!this.read) return '#020238e0';
        }
        
    },
    methods:{
        makeStarred(){            
            this.$emit('starred')     
        },
        readToggle(){
            this.$emit('toggle-read')
        },
        editDraft(){
            this.$emit('edit-draft')  
        }
    }
}