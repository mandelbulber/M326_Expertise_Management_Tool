<template>
  <div>
    <header>
      <h3>{{ content }}</h3>
      
      <p> {{users}} </p>
    </header>
    <div>
      <p>User</p>
      <v-select
        :options="users"
        label="email"
        v-model="selectResult"
        :clearable="false"
      ></v-select>
      <!-- https://vue-select.org/guide/values.html#getting-and-setting -->
      <p v-if="selectResult != ''">Add</p>
      <div v-if="competences.length > 0">
        <table v-for="competence in competences" :key="competence.id">
          <thead>
            <th>{{ competence.name }}</th>
            <th>
              <router-link
                :to="{ name: 'edit', params: { id: competence.id } }"
              >
                Edit
              </router-link>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>{{ competence.description }}</td>
            </tr>
            <tr>
              <td>{{ competence.user_competences.user.email }}</td>
            </tr>
            <tr>
              <td>{{ competence.user_competences.status.name }}</td>
            </tr>
            <tr>
              <td>{{ competence.category.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CompetenceService from "@/services/competence.service";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  name: "Admin",
  data() {
    return {
      content: "",
      selectResult: "",
      users: [],
      competences: [],
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    UserService.getAllUsers().then(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
  },
  watch: {
    selectResult(newResult, oldResult) {
      if (newResult != "" && newResult != null) {
        CompetenceService.getAllCompetencesByUserId(this.selectResult.id).then(
          (response) => {
            this.competences = response.data;
          },
          (error) => {
            console.log(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            );
          }
        );
      }
    },
  },
};
</script>
