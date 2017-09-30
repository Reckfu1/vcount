<template>
    <div id="app">
        <span ref='count'></span>
    </div>
</template>

<script>
import countUp from 'countup.js'
export default {
    data(){
        return {
            numAnim:null
        }
    },
    mounted(){
        this.initCountUp()
    },
    methods:{
        initCountUp(){
            this.numAnim=new countUp(this.$refs.count,this.start,this.end,this.decimal,this.duration,this.options)
            this.numAnim.start()
        }
    },
    props:{
        start:{
            type:Number,
            default:0
        },
        end:{
            type:Number,
            default:2017
        },
        decimal:{
            type:Number,
            default:0
        },
        duration:{
            type:Number,
            default:2.5
        },
        options:{
            type:Object
        }
    }
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>