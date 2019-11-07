'use strict'

export default {
    template: `
   
    <header>
    <div class="main-header">
    <h2 class="logo">APPSUS</h2>
    <nav>
        <router-link to="/" class="main-nav-a" exact>Home</router-link> 
        <router-link to="/email" class="main-nav-a">Email</router-link> 
        <router-link to="/notes" class="main-nav-a">Notes</router-link> 
        <router-link to="/book" class="main-nav-a">Books</router-link> 
        <router-link to="/about" class="main-nav-a">About</router-link> 
    </nav>
    </div>
    </header>
    
    `,
}