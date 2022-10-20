<template>
  <v-dialog v-model="dialog" width="500" :fullscreen="$vuetify.breakpoint.mobile">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="grey-darken-2" v-bind="attrs" v-on="on">
              <v-badge color="theme" overlap v-model="showBagde" :content="cartProducts.length">
                <v-icon>mdi-shopping</v-icon>
              </v-badge>
            </v-btn>
        </template>
        <v-card class="cartContainer">
            <v-card-title class="text-h5 grey lighten-2 text-uppercase">
                Koszyk
                <v-btn icon color="success" @click="dialog=false">
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
            </v-card-title>
            <v-card-text class="text-center my-4 text-uppercase" v-show="!cartProducts.length">koszyk jest pusty</v-card-text>
            <v-list>
                <v-list-item class="my-1" v-for="product in cartProducts" :key="product.id" :class="{ 'transition': deletedItem === product.id }">
                 <v-img contain max-width="80" fill-height :src="product.image"></v-img>
                    <v-list-item-content>
                        <v-list-item-title class="mx-2 text-uppercase dark-grey--text">{{product.name}}</v-list-item-title>
                        <v-list-item-subtitle class="mx-2">{{product.size}}</v-list-item-subtitle> 
                        <v-list-item-subtitle class="mx-2">{{product.price}}</v-list-item-subtitle>
                         
                         <v-btn absolute top right text max-width="50" color="error" @click="removeProduct(product)">Usuń</v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog=false">
                    Zamknij koszyk
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      dialog: false,
      deletedItem: null,
    }
  },

  computed: {
    products(){
      return this.$store.getters.inCart
    },

    ...mapGetters('cart', {
      cartProducts: 'cartProducts'
    }),

    showBagde(){
      if (this.cartProducts.length == 0) {
        return false
      }  else {
        return true 
      }
    }

  },

  methods: {
    removeFromCart: function(value) {
      this.deletedItem = value
      setTimeout( () => {
        this.$store.dispatch('removeFromCart', value)
        this.deletedItem = null
      }, 300)
    },

    ...mapActions('cart', {
      removeProduct: 'removeProduct' 
    })
  }
}
</script>

<style>
.transition {
  opacity: 0;
  transition: all .5s ease;
  overflow: hidden;
  transform: translateX(100px);
}

.cartContainer {
  overflow: hidden;
}
</style>