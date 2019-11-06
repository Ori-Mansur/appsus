'use strict'


export default {
    props: ['note'],
    template: `
          <section class="text-note">
              {{note.info}}
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