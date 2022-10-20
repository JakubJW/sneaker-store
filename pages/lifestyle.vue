<template>
  <div class="lifestyle">
    <h1 class='text-uppercase mx-10 mt-10'>Lifestyle</h1>
    <v-container class="my-5">
      <v-row>
        <v-col v-for="product in products" v-bind:key="product.id" cols="3">
          <v-hover v-slot="{ hover }">
            <v-card elevation="0" tile>
              <v-img contain max-width="300" fill-height :src="product.image">
                <v-btn right absolute icon color="grey-darken-3" class="my-3">
                  <v-icon @click="addToFavs(product.id)">mdi-cards-heart-outline</v-icon>
                </v-btn>
              </v-img>
              <v-expand-transition>
                <v-btn v-if="hover" class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal white--text success my-3 mx-3" style="height: 10%;" @click="addToCart(product.id)">
                Do koszyka
                </v-btn>
              </v-expand-transition>
              <v-card-subtitle dark class="font-weight-medium">{{ product.name }}</v-card-subtitle>
              <v-card-text>{{ product.price }}</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LifestylePage',
  computed: {
    products(){
      return this.$store.getters.productsFilter('Lifestyle')
    }
  },
  methods: {
    addToCart: function(value){
      this.$store.dispatch('addToCart', value)
      },
    
    addToFavs: function(value){
      this.$store.dispatch('addToFavs', value)
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  top: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 50%;
}</style>
