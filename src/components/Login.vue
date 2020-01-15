<template>
  <div>
    <navigation />

    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <p class="text-danger">{{ loginError }}</p>
            
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="email"
                    type="email"
                    v-model="email"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    required
                  />
                </v-form>
              </v-card-text>
              <a v-on:click.prevent="forget" >Forget Password</a>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click.prevent="login" color="primary">Login</v-btn>
                <v-btn v-on:click.prevent="signup" color="primary">Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from "axios";
import route from "../route";
import navigation from "../components/Navigation";
import env from "./env";
export default {
  components: {
    navigation
  },

  data: function() {
    if (localStorage.getItem("token") != null) {
      route.push({
        name: "dashboard"
      });
    }
    return {
      auth_token: localStorage.getItem("token"),
      email: null,
      password: null,
      loginError: null
    };
  },
  watch: {
    email: function(mail) {
      // e_Mail is the exact name used in v-model
      if (mail !== "") {
        this.emailRules = [
          v =>
            v.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) || "Invalid Email address"
        ];
      } else if (mail === "") {
        this.emailRules = [];
      }
    }
  },

  methods: {
    login() {
      const configHeaders = {
        "content-type": "application/json",
        Accept: "application/json"
      };
      let jsonData = {
        email: this.email,
        password: this.password
      };
      console.log(env.ROOT_API + "login");
      axios({
        url: env.ROOT_API + "user/login",
        method: "post",
        data: jsonData,
        headers: configHeaders
      }).then(response => {
          localStorage.setItem("user_id",response.data.id)
        console.log(response.data.auth_token);
        if (typeof response.data.auth_token != "undefined") {
          this.loginError = "login success";
          localStorage.setItem("token", response.data.auth_token);
          if (response.data.user_type == "ADMIN001") {
            localStorage.setItem("userType", response.data.user_type);
            route.push({
              name: "admin"
            });
          } else {
            localStorage.setItem("userType", response.data.user_type);
            localStorage.setItem("user_id",response.data.id)
            route.push({
              name: "dashboard"
            });
          }
        } else {
          route.push({
            name: "login"
          });
        }
        if (response.data.error) {
          this.loginError = response.data.error;
        }
      });
    },
    signup(){
      route.push({
            name: "signup"
          });
    },
    forget(){
      route.push({
        name : "forget"
      })
    }
  },
  mounted() {
    console.log(env.ROOT_API);
  }
};
</script>
