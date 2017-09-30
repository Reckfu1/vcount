# Vcount

## Install
``` bash
npm i vcount
```
## Example
``` vue
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