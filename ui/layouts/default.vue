<template>
    <div>
        <div class="header fixed-top bg-white w-100">
            <img class="header__logo" src="~/assets/images/logo.png" alt="logo">
            <ul class="float-right header__medias ml-auto mr-4 mb-0">
                <li class="d-inline ml-2"><a href=""><i class="fa fa-twitter-square" aria-hidden="true"/></a></li>
                <li class="d-inline ml-2"><a href=""><i class="fa fa-linkedin-square" aria-hidden="true"/></a></li>
                <li class="d-inline ml-2"><a href=""><i class="fa fa-github" aria-hidden="true"/></a></li>
                <li class="d-inline ml-2"><a href=""><i class="fa fa-envelope" aria-hidden="true"/></a></li>
            </ul>
        </div>
        <Nuxt class="body"/>
        <div class="bg-light position-absolute footer pt-3">
            <ul class="footer__links d-inline-block">
                <li><a href="">👩‍💻 About Me</a></li>
                <li><a href="">🙏 Thanks To</a></li>
                <li><a href="">🤝 Supporters</a></li>
            </ul>
            <small class="d-block text-center">copy right</small>
        </div>
    </div>
</template>
<style lang="scss">
    @import 'assets/style/vars';
    .header{
        box-shadow:  0 0 20px rgba(0,0,0,0.2);
        max-height: 70px;
        display: flex;
        align-items: center;
        &__logo{
            width: 8%;
        }
        &__medias{
            color: $product-color;
            a{
                &:hover{
                    color: $product-hover-color;
                }
            }
        }
    }
    .body{
        margin-top: 80px;
        min-height: 100vh;
    }
    .footer{
        &__links{
            line-height: 2.5em;
            li{
                color: $product-color;
                &:hover{
                    color: $product-hover-color;
                }
            }
        }
        color: $product-color;
        right: 0;
        left: 0;
    }
</style>