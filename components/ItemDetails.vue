<template>
    <v-dialog v-model="dialog" width="800" class="d-flex justify-center" :fullscreen="$vuetify.breakpoint.mobile">
        <template v-slot:activator="{ on, attrs }">
            <v-card elevation="0" tile>
                <v-img class="image" contain max-width="300" fill-height :src="product.image" v-bind="attrs" v-on="on" />
                <v-card-subtitle dark class="font-weight-medium">{{ product.name }}</v-card-subtitle>
                <v-card-text>{{ product.price }}</v-card-text>
            </v-card>
        </template>
        
        <v-card class="cartContainer" width="800" tile pd="4" elevation="0">
            <v-btn icon color="success" @click="dialog=false">
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
            <v-row class="d-flex align-center">
                <v-col md="6" xs="1" class="d-flex flex-column align-center">
                    <v-img contain max-width="300" fill-height :src="product.image"></v-img>
                    <v-btn class="mt-4" color="success" :disabled="!isSizeSet" @click="addProduct({product, size})">Do koszyka</v-btn>
                </v-col>

                <v-col xs="x1" md="6">
                    <v-card-text>
                        <p class="text-h4 text--primary">{{ product.name }}</p>
                        <p>{{ product.category }}</p>
                        <p class="text--primary">{{ product.price }}</p>
                        <p>Wybierz rozmiar:</p>
                    </v-card-text>
                    
                    <v-item-group>
                        <v-btn-toggle v-model="toggle_exclusive" tile color="primary">
                            <v-row>
                                <v-col cols="4" v-for="col in col1" :key="col.value" class="d-flex justify-center">
                                    <v-btn @click="setSize(col.value)" tile elevation="0" width="80">
                                    {{col.value}}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-btn-toggle>
                    </v-item-group>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['productId'],
    data() {
        return{ 
            dialog: false,
            isSizeSet: false,
            size: null,
            col1: [
                {value: "38.5"},
                {value: "39"},
                {value: "40"},
                {value: "40.5"},
                {value: "41"},
                {value: "42"},
                {value: "42.5"},
                {value: "43"},
                {value: "44"},
                {value: "44.5"},
                {value: "45"},
                {value: "45.5"},
                {value: "46"},
                {value: "47"},
                {value: "48"},
                {value: "48.5"},
                {value: "49.5"}
            ],
        }
    },
    computed: {
        product() {
            return this.$store.getters.dialog(this.productId)
        }
    },

    methods: {
        addToCart(value) {
            this.$store.dispatch('addToCart', value)
        },

        ...mapActions('cart', [
            'addProduct'
        ]),

        setSize(value) {
            this.size = value
            this.isSizeSet = true
        }
    }
}
</script>

<style>
    .image {
        cursor: pointer;
    }
</style>