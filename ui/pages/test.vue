<template>
    <div class="analyze">
        <search :placeholder="'package name'"/>
        <div class="row">
            <div class="col col-md-3">
                <sticky/>
            </div>
            <div class="col col-md-9 mt-4">
                <h2>Package Name</h2>
                <div class="analyze__messages">
                    <ul :class="[collapsed? 'analyze__messages__collapsed' : 'analyze__messages__uncollapsed']">
                        <li class="analyze__messages--positive">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--warn">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--negative">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--positive">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--warn">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--negative">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--positive">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--warn">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--negative">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--positive">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--warn">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--negative">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--positive">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--warn">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                        <li class="analyze__messages--negative">
                            <p class="d-inline-block ml-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                            <hr>
                        </li>
                    </ul>
                    <hr class="mb-0">
                    <button @click="collapsed = !collapsed" class="analyze__extender btn">
                        <i :class="{'analyze__rotate': collapsed}" class="fa fa-angle-down" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import search from '~/components/common/search';
    import sticky from '~/components/common/sticky';
    export default {
    name: "test",
    components:{
      search,
      sticky
    },
    data() {
      return{
        collapsed: false
      };
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/style/vars";
    .analyze{
        &__rotate{
            transform: rotate(-180deg);
        }
        &__extender{
            bottom: -20px;
            left: 50%;
            position: absolute;
            background: #ffff;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        &__messages{
            position: relative;
            &__collapsed{
                height: 100%;
            }
            &__uncollapsed{
                height: 200px;
                overflow: hidden;
            }
            &--positive{
                &:before{
                    color: $success;
                    display: inline-block;
                    font: normal normal normal 14px/1 FontAwesome;
                    content: "\f00c";
                }
            }
            &--negative{
                &:before{
                    color: $error;
                    display: inline-block;
                    font: normal normal normal 14px/1 FontAwesome;
                    content: "\f00d";
                }
            }
            &--warn{
                &:before{
                    color: $warn;
                    display: inline-block;
                    font: normal normal normal 14px/1 FontAwesome;
                    content: "\f12a";
                }
            }

        }
    }

</style>