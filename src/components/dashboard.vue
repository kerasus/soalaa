<template>
    <div>
        <v-card
                class="mx-auto"
                min-width="100%"
                tile
        >
            <v-btn
                    :loading="true"
                    :disabled="true"
            >
                Block Button
            </v-btn>

            <v-list rounded>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                >
                    <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data: () => ({
            selectedItem: 1,
            items: [
                { text: 'Real-Time', icon: 'mdi-clock' },
                { text: 'Audience', icon: 'mdi-account' },
                { text: 'Conversions', icon: 'mdi-flag' },
            ],
        })
    }
</script>

<style scoped>

</style>
