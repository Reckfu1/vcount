# Vcount

## Install
``` bash
npm install vcount
```

## Example
``` vue
<template>
  <vcount :start='startValue' :end='endValue' :duration='4000'></vcount>
</template>

<script>
import vcount from 'vcount'
export default {
    components: { vcount },
    data () {
        return {
            startValue: 0,
            endValue: 2000
        }
    }
}
</script>
```

## Usage
Props:
- `start`: Number
the value you want to begin at
- `end`: Number
the value you want to arrive at
- `duration`: Number
duration in milliseconds
- `decimal`: String
split decimal
- `decimals`: Number
number of decimal places in number
- `separator`: String
character to use as a separator
- `prefix`: String
optional text before the result
- `suffix`: String
optional text after the result
- `useEasing`: Boolean
easing function
- `watchValue`: Boolean
watch startValue and endValue

Default Options:

```vue
<vcount :start='0' :end='1000' :duration='4000' :decimal='.' :decimals='0' :separator=',' :prefix='' :suffix='' :useEasing=true :watchValue:true></vcount>
```