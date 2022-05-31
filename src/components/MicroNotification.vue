<template lang="pug">
micro-stack.micro-notification( ref="microStack" )
    
    micro-stage( @leave="leaveStageOne" @click="$refs.microStack.nextStage()" ) 
        .badge( ref="badge" ): span 5
        .bell( ref="bell" ): BellIcon

    micro-stage.micro-notification__notifications-stack( @enter="enterStageTwo" )
        .notification( ref="notification" )
            .author
                .author__avatar( :style='{ backgroundImage : `url(/src/assets/avatars/avatar-1.jpg)` }' )
                div
                    .author__name Robert Merphy
                    .notification__details informed 2 students 5/30/2022, 2:23:24 PM
            .progress( ref="progress" )
                span
                    span 2
                    span Readed
                .bar
                    svg( width='100%' height='100%' )
                        circle( r='50%' cx='50%' cy='50%' :stroke-dasharray=' `94.24777960769379 94.24777960769379` ' ).bar__progress
                .students-container
                    .student
                        div( :style='{ backgroundImage : `url(/src/assets/avatars/avatar-2.jpg)` }')
                    .student
                        div( :style='{ backgroundImage : `url(/src/assets/avatars/avatar-3.jpg)` }')
</template>

<script>
import { gsap } from 'gsap';

import MicroStage from './micro-stage.vue';
import MicroStack from './micro-stack.vue';

import BellIcon from '../assets/bell.svg';

export default {

    methods: {

        leaveStageOne () {

            return new Promise(onComplete => {

                gsap.to(this.$refs.bell, { scale: 0 })

                gsap.to(this.$refs.badge, { scale: 0, onComplete })

            })

        },

        enterStageTwo () {

            return new Promise(onComplete => {

                gsap.timeline()
                    .to(this.$el, { width: 500, justifyContent: "space-between", onComplete })
                    .set(this.$refs.notification, { display: "flex" })
                    .to(this.$refs.notification, { scale: 1 })
                    .to(this.$refs.progress, { opacity: 1 });

            })

        }

    },
    
    components: { BellIcon, MicroStage, MicroStack } 

}
</script>

<style lang="postcss">
.micro-notification {

    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 15px 15px var(--gray-94);
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

    &__notifications-stack {

        width: 100%;

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

}

.notification {

    justify-content: space-between;
    transform-origin: left;
    cursor : pointer;
    display: none;
    transform: scale(0.7);
    align-items: center;

    &__details {
        color: var(--gray-45);
    }

}

.notification .author {
    display: flex;
    &__name {
        color: var(--black);
    }
    &__avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: var(--gray-94);
        background-position: center;
        background-size: contain;
    }
}

.progress {
    
    transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: block;
    width: 60px;
    height: 60px;
    position: relative;
    opacity: 0;

    &:hover {

        .bar__progress {
            stroke-width : 10;
        }

        @for $i from 0 to 10 {
            .student:nth-child($i) {
                transform: scale(1) rotateZ(calc( ($i * 40deg) - 40deg ));
                div {
                    transform: rotateZ(calc( ( $i - 1 ) * -35deg ));
                }
            }
        }

    }

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        flex-direction:column;
        padding: 8px;
        border-radius: 50%;
        background-color: var(--white);
        :first-child {
            font-size: 15px;
            font-weight: bold;
            color: var(--black);
        }
        :last-child {
            font-size: 10px;
            color: var(--black);
        }
    }

    .bar {
        width : 100%;
        height : 100%;
        position: absolute;
        border-radius: 50%;
        top: 0px;
        left: 0px;
        svg {
            overflow: inherit;
        }
        &__progress {
            transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
            fill: var(--gray-94);
            transform: rotate(-90deg);
            transform-origin: center center;
            stroke : var(--green-50);
            stroke-width : 5;
        }
    }

    .students-container {
        width : 100%;
        height : 100%;
        position: relative;
    }

    .student {
        transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
        width: 35%;
        background-color: var(--black);
        height: 35%;
        border-radius: 50%;
        position: absolute;
        z-index: 5;
        transform-origin: calc( 50% ) calc( 100% * 2 + 70% );
        top: -30%;
        left: calc( 50% - 15% );
        transform: scale(0);
        @for $i from 0 to 10 {
            &:nth-child(#{$i}) {
                transition-delay: $($i * .1)s !important
            }
        }
        div {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-size: contain;
            background-position: center;
        }
    }

}

</style>