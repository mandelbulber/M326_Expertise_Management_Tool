<template>
  <div>
    <header>
      <h3>{{ content }}</h3>
    </header>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>Competence Name</th>
          <th>Competence Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="competence in competences" :key="competence.id">
          <td>
            {{ competence.name }}
          </td>
          <td>
            {{ competence.description }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CompetenceService from "../services/competence.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
      competences: []
    };
  },
  mounted() {
    UserService.getPublicContent().then(
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

        if (error.response.status == 403) {
          this.$router.push("/register");
        }
      }
    );
    CompetenceService.getAllCompetences().then(
      (response) => {
        this.competences = response.data;
      }
    );
  },
};
</script>
