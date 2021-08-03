<template>
    <header id="header">
	  
        <!-- start Navbar (Header) -->
        <nav class="navbar navbar-primary navbar-fixed-top navbar-sticky-function">
        
            <div id="top-header">
        
                <div class="container">
                
                    <div class="row">
                    
                        <div class="col-sm-6">
                            
                            <div class="top-header-widget">
                                <ul class="top-header-dropdown">
                                    <li class="dropdown dropdown_hover">
                                        <a id="language-dropdown" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <i class="ion-android-globe"></i> English
                                            <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="language-dropdown">
                                            <li><a href="#">English</a></li>
                                            <li><a href="#">Hindi</a></li>
                                            <li><a href="#">Marathi</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="top-header-widget hidden-xs">
                                <i class="ion-android-call"></i> <span class="number">+91 762 009 8848</span>
                            </div>
                        
                        </div>
                        
                        <div class="col-sm-6">
            
                            <div class="top-header-widget pull-right hidden-xs">
                                <a href="#">
                                    <i class="fa fa-comments mr-3"></i> Support
                                </a>
                            </div>
                            
                        
                        </div>
                        
                    </div>
                
                </div>
                
            </div>

            <div class="container">
                
                <div class="navbar-header">
                    <router-link to="/" class="navbar-brand logo">
                        <img :src="getLogo()" alt="Meritest" />
                    </router-link>
                </div>
                
                <div id="navbar" class="collapse navbar-collapse navbar-arrow">
                
                    <ul class="nav navbar-nav navbar-right" id="responsive-menu">
                    
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/how-it-works">How it works</router-link>
                        </li>
                        <li>
                            <router-link to="/about-us">About Us</router-link>
                        </li>
                        <li>
                            <router-link to="/features">Features</router-link>
                        </li>
                        <li>
                            <router-link to="/contact-us">Contact Us</router-link>
                        </li>
                        <li>
                            <router-link to="/blogs">Blogs</router-link>
                        </li>
                    </ul>
                
                </div>
                
            </div>

            <div id="slicknav-mobile"></div>
            
        </nav>
        <!-- end Navbar (Header) -->

    </header>
</template>

<script>
export default {
    methods: {
        getLogo()
        {
            return '/meritest/images/logo.png';
        }
    }

}
</script>

<style scoped>

.navbar>.container>.navbar-collapse>.navbar-nav>li>a.active {
	color: #0D7CC9 !important;
    background: none !important;
}

.logo {
    top: -66px;
    left: -67px;
    width: 250px;
}
</style>