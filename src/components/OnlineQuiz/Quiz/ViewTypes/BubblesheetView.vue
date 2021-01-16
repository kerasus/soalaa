<template>
    <v-container :fluid="true">
        <v-row>
            <v-col>
                hi
                <BubbleSheet>
                    hi
                </BubbleSheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import { mixinQuiz, mixinDrawer, mixinWindowSize } from '@/mixin/Mixins'
    export default {
        components: {BubbleSheet},
        mixins: [mixinQuiz, mixinDrawer, mixinWindowSize],
        created() {
            // this.showAppBar()
            // this.updateDrawerBasedOnWindowSize()
            this.startExam()
        },
    }
</script>