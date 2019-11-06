'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="text-note" :style="{'background-color':note.color}">
             <h3> {{note.info}}</h3>
          </section>
    `,
    data() {
        return {
            val: ''
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    },
    components:{
        tools
    }
};