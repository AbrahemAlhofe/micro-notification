<template lang="pug">
.micro-notification
    
    template( v-if="currentStage === 1")
        .badge: span 5
        BellIcon.bell

</template>

<script>
import BellIcon from '../assets/bell.svg';
export default {

    data: _ => ({

        currentStage: 1

    }),
    
    components: { BellIcon } 

}
</script>

<style lang="postcss">
.micro-notification {

    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 15px 15px var(--gray-94);
    transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 5px;
    padding: 10px;
    width: 75px;
    height: 75px;
    position: relative;
    background-color: var(--white);
    cursor: pointer;

    &:active {
        --squish-amount : 9.5px;
        margin-top: var(--squish-amount);
        height: calc( var(--squish-amount) + 75px );
    }

    & > * {
      transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

}

.badge {

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    padding: 10px;
    font-size: 11px;
    position: absolute;
    top: 10px;
    right: 15px;
    background-color: var(--red-50);
    color: var(--white);

    span {
        z-index: 2;
    }

    &--hide {
        transform: scale(0);
    }

    &:before {
        content : "";
        width: 100%;
        height: 100%;
        background-color: var(--red-50);
        border-radius: 50%;
        position: absolute;
        opacity: 0.5;
        animation: wave 2.5s linear infinite;
    }
    
    @keyframes wave {

        0% { transform: scale(0) }

        100% {
            transform: scale(3);
            opacity: 0;
        }

    }

}

.bell {
    
    display: block;

    &--hide {
        transform: scale(0);
    }

}

</style>