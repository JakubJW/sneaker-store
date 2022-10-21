<template>
  <div class="basketball">
    <h1 class='text-uppercase mx-10 mt-10'>koszykówka</h1>
    <v-container class="my-5">
      <v-row>
        <v-col v-for="product in products" v-bind:key="product.id" xs="1" md="3" class="d-flex justify-center">
          <ItemDetails :product-id="product.id" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ItemDetails from '~/components/ItemDetails.vue'
export default {
  name: 'BasketballPage',
  computed: {
    products(){
      return this.$store.getters.productsFilter('Koszykówka')
    }
  },
  components: { ItemDetails }
}
</script>