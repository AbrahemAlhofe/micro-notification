<template lang="pug">
    
.micro-stack( :class="`micro-stack--stage-${head}`" ): slot

</template>
<script>
import { computed } from 'vue';

export default {
    
    data: vm => ({

        head: 0,

        stages: []

    }),

    methods: {

        async nextStage () {

            const onLeave = this.stages[this.head].$attrs.onLeave;

            if ( onLeave ) await onLeave();

            this.head += 1;

        }

    },

    provide () {

        return { head: computed(() => this.head), stages: this.stages }

    }

}
</script>