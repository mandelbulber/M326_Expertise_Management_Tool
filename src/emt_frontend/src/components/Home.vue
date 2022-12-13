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
          <th>X</th>
          <th>Y</th>
          <th>Z</th>
        </tr>
      </thead>
      <tbody>
        <table v-for="competence in competences" :key="competence.id">
          <thead>
            <th>{{ competence.name }}</th>
          </thead>
          <tbody>
            <tr>
              <td>{{ competence.description }}</td>
            </tr>
            <tr>
              <td>{{ competence.user.email }}</td>
            </tr>
            <tr>
              <td>{{ competence.status.name }}</td>
            </tr>
            <tr>
              <td>{{ competence.competence_category.name }}</td>
            </tr>
          </tbody>
        </table>
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
      competences: [],
    };
  },
  mounted() {
    UserService.getHomeContent().then(
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
          this.$router.push("/login");
        }
      }
    );
    CompetenceService.getAllCompetences().then((response) => {
      this.competences = response.data;
    });
  },
};
</script>
