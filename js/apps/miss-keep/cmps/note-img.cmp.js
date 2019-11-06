'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="img-note" :style="{'background-color':note.color}">
          <img :src="note.info"/>
          <tools @update=""></tools>
          </section>
    `,
    data() {
        return {
            val: ''
        };
    },
    methods: {
        removeNote(noteid){
            this.$emit('remove', noteid);
        },
      
    },
    components:{
        tools
    }
};