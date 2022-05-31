<template lang="pug">
    
.micro-stack__stage( v-show="head === index" ): slot

</template>
<script>
export default {

    data: vm => ({

        index: vm.stages.length

    }),

    watch: {

        head: {

            async handler (head) {

                if ( head === this.index && this.$attrs.onEnter ) await this.$attrs.onEnter()

            },

            immediate: true

        }

    },

    created () {

        this.stages.push(this);

    },

    inject: ['head', 'stages']

}
</script>