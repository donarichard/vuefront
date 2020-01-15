<template>
  <v-app>
    <v-container>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import router from "./route";
export default {
  name: "App",

  data: function() {
    return {
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
