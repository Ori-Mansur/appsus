'use strict'





export default {
    props:['txt'],
    template:`
    <section class="long-text-container">
        <p>{{showTxt}}</p>
    </section>
     `
    ,
    computed: {
        showTxt(){
            if(this.txt.length>100) return this.txt.substring(0,40)+'...'
            else return this.txt
        }
    }
}