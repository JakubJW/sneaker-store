<template>
  <v-dialog v-model="dialog" width="500" :fullscreen="$vuetify.breakpoint.mobile">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="grey-darken-2" v-bind="attrs" v-on="on">
              <v-badge color="theme" overlap v-model="showBagde" :content="totalQuantity">
                <v-icon>mdi-shopping</v-icon>
              </v-badge>
            </v-btn>
        </template>
        <v-card class="cartContainer d-flex flex-column">
          <v-card class="d-flex justify-end" elevation="0">
            <v-btn icon color="theme" @click="dialog=false">
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </v-card>
            <v-card-title class="text-h5 text-uppercase">
                Koszyk
            </v-card-title>
            <v-card-text class="d-flex my-4 text-uppercase justify-center" v-if="!cartProducts.length">koszyk jest pusty</v-card-text>
            <v-list>
                <v-list-item class="my-1" v-for="product in cartProducts" :key="product.id" :class="{ 'transition': deletedItem === product.id }">
                 <v-img contain max-width="80" fill-height :src="product.image"></v-img>
                    <v-list-item-content>
                        <v-list-item-title class="mx-2 text-uppercase dark-grey--text">{{product.name}}</v-list-item-title>
                        <v-list-item-subtitle class="mx-2">{{product.size}}</v-list-item-subtitle> 
                        <v-list-item-subtitle class="mx-2">{{product.price + "zł"}}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-card class="d-flex flex-column align-center" elevation="0">
                          <v-btn icon color="success" @click="addProduct({product, size: product.size})"><v-icon>mdi-plus</v-icon></v-btn>
                        {{product.quantity}}
                        <v-btn icon  color="error" @click="removeProduct({product, size: product.size})">
                        <v-icon>mdi-minus</v-icon></v-btn>  
                        </v-card>
                </v-list-item>
            </v-list>
            <v-spacer/>
            <v-card class="d-flex justify-end" elevation="0">
              <h3 class="ma-4">{{"Suma: " + totalPrice + "zł"}}</h3>  
            </v-card>
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
    }
  },

  computed: {
    ...mapGetters('cart', {
      cartProducts: 'cartProducts',
      totalPrice: 'totalPrice',
      totalQuantity: 'totalQuantity'
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
    ...mapActions('cart', {
      removeProduct: 'removeProduct', 
      addProduct: 'addProduct'
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