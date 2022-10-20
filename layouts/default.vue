<template>
  <v-app>
    <v-app-bar flat color="grey lighten-3" class="flex-grow-0">
      <v-toolbar-title class="text-uppercase grey-darken-2--text" mx="auto">
        <span class="font-weight-light">sneaker</span>
        <span>store</span>
      </v-toolbar-title>

      <v-spacer />

      <v-text-field
        id="id"
        v-model="searchText"
        class="mt-5"
        name="name"
        label="Wyszukaj buciwo"
        color="success darken-2"
        @keyup.enter="search"
        v-if="!$vuetify.breakpoint.mobile || searching"
      />

      <v-btn icon @click="mobileSearching">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  
      <v-spacer v-show="!$vuetify.breakpoint.mobile"/>
      
      <Cart />
      <Favorites v-if="!$vuetify.breakpoint.mobile"/>
      
      <v-btn v-show="!$vuetify.breakpoint.mobile && !loggedIn" text color="grey-darken-2" @click="login">
        <span>Zaloguj</span>
      </v-btn>

      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text color="grey-darken-2"
          icon
          v-bind="attrs"
          v-on="on"
          v-show='loggedIn'
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-content >
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  
    <template v-slot:extension v-if="!$vuetify.breakpoint.mobile">
        <v-tabs
          v-model="tab"
          fixed-tabs
        >
          <v-tabs-slider color="theme"></v-tabs-slider>

          <v-tab
            v-for="category in categories"
            :key="category.text"
            :to="category.route"
            router
            exact
            class="theme--text"
          >
          {{category.text}}
          </v-tab>
        </v-tabs>
      </template>
      <MobileDrawer v-if="$vuetify.breakpoint.mobile"/>
    </v-app-bar>

    <v-main>
      <v-container>
        <ItemDetails v-if="dialog" class="itemDetails" :productId="productId" />
        <NuxtChild :search="searchText" @openDialog="showDialog"/>
      </v-container>
    </v-main>

    <v-footer />
  </v-app>
</template>

<script>
import Cart from '../components/Cart.vue'
import Favorites from '../components/Favorites.vue'
import ItemDetails from '../components/ItemDetails.vue'
import MobileDrawer from '../components/MobileDrawer.vue'

export default {
    name: "DefaultLayout",
    data() {
        return {
            tab: null,
            searching: false,
            loggedIn: null,
            name: null,
            searchText: "",
            dialog: false,
            productId: null,
            categories: [
                { text: "Wszystkie buty", route: "/" },
                { text: "Lifestyle", route: "/lifestyle" },
                { text: "Bieganie", route: "/running" },
                { text: "Koszykówka", route: "/basketball" }
            ]
        }
    },
    methods: {
        showDialog(value){
            this.dialog = true
            this.productId = value
        },

        mobileSearching() {
          this.searching=!this.searching
        },

        search() {
            this.$router.push("/search");
        },

        login(){
          this.$router.push("/login")
        },

        logout(){
          this.$fire.auth.signOut().then(() => {
            this.$router.push('/')
          })
        },
    }, 

    computed: {
      isSearchEmpty() {
        if(this.searchText.length == 0) {
          return false
        } else {
          return true
        }
      }
    },

    created() {
      this.$fire.auth.onAuthStateChanged(user => {
        if(user){
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      })
    },

    components: { Cart, Favorites, ItemDetails, MobileDrawer }
}
</script>

<style>
.itemDetails {
  position: absolute;
  z-index: 1;
}
</style>