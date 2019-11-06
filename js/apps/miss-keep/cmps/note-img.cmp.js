'use strict'


export default {
    props: ['note'],
    template: `
          <section class="img-note">
          <img :src="note.info"/>
              {{note}}
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
    }
};