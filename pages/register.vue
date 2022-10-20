<template>
    <v-app>
         <v-card class="d-flex justify-center mt-10" elevation="0">
            <v-card width="300px" elevation="0">
                <div class="text-center mb-10">
                    <div class="text-md-h4 grey-darken-2--text font-weight-light">Zarejestruj się w 
                        <span class="text-uppercase">sneaker</span>
                        <span class="text-uppercase font-weight-regular">store</span>
                    </div>
                </div>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                        v-model="name"
                        label="Imię"
                        type="text"
                        :rules="[rules.required]"
                    ></v-text-field>

                    <v-text-field
                        v-model="surname"
                        label="Nazwisko"
                        type="text"
                        :rules="[rules.required]"
                    ></v-text-field>
                    
                    <v-text-field 
                        color="success" 
                        label="E-mail"
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
                    <v-btn class="my-3 white--text warning" @click="validate">Zarejestruj się</v-btn>
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
            name: '',
            surname: '',
            email: '',
            password: '',
            error: '',
            rules: {
                required: value => !!value || 'Pole wymagane.'
            },
            valid: false
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
            this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password).then((data) => {
                console.log(data)
                this.$nuxt.$emit('loggedIn')
                this.$router.push('/')
            }).catch((error) => {
                console.log(error)
            })
        }
    },
}
</script>