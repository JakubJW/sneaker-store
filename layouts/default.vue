<template>
  <v-app>
    <v-app-bar flat color="grey lighten-3" class="flex-grow-0">
      <NuxtLink to="/">
        <v-toolbar-title class="text-uppercase grey-darken-2--text" mx="auto">
          <span class="font-weight-light">sneaker</span>
          <span>store</span>
        </v-toolbar-title>
      </NuxtLink>

      <v-spacer />

        <v-text-field
        v-model="searchText"
        class="mt-5"
        label="Wyszukaj buciwo"
        color="success darken-2"
        @keyup.enter="search"
        v-if="!$vuetify.breakpoint.mobile"
      />

      <v-btn icon :disabled="!$vuetify.breakpoint.mobile" @click="revealMobileInput">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  
      <v-spacer v-show="!$vuetify.breakpoint.mobile"/>
      
      <Cart />
      
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
  
    <template v-slot:extension v-if="!$vuetify.breakpoint.mobile || ($vuetify.breakpoint.mobile && mobileSearch)">
      <v-text-field
        v-model="searchPhrase"
        class="mt-5"
        label="Wyszukaj buciwo"
        color="success darken-2"
        @keyup.enter="search"
        v-if="$vuetify.breakpoint.mobile && mobileSearch"
      />
        <v-tabs fixed-tabs v-if="!$vuetify.breakpoint.mobile">
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
        <NuxtChild :search="searchPhrase"/>
      </v-container>
    </v-main>

    <v-footer>
      
    </v-footer>
  </v-app>
</template>

<script>
import Cart from '../components/Cart.vue'

import MobileDrawer from '../components/MobileDrawer.vue'

export default {
    name: "DefaultLayout",
    data() {
        return {
            mobileSearch: false,
            loggedIn: null,
            searchPhrase: "",
            categories: [
                { text: "Wszystkie buty", route: "/" },
                { text: "Lifestyle", route: "/lifestyle" },
                { text: "Bieganie", route: "/running" },
                { text: "Koszykówka", route: "/basketball" }
            ]
        }
    },
    methods: {
        revealMobileInput() {
          this.mobileSearch=!this.mobileSearch
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

    components: { Cart, MobileDrawer }
}
</script>

<style>
  .v-application a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
  }
</style>