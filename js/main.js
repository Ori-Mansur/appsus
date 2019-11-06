


import theRouter from './routes.js'






new Vue({
    router: theRouter,
    el: '#appsus',
    template: `
    <section class="home">
    <header>
    
    <h2>{{title}}</h2>
    <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/email">Email</router-link> |
            <router-link to="/notes">Notes</router-link> |
            <router-link to="/book">Books</router-link> |
            <router-link to="/about">About</router-link> |
    </nav>
    </header>
        <router-view></router-view>
        <footer class="footer"></footer>
        
        
    </section>
    `,
    data: {
        title: 'Appsus',
    },
    methods: {


    },
    created() {


    },

    components: {
        
    }
})