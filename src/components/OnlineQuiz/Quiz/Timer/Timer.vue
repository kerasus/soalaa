<template>
    <div class="wrapper">
        <mobile-timer v-if="windowSize.x < 700" />
        <pc-timer v-else/>
    </div>
</template>
<script>
    import MobileTimer from '@/components/OnlineQuiz/Quiz/Timer/mobile'
    import PcTimer from '@/components/OnlineQuiz/Quiz/Timer/pc'
    import { mixinWindowSize } from '@/mixin/Mixins'

    export default {
        name: "Timer",
        mixins: [mixinWindowSize],
        components: {
            MobileTimer,
            PcTimer
        },

    }
</script>

<style scoped>
.wrapper {
    margin-bottom: 0px;width: 100%
}
</style>
