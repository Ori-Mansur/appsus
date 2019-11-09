'use strict'

export default {
    template: `
    <section class="main-home-page container">
        <h1 class="main-sentence">Professional is the ability to pinpoint the small details</h1>
        <h2 class="sec-sentence">Be professional</h2>
        <div class="main-card-container">
            <router-link to="/email" class="main-card-a"> 
                <img src="img/pexels-photo-3153198.jpeg">
                Contact your team with our <h3>Email</h3>
            </router-link> 
            <router-link to="/notes" class="main-card-a">
                <img src="img/pexels-photo-669615.jpeg">
                Keeping your stuff in order with our <h3>Notes</h3> worth pin the important ones up
            </router-link> 
            <router-link to="/book" class="main-card-a">
                <img src="img/pexels-photo-357547.jpeg">
                Have more time for yourself find your next book in our <h3>Books</h3> provider
            </router-link> 
        </div>
    </section>
    `
}