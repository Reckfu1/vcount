<template>
    <span>
        {{displayNumber}}
    </span>
    <!--     <div @click="play(test)">play</div>
    <div @click="pauseResume">pause/resume</div> -->
</template>
<script>
let lastTIme = 0
let vendors = ['webkit', 'moz', 'ms', 'o']
// 遍历各浏览器前缀以获取requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'requestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
}
// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，使用setTimeout
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime()
        var timeToCall = Math.max(0, 16 - (currTime - lastTime))
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall)
        lastTime = currTime + timeToCall
        return id
    }
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id)
    }
}
export default {
    data() {
        return {
            startVal: this.start,
            displayNumber: this.formatNumber(this.start),
            frameVal: null,
            paused: false,
            localDuration: this.duration,
            startTime: null,
            timestamp: null,
            remaining: null,
            rAF: null,
            callback: null
            // test(){
            //     console.log('completed!')
            // }
        }
    },
    methods: {
        play(callback) {
            this.startVal = this.start
            this.startTime = null
            this.localDuration = this.duration
            this.paused = false
            this.callback = callback
            this.rAF = requestAnimationFrame(this.count);
        },
        pauseResume() {
            if (this.paused) {
                this.resume()
            } else {
                this.pause()
            }
        },
        reset() {
            this.startTime = null
            this.destroyed()
            this.displayNumber = this.formatNumber(this.startVal)
        },
        pause() {
            this.destroyed()
            this.paused = true
        },
        resume() {
            this.startTime = null
            this.localDuration = +this.remaining
            this.startVal = +this.frameVal
            requestAnimationFrame(this.count)
            this.paused = false
        },
        count(timestamp) {
            if (!this.startTime) { this.startTime = timestamp }

            this.timestamp = timestamp
            let progress = timestamp - this.startTime
            this.remaining = this.localDuration - progress

            if (this.useEasing) {
                if (this.countDown) {
                    this.frameVal = this.startVal - this.easeOutExpo(progress, 0, this.startVal - this.end, this.localDuration)
                } else {
                    this.frameVal = this.easeOutExpo(progress, this.startVal, this.end - this.startVal, this.localDuration)
                }
            } else {
                if (this.countDown) {
                    this.frameVal = this.startVal - ((this.startVal - this.end) * (progress / this.localDuration))
                } else {
                    this.frameVal = this.startVal + (this.end - this.startVal) * (progress / this.localDuration)
                }
            }

            if (this.countDown) {
                this.frameVal = (this.frameVal < this.end) ? this.end : this.frameVal
            } else {
                this.frameVal = (this.frameVal > this.end) ? this.end : this.frameVal
            }
            this.displayNumber = this.formatNumber(this.frameVal)
            if (progress < this.localDuration) {
                this.rAF = requestAnimationFrame(this.count)
            } else {
                if (this.callback) {
                    this.callback()
                }
            }

        },
        ensureNumber(val) {
            // 如果是数字返回true
            return !isNaN(parseFloat(val))
        },
        formatNumber(num) {
            num = num.toFixed(this.decimals)
            num += ''
            const x = num.split('.')
            let x1 = x[0]
            let x2 = x.length > 1 ? this.decimal + x[1] : ''
            // 有两个括号，说明有两个分组，符合匹配的字符串会保存在正则对象的$1,$2属性中
            // 如1234：$1=1 $2=234       1234567:$1=1234 $2=567
            // 第一个分组:\d表示任意数字,+匹配前面的数字一次或者多次
            // 第二个分组:{3}表示匹配数字三次

            // x=1234567，第一次rgx.test(1234567)为true，符合匹配的字符串保存到了$1=1234，$2=567
            // 随后x.replace后等于x=1234,567
            // 第二次rgx.test(1234,567)为true，符合匹配的字符串保存到了$1=1，$2=234
            // 随后x.replace，同样是rgx，只会替换符合rgx的字符串，x=1234,567replace成x=1,234,567
            // 第二次rgx.test(1,234,567)为false,因为没有符合rgx的字符串
            const rgx = /(\d+)(\d{3})/
            if (this.separator && !this.ensureNumber(this.separator)) {
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + this.separator + '$2')
                }
            }
            return this.prefix + x1 + x2 + this.suffix
        },
        destroyed() {
            cancelAnimationFrame(this.rAF)
        },
        easeOutExpo(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
        }
    },
    computed: {
        countDown() {
            return this.start > this.end
        }
    },
    watch: {
        start() {
            if (this.watchValue) {
                if(this.callback){
                    this.play(this.callback)
                }
                else{
                    this.play()
                }
            }
        },
        end() {
            if (this.watchValue) {
                if(this.callback){
                    this.play(this.callback)
                }
                else{
                    this.play()
                }
            }
        }
    },
    props: {
        start: {
            type: Number,
            default: 0,
            required: false
        },
        end: {
            type: Number,
            default: 1000,
            required: false
        },
        // 十进制分隔符
        decimal: {
            type: String,
            required: false,
            default: '.'
        },
        // 显示的小数位数
        decimals: {
            type: Number,
            required: false,
            default: 0
        },
        // 过渡时间
        duration: {
            type: Number,
            required: false,
            default: 4000
        },
        // 分隔符 如：1,000
        separator: {
            type: String,
            required: false,
            default: ','
        },
        // 前缀
        prefix: {
            type: String,
            required: false,
            default: ''
        },
        // 后缀
        suffix: {
            type: String,
            required: false,
            default: ''
        },
        useEasing: {
            type: Boolean,
            required: false,
            default: true
        },
        watchValue: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    mounted() {
        if (this.watchValue){
            if(this.callback){
                this.play(this.callback)
            }
            else{
                this.play()
            }
        }
    }
}
</script>
<style>
</style>