<template>
    <v-dialog v-model="dialog" width="60%" class="d-flex justify-center" :fullscreen="$vuetify.breakpoint.mobile">
        <template v-slot:activator="{ on, attrs }">
            <v-card elevation="0">
                <v-img class="product" contain max-width="300" fill-height :src="product.image" v-bind="attrs" v-on="on" />
                <v-card-subtitle dark class="font-weight-medium">
                    <p class="text--primary">{{ product.name }}</p>
                    <p class="font-weight-medium">{{ product.category }}</p>
                    <p class="font-weight-light">{{ product.price + "zł" }} </p>
                </v-card-subtitle>
            </v-card>
        </template>
        <v-card class="detailsContainer overflow-hidden" pd="4" elevation="0">
            <v-card class="d-flex justify-end" elevation="0">
                <v-btn icon color="theme" @click="dialog=false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </v-card>
            
            <v-row class="d-flex align-center justify-center flex-grow-0 mb-4">
                <v-col md="6" xs="1" class="d-flex justify-center">
                    <v-card width="80%" class="d-flex flex-column align-center" elevation="0">
                        <v-img contain max-width="300" fill-height :src="product.image"></v-img>
                        <v-btn class="mt-4 white--text" height="50" width="300" color="theme" :disabled="!isSizeSet" @click="addProduct
                    ({product, size})" v-if="!$vuetify.breakpoint.mobile">Do koszyka</v-btn>
                    </v-card>
                </v-col>

                <v-col xs="x1" md="6" class="d-flex flex-column align-center">
                    <v-card width="80%" elevation="0">
                        <v-card-text class="d-flex flex-column">
                            <p class="text-h4 text--primary">{{ product.name }}</p>
                            <p>{{ product.category }}</p>
                            <p class="text--primary">{{product.price + "zł"}}</p>
                            <p>Wybierz rozmiar:</p>
                        </v-card-text>    
                    
                        <v-item-group>
                            <v-btn-toggle v-model="toggle_exclusive" color="deep-purple accent-3"> 
                                <v-row>
                                    <v-col cols="4" v-for="size in sizes" :key="size" class="d-flex justify-center">
                                        <v-btn @click="setSize(size)" elevation="0" width="80">
                                            {{size}}
                                        </v-btn>
                                    </v-col> 
                                </v-row>
                            </v-btn-toggle>
                        </v-item-group>
                        <v-btn class="mt-6 white--text" height="50" width="100%" color="theme" :disabled="!isSizeSet" @click="addProduct
                        ({product, size})" v-if="$vuetify.breakpoint.mobile">Do koszyka</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ItemDetails',
    props: ['productId'],
    data() {
        return{ 
            toggle_exclusive: null,
            dialog: false,
            isSizeSet: false,
            size: null,
            sizes: [
                "38.5", "39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "45.5", "46", "47", "48", "48.5", "49,5"
            ]
        }
    },
    computed: {
        product() {
            return this.$store.getters.product(this.productId)
        },
    },

    methods: {
        ...mapActions('cart', [
            'addProduct'
        ]),

        setSize(value) {
            if (this.size == value) {
                this.size = null
                this.isSizeSet = false
            } else {
                this.size = value
                this.isSizeSet = true
            }
        }
    }
}
</script>

<style>
    .product {
        cursor: pointer;
    }
</style>