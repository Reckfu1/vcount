# vcount

## Install
``` bash
npm i vcount
```
## Example
``` bash
<template>
  <vcount :start='startVal' :end='endVal' :duration='3000'></vcount>
</template>

<script>
  import vcount from 'vcount';
  export default {
    components: { vcount },
    data () {
      return {
        startVal: 0,
        endVal: 2017
      }
    }
  }
</script>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
