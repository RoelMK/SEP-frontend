<template>
    <div class="main">
        <v-container fill-height fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="12" md="6" lg="6" align="center" v-if="!enteredEmail">
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
                    <a class='register' href="https://app3.gamebus.eu/auth/signup" target=”_blank”>
                        Don't have an account? Register here
                    </a>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" align="center" v-else>
                    <h2>Welcome to Diabetter!</h2>
                    <p>Please click the connect button on the GameBus website.</p>
                    <v-btn @click="confirmLogin" color="primary" class="login-button">Done</v-btn>
                    <v-btn @click="cancel()" color="secondary ml-2" class="login-button">Cancel</v-btn>
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
import Auth from "@/repositories/Auth.js";

export default {
    name: "Login",
    data () {
        return {
            email: "",
            enteredEmail: false,
        };
    },
    methods: {
        /**
         * Handle login button click, in user with the provided email exists in gamebus
         * redirect to the gamebus platform to link data provider with diabetter
         * @return { void }
         */
        async loginClicked() {
            Auth.login({ email: this.email })
                .then(
                    (resp) => {
                        this.$cookies.set("LOGIN_TOKEN",
                            resp.data.loginToken, resp.data.expires);
                        window.open('https://app3.gamebus.eu/nav/settings/data', '_blank').focus();
                        this.enteredEmail = true;
                    },
                    (error) => {
                        this.$toaster.showMessage({
                            message: 'Something went wrong: '
                            + error.response.status,
                            color: 'dark',
                            btnColor: 'pink',
                        });
                    });

        },
        /**
         * Check whether gamebus was linked with diabetter and set upon
         * success set JWT to get access to the dashboard
         * @return { void }
         */
        async confirmLogin() {
            Auth.login({ loginToken: this.$cookies.get("LOGIN_TOKEN") })
                .then(
                    (resp) => {
                        this.$cookies.set("JWT", resp.data.newJwt, '30d');
                        this.$router.push("/");
                        Auth.uploadToken({
                            email: this.email,
                            token: resp.data.newJwt
                        })
                            .then(
                                () => {},
                                (err) => { console.log(err); }
                            );
                    },
                    () => {
                        this.$toaster.showMessage({
                            message: 'Something went wrong, try again later!',
                            color: 'dark',
                            btnColor: 'pink',
                        });
                    });

        },
        /**
         * Handle cancel button click
         * @return { void }
         */
        cancel() {
            this.enteredEmail = false;
            this.$cookies.remove("LOGIN_TOKEN");
        }
    }
};
</script>

<style>
.main {
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
