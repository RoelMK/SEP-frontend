<template>
    <div class="main">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="6" lg="6" align="center">
                    <v-form>
                        <h2>Welcome to Diabetter!</h2>
                        <br><br>
                        <v-text-field
                            class="customField"
                            label="Email"
                            prepend-inner-icon="mdi-account"
                        ></v-text-field>
                        <v-text-field
                            class="customField"
                            label="Password"
                            prepend-inner-icon="mdi-lock"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            v-model="password"
                            @click:append="showPass = !showPass"
                        ></v-text-field>
                        <v-btn v-on:click="loginClicked" class="login-button">Log in</v-btn>
                    </v-form>
                    <br><br>
                    <a class='register' href="https://app.gamebus.eu/auth/signup" target=”_blank”>
                        Don't have an account? Register here
                    </a>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <img src="../assets/DiabetterLogo.png" class="image-fit ml-16">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {
            showPass: false
        };
    },
    methods: {
        loginClicked: function () {
            this.$toasted.show('Login Clicked');
        }
    }
};
</script>

<style>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.customField {
  width: 80%
}
.login-button {
    color:white;
    background-color:#1B98E0;
}
.image-fit{
  height: 80%;
  width: 80%;
  object-fit: cover;
}
.register {
  font-size: 13px;
}
</style>
