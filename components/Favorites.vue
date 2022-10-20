<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon text color="grey-darken-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-cards-heart-outline</v-icon>
            </v-btn>
        </template>
         <v-card>
            <v-card-title class="text-h5 grey lighten-2 text-uppercase">
                Ulubione
            </v-card-title>
            <v-card-text class="text-center my-4 text-uppercase" v-if="products.length==0">Ulubione są puste</v-card-text>
            <v-list>
                <v-list-item class="my-1" v-for="product in products" v-bind:key="product.id">
                 <v-img contain max-width="80" fill-height :src="product.image"></v-img>
                    <v-list-item-content>
                        <v-list-item-title class="mx-2 text-uppercase dark-grey--text">{{product.name}}</v-list-item-title>
                         <v-list-item-subtitle class="mx-2">{{product.price}}</v-list-item-subtitle>      
                         <v-btn absolute top right text max-width="50" color="error" @click="removeFromFavs(product.id)">Usuń</v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false">
                    Zamknij ulubione
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Favorites',
    data () {
        return {
            dialog: false,
        }
    },
    computed: {
        products(){
            return this.$store.getters.inFavs
        }
    },
    methods: {
        removeFromFavs: function(value) {
            this.$store.dispatch('removeFromFavs', value)
        }
    }
}
</script>