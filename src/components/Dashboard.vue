<template>
  <div>
    <navigation />
    <div id="app">
      <v-app>
        <v-content>
          <v-container style="max-width: 500px">
        
          </v-container>
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
import env from "./env";
import router from "../route/index";

import axios from "axios";

import navigation from "../components/Navigation";

export default {
  components: {
    navigation
  },

  data: function() {
    return {
      slider0: 40,
      slider1: 10,
      slider2: 10,
      i: 1,
      tasks: [],
      taskData: [],
      task: null,
      status: false
    };
  },

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.status).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },

  methods: {
    create() {
      this.tasks.push({
        status: false,
        name: this.task
      });
      let jsonData = {
        name: this.task
      };
      const configHeaders = {
        Accept: "application/json",
        "auth-token": localStorage.getItem("token")
      };

      axios({
        url: env.ROOT_API + "report/create",
        method: "post",
        data: jsonData,
        headers: configHeaders
      }).then(response => {
        console.log(response);
        if (response.data) {
          this.tasks = response.data;
          console.log(response.data[0].name);
        }
      });
      this.task = null;
    },
    checkToken: function() {
      var data = localStorage.getItem("token");
      var logout = document.getElementById("#logout");
      logout.remove();
      console.log(data);
      if (data == null) {
        router.push({
          name: "login"
        });
      }
    },
    updateStatus(index) {
      console.log(index + "" + this.tasks[index].status);
      const id = localStorage.getItem("user_id");

      const configHeaders = {
        Accept: "application/json",
        "auth-token": localStorage.getItem("token")
      };

      axios({
        url:
          env.ROOT_API +
          "task/" +
          index +
          "/" +
          id +
          "/" +
          this.tasks[index].status,
        method: "patch",
        headers: configHeaders
      }).then(response => {
        console.log(response);
      });
    },
    // datasync() {
    //   const configHeaders = {
    //     Accept: "application/json",
    //     "auth-token": localStorage.getItem("token")
    //   };
    //   console.log(configHeaders);
    //   axios({
    //     url: env.ROOT_API + "report",
    //     method: "get",
    //     headers: configHeaders
    //   }).then(response => {
    //     console.log(response);
    //     if (response.data) {
    //       this.tasks = response.data;
    //       console.log(response.data[0].name);
    //     }
    //   });
    // },
    taskDataAPI() {
      const configHeaders = {
        Accept: "application/json",
        "auth-token": localStorage.getItem("token")
      };
      console.log(configHeaders);
      axios({
        url: env.ROOT_API + "user/report",
        method: "get",
        headers: configHeaders
      }).then(response => {
        if (response.data) {
          this.taskData = response.data;
        }
      });
    },
    taskApi() {
      const id = localStorage.getItem("user_id");
      console.log("user id" + id);
      const configHeaders = {
        Accept: "application/json",
        "auth-token": localStorage.getItem("token")
      };
      console.log(configHeaders);
      axios({
        url: env.ROOT_API + "task/user/" + id,
        method: "get",
        headers: configHeaders
      }).then(response => {
        if (response.data) {
          this.tasks = response.data.task;
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      router.push({
        name: "login"
      });
    }
    if (localStorage.getItem("userType") == "ADMIN001") {
      router.push({
        name: "admin"
      });
    }
    // const configHeaders = {
    //   Accept: "application/json",
    //   "auth-token": localStorage.getItem("token")
    // };

    // axios({
    //   url: env.ROOT_API + "user/report",
    //   method: "get",
    //   headers: configHeaders
    // }).then(response => {
    //   console.log(response);
    //   if (response.data) {
    //     this.tasks = response.data;
    //     console.log(response.data[0].name);
    //   }
    // });
  },
  watch: {
    tasks(newtask) {
      this.tasks = newtask;
    }
  },
  beforeMount() {
    this.taskApi();
  }
  // created() {
  //   this.tasks = setInterval(() => this.datasync(), 2000);
  // }
};
</script>
