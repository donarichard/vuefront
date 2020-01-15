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
                <v-toolbar-title>Forget</v-toolbar-title>
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
                  <h4>{{mobileverify}}</h4>
                  <v-text-field
                    id="mobile"
                    label="Mobile"
                    name="mobile"
                    prepend-icon="local_phone"
                    type="text"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    v-model="mobile"
                    maxlength="10"
                    pattern="^((\[0-9]{10})|(0[0-9]{10}))$"
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
                    v-if="verified"
                  />
                  <v-text-field
                    id="rpassword"
                    label="Retype Password"
                    name="rpassword"
                    prepend-icon="lock"
                    type="password"
                    v-model="rpassword"
                    required
                    v-if="verified"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click.prevent="update" color="primary">Update</v-btn>
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
      loginError: null,
      name: null,
      mobile: null,
      rpassword: null,
      verified: false,
      mobileverify: "",
      currentmobile: ""
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
        let jsonData = {
          email: this.email
        };

        console.log(env.ROOT_API + "login");
        const configHeaders = {
          Accept: "application/json",
          "auth-token": localStorage.getItem("token")
        };

        axios({
          url: env.ROOT_API + "user/forget",
          method: "post",
          data: jsonData,
          headers: configHeaders
        }).then(response => {
          console.log(response);
          if (response.data.error) {
            this.loginError = response.data.error;
            this.mobileverify = "";
            this.currentmobile = "";
          }
          if (response.data.phone) {
            this.mobileverify = response.data.phone;
            this.currentmobile = response.data.currentmobile;
          }
        });
      } else if (mail === "") {
        this.localStorage = "";
        this.mobileverify = "";
           this.verified = false;
        this.emailRules = [];
      }
    },
    mobile: function(mobile) {
      if (this.mobile.length == 0) {
        this.verified = false;
      }
      if (this.currentmobile == mobile) {
        this.verified = true;
      } else {
        this.verified = false;
      }
    },
    password: function(password) {
      if (password != this.rpassword) {
        return (this.loginError = "Password does not match");
      } else {
        return (this.localStorage = "");
      }
    },
    rpassword: function(rpassword) {
      if (rpassword == this.password) {
        return (this.loginError = "");
      } else {
        return (this.loginError = "Password does not match");
      }
    }
  },

  methods: {
    login() {
      route.push({
        name: "login"
      });
    },
    update() {
      console.log(env.ROOT_API + "login");
      const configHeaders = {
        Accept: "application/json",
        "auth-token": localStorage.getItem("token")
      };

      let jsonData = {
        password: this.password,
        mobile: this.mobile
      };

      if (this.password == this.rpassword) {
        axios({
          url: env.ROOT_API + "user/forget/rest",
          method: "post",
          data: jsonData,
          headers: configHeaders
        }).then(response => {
          console.log(response);
          if (response.data.error)
            return (this.loginError = response.data.error);
          if (response.data.success) {
            route.push({
              name: "login"
            });
          }
        });
      }
    }
  },
  mounted() {
    console.log(env.ROOT_API);
  }
};
</script>
