'use strict'


export default {
    props: ['note'],
    template: `
          <section class="video-note" :style="{'background-color':note.color}">
            <iframe :src="src">
             </iframe>
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
        src() {
            return `https://www.youtube.com/embed/${this.note.info}`;
        }
    }
};