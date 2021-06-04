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
                            v-model="email"
                        ></v-text-field>
                        <v-btn @click="loginClicked" class="login-button">Log in</v-btn>
                    </v-form>
                    <br><br>
                    <a class='register' href="https://app.gamebus.eu/auth/signup" target=”_blank”>
                        Don't have an account? Register here
                    </a>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <img src="../assets/DiabetterLogo.png" class="image-fit">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "login",
    data () {
        return {
            showPass: false,
            email: ""
        };
    },
    methods: {
        async loginClicked() {
            // await Auth.login(this.email)
            //     .then((resp) => {
            //         console.log("responding");
            //         console.log(resp);
            //     })
            //     .catch((err) => {
            //         console.log("Throwing error");
            //         console.log(err);
            //     });
            axios.get("http://localhost:8080/login", { params: { email: this.email } })
                .then((resp) => {
                    console.log("responding");
                    console.log(resp);
                })
                .catch((err) => {
                    console.log("Throwing error");
                    console.log(err);
                });
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
