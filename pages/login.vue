<template>
    <v-app>
         <v-card class="d-flex justify-center mt-10" elevation="0">
            <v-card width="300px" elevation="0">
                <div class="text-center mb-10">
                    <div class="text-md-h4 grey-darken-2--text font-weight-light">Zaloguj się do 
                        <span class="text-uppercase">sneaker</span>
                        <span class="text-uppercase font-weight-regular">store</span>
                    </div>
                </div>
                <v-form v-model="valid" ref="form">
                    <v-text-field 
                    color="success" 
                    label="Adres e-mail"
                    type="e-mail"
                    v-model="email"
                    :rules="[rules.required]">
                    </v-text-field>

                    <v-text-field 
                    color="success" 
                    type='password' 
                    label="Hasło"
                    v-model="password"
                    :rules="[rules.required]">
                    </v-text-field>
                    
                    <v-btn class="my-3 white--text warning" to="/register">Zarejestruj się</v-btn>
                    <v-btn class="my-3 darken-2 white--text success" :disabled="!valid" @click="validate">Zaloguj</v-btn>
                    <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
                </v-form>
                
            </v-card>
        </v-card>
    </v-app>
</template>

<script>
export default {
    layout: 'empty',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            rules: {
                required: value => !!value || 'Pole wymagane.'
            },
            valid: false,
            loading: false
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            this.loading = true
            this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$nuxt.$emit('loggedIn'),
                this.$router.push('/')
            }).catch((error) => {
                console.log(error)
            }).finally(() => this.loading = false)
        }
    },
}
</script>