<template>
    <div>
        <b-form-file v-model="file" ref="fileinput" class="mt-5" />
    </div>
</template>

<script>
  export default {
    name: "Assessment-component",
    data(){
      return{
        file:null
      };
    }
  }
</script>

<style lang="scss">
    @import "~assets/style/vars";
    .custom-file-label{
        box-sizing: border-box;
        width: 25%;
        margin: auto;
        border: dashed lightgray;
        height: 100px;
        text-align: center;
        padding: 12% 0;
        &:before{
            display: inline-block;
            font: normal normal normal 14px/1 FontAwesome;
            content: "\f16b";
            color: rgba($product-hover-color, 0.5);
            font-size: 15em;
            position: absolute;
            top: 85px;
            left: 18%;
            z-index: -1;
        }
        &:after{
            display: none;
         }
    }
</style>