'use strict'

export default {
    template:`
    <section>
        <input type ="text" placeholder="Search email"/>
        <input type ="radio" value="readEmails" v-model="filterBy.searchType"/>
        <input type ="radio" value="unreadEmails" v-model="filterBy.searchType"/>
        <input type ="radio" value="allEmails" v-model="filterBy.searchType"/>
    </section>`
    ,
    data(){
        return {
            filterBy: {
                searchKey: '',
                searchType: ''
            },
        }
    },
    watch: {

            'filterBy.searchType'(value){
                console.log(value);
            },
            'filterBy.searchKey'(value){
                console.log(value);  
            }

        
    }

}