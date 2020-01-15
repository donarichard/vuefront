<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h3>
        <span>Squashapps</span>
      </h3>
    </div>

    <v-spacer></v-spacer>
    <v-badge v-if="auth_token!=null" color="green mr-10" overlap>
      <template v-slot:badge>
        <span v-if="messages > 0">{{ messages }}</span>
      </template>
      <v-icon class="mr-10">notifications</v-icon>
    </v-badge>

    <div v-if="auth_token!=null">
      <v-icon v-on:click.prevent="logout" :elevation="hover ? 12 : 2" dark id="logout">mdi-logout</v-icon>
    </div>
  </v-app-bar>
</template>
<script>
import router from "../route/index";
export default {
  name: "Navigation",

  data: function() {
    return {
      messages: 1,
      auth_token: localStorage.getItem("token")
    };
  },
  methods: {
    logout() {
      router.push({
        name: "login"
      });
      localStorage.clear();
    }
  }
};
</script>