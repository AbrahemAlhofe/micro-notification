<template lang="pug">
micro-stack.micro-notification( ref="microStack" )
    
    micro-stage( @leave="leaveStageOne" @click="$refs.microStack.nextStage()" ) 
        .badge( ref="badge" ): span 5
        .bell( ref="bell" ): BellIcon

    micro-stage.micro-notification__notifications-stack( @enter="enterStageTwo" @leave="leaveStageTwo" )
        .notification( ref="notification" @click="$refs.microStack.nextStage()" )
            .author
                keep-alive
                    .author__avatar( :style='{ backgroundImage : `url(assets/avatars/avatar-4.jpg)` }' )
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
                        div( :style='{ backgroundImage : `url(assets/avatars/avatar-2.jpg)` }')
                    .student
                        div( :style='{ backgroundImage : `url(assets/avatars/avatar-3.jpg)` }')

    micro-stage.message( @enter="enterStageThree" )
        .message__header
            .author
                keep-alive
                    .author__avatar( :style='{ backgroundImage : `url(assets/avatars/avatar-4.jpg)` }' )
                div
                    .author__name Robert Merphy
                    .notification__details informed 2 students 5/30/2022, 2:23:24 PM
            .micro-notification__close-button( @click="close" ): CloseIcon
    
        .message__content( ref="content" )
            p.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Dolorum voluptates minima expedita voluptatibus!
                Deserunt laudantium accusantium quisquam nobis placeat
            .asset( :class='[ `asset--doc-type` ]' )
                .asset__icon: DocIcon
                .asset__details
                    .asset__name New Document File.doc
                    .asset__size 1.23MB
        .message__footer
            .readed
                span Readed
                .student( :style='{ backgroundImage : `url(assets/avatars/avatar-1.jpg)` }' )
                .student( :style='{ backgroundImage : `url(assets/avatars/avatar-2.jpg)` }' )

            .unread
                span Unread
                .student( :style='{ backgroundImage : `url(assets/avatars/avatar-3.jpg)` }' )

</template>

<script>
import { gsap } from 'gsap';

import MicroStage from './micro-stage.vue';
import MicroStack from './micro-stack.vue';

import BellIcon from '../../assets/icons/bell.svg';
import DocIcon from '../../assets/icons/doc.svg';
import CloseIcon from '../../assets/icons/close.svg';

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

                const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;

                gsap.timeline()
                    .to(this.$el, { width: isLargeScreen ? 500 : "95vw", justifyContent: "space-between", onComplete })
                    .set(this.$refs.notification, { display: "flex" })
                    .to(this.$refs.notification, { scale: 1 })
                    .to(this.$refs.progress, { opacity: 1 });

            })

        },

        leaveStageTwo () {

            return new Promise(onComplete => {

                const containerHeight = 345
                const notificationHeight = this.$refs.notification.getBoundingClientRect().height;
                const containerPadding = 10;
                const distance = ( (containerHeight / 2) - notificationHeight ) + containerPadding;

                gsap.timeline({ onComplete })
                    .to(this.$el, { height: containerHeight + "px" })
                    .to(this.$refs.notification, { y: `-=${distance}px` })
                    .to(this.$refs.progress, { opacity: 0 }, "-=0.9")
                    .duration(0.5);

            })

        },

        enterStageThree () {

            return new Promise(onComplete => {

                gsap.timeline({ onComplete })
                    .from(this.$refs.content, { opacity: 0, y: 20 })

            })

        },

        close () {

            gsap.timeline()
                .to(this.$el, { height: 75, width: 75, justifyContent: "center" })
                .to(this.$refs.bell, { scale: 1 })
                .to(this.$refs.badge, { scale: 1 })
                .to(this.$refs.notification, { display: "none", y: 0, scale: 0.7 })
                

            this.$refs.microStack.head = 0;

        }

    },
    
    components: { CloseIcon, BellIcon, DocIcon, MicroStage, MicroStack } 

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

    &__notifications-stack {

        width: 100%;

    }

    &.micro-stack--stage-0 {
    
        cursor: pointer;
        padding: 0;

    }

    &.micro-stack--stage-0, &.micro-stack--stage-1 {
        
        &:active {
            --squish-amount : 9.5px;
            margin-top: var(--squish-amount);
            height: calc( var(--squish-amount) + 75px );
        }

    }

}

/* ======================================== */
/* Stage 1
/* ======================================== */

.micro-stack__stage:nth-child(1) {

    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

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
    z-index: 5;

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

/*
==============================================
| Stage 2
==============================================
*/

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
    align-items: center;
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
        background-size: cover;
        aspect-ratio: 1 / 1;
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

/*
==============================================
| Stage 3
==============================================
*/

.micro-notification {

    &__close-button {

        transition: all .5s cubic-bezier(0.165, 0.84, 0.44, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        color: var(--gray-45);
        cursor: pointer;

        svg {

            position: absolute;
            top: 15px;
            right: 15px;

        }

        &:hover {
            background-color: var(--gray-94);
        }

    }

}

.message__header {

    display: flex;
    justify-content: space-between;
    transform-origin: left;
    cursor : pointer;
    align-items: center;

    &__details {
        color: var(--gray-45);
    }

}

.message__header .author {
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

.message__content {

    .asset {
        display: flex;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;

        &__icon {
            margin-right: 10px;
        }

        &__name {
            color: var(--black-100)
        }

        &__details {
            display: flex;
            flex-direction: column;
        }
        
        &__size {
            font-size: 13px;
            color: var(--gray-300)
        }   
    }

    .asset--doc-type, .asset--ts-type {
        background-color: rgb(33, 150, 243, 7%);
    }

    .asset--html-type {
        background-color: rgba(253, 112, 19, 7%);
    }

    .asset-unkownfile-type {
        background-color: rgba(238, 238, 238, 40%)
    }

}

.message__footer {

    margin: 10px;
    justify-content: center;
    padding-top: 10px;
    display: flex;

    .readed, .unread {
        padding : 0 2em;
        span {
            display: block;
            margin-bottom: 7px;
            color: var(--gray-45);
        } 
        .student {
            width : 25px;
            height : 25px;
            margin-right : 7px;
            border-radius: 50%;
            float : left;
            background-color: var(--gray-94);
            background-size: contain;
            background-position: center;
        }
    }

}

</style>