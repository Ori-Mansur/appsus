'use strict'





export default {
    props:['txt','show'],
    template:`
    <section class="long-text-container">
        <p>{{showTxt}}</p><button v-if="!show" @click.stop="makeStarred" class="starred">Starred</button>
    </section>
     `
    ,
    computed: {
        showTxt(){
            if(this.show) return this.txt.substring(0,80)+'...'
            else if(this.txt.length>100) return this.txt.substring(0,40)+'...'
            else return this.txt
        }
        
    },
    methods:{
        makeStarred(){
            this.$emit('starred')     
        }
    }
}