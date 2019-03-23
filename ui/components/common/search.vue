<template>
    <div class="search mt-5">
        <b-form inline>

            <label class="sr-only" for="inlineFormInputGroupUsername2">{{placeHolder}}</label>
            <b-input-group prepend="📦" class=" mb-sm-0 w-75">
                <b-input id="inlineFormInputGroupUsername2" :placeholder="placeHolder" />
            </b-input-group>

            <b-button @click="search" variant="primary" class="w-25">Packagi</b-button>
        </b-form>
    </div>
</template>

<script>
  export default {
    name: "analyze-component",
    props: {
      placeHolder:{
        type: String,
        required: true
      }
    },
    methods:{
      search(){
        this.$emit('search')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .search{
        .form-control{
            border-radius: 0;
        }
        .btn-primary{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }

</style>