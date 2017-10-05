# Vcount

## Install
``` bash
npm install vcount
```

## Example
``` vue
<template>
  <vcount :start='startValue' :end='endValue' :duration='duration'></vcount>
</template>

<script>
import vcount from 'vcount'
export default {
    components: { vcount },
    data () {
        return {
            startValue: 0,
            endValue: 2000,
            duration:4000
        }
    }
}
</script>
```

## Usage
#### Props:
- `start`: Number</br>
the value you want to begin at
- `end`: Number</br>
the value you want to arrive at
- `duration`: Number</br>
duration in milliseconds
- `decimal`: String</br>
split decimal
- `decimals`: Number</br>
number of decimal places in number
- `separator`: String</br>
character to use as a separator
- `prefix`: String</br>
optional text before the result
- `suffix`: String</br>
optional text after the result
- `useEasing`: Boolean</br>
easing function
- `watchValue`: Boolean</br>
watch startValue and endValue

#### Default Options:

```vue
<template>
    <vcount :start='start' :end='end' :duration='duration' :decimal='decimal' :decimals='decimals' :separator='separator' :prefix='prefix' :suffix='suffix' :useEasing='useEasing' :watchValue='watchValue'></vcount>
</template>
<script>
export default {
  data(){
    return {
      start:0,
      end:2000,
      duration:4000,
      decimal:'.',  
      decimals:'0',
      separator:',',
      prefix:'',
      suffix:'',
      useEasing:true,
      watchValue:true
    }
  }
}
</script>
```

#### Methods:

```vue
<template>
    <vcount ref='child'></vcount>
    <span @click='toCallOnComplete'></span>
</template>
<script>
export default {
  methods:{
    toCallOnComplete(){
        this.$refs.child.play(function(){
            alert('completed')
        })
        // or
        // this.$refs.child.play(this.completed)
    },
    completed(){
        alert('completed')
    }
  }
}
</script>
```