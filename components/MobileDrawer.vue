<template>
    <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
          <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="grey-darken-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
          </template>
          <v-card class="cartContainer">
            <v-card class="d-flex justify-end" elevation="0">
                <v-btn icon color="success" @click="dialog=false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>    
            </v-card>
            <v-card elevation="0">
                <v-list dense nav class="d-flex flex-column align-center">
                    <v-list-item class="my-1 text-uppercase" height="50" v-for="category in categories" :key="category.text" :to="category.route" router exact @click="dialog=false">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{category.text}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>   
            </v-card>
            <v-card class="d-flex justify-center" elevation="0">
                <v-btn @click="login" color="theme" class="white--text">
                    Zaloguj
                </v-btn>
            </v-card>
            
          </v-card>
      </v-dialog>
</template>
  
<script>
export default {
    name: 'MobileDrawer',
    data () {
        return {
        dialog: false,
        categories: [
                { text: "Wszystkie buty", route: "/" },
                { text: "Lifestyle", route: "/lifestyle" },
                { text: "Bieganie", route: "/running" },
                { text: "Koszykówka", route: "/basketball" },
            ]
        }
    },

    methods: {
        login(){ 
            this.$router.push("/login")
        },
    }
  
}
</script>
  