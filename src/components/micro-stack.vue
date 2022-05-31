<template lang="pug">
    
.micro-stack: slot

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

            await this.stages[this.head].$attrs.onLeave();

            this.head += 1;

        }

    },

    provide () {

        return { head: computed(() => this.head), stages: this.stages }

    }

}
</script>