<template>
  <div style="margin: 1em; display: flex; align-items: center; flex-direction: column; min-height: 84.5vh; ">
    <h1>{{ competence.name }}</h1>
    <div class="card" style="width: 50vw;">
      <div style="margin: 1em">
        <label class="form-label">Description</label>
        <input v-model="competence.description" disabled class="form-control bg-light" />
      </div>
      <div style="margin: 1em; display: flex; justify-content: space-between;">
        <div v-if="competence.category" style="width: 30%">
          <label class="form-label">Category</label>
          <input v-model="competence.category.name" disabled class="form-control bg-light" />
        </div>
        <div v-if="competence.difficulty" style="width: 30%">
          <label class="form-label">Difficulty</label>
          <input v-model="competence.difficulty.name" disabled class="form-control bg-light" />
        </div>
        <div style="width: 30%">
          <label class="form-label">Status</label>
          <v-select :options="status" label="name" v-model="user_competence.status"></v-select>
        </div>
      </div>
      <hr />
      <div style="margin: 1em; margin-top: 0;">
        <label class="form-label">Ressources</label>
        <div v-for="resource in competence.resources" :key="resource.id"
          style="display: flex; justify-content: space-between; margin: 0.5em 0 0.5em 0.5em">
          <a :href="resource.url" target="_blank" style="width: 90%;">
            <input :id="resource.id" :value="resource.url" class="form-control bg-light" disabled />
          </a>

          <button :id="'btn' + resource.id" @click="copyToClipboard(resource.id)"
            class="btn btn-outline-dark">Copy</button>
        </div>
        <div v-if="user_competence.new">
          <button @click="addCompetenceStatus(user_competence)" class="btn btn-outline-success" style="width: 90%; margin: 1% 5% 1% 5%;">Save</button>
        </div>
        <div v-if="!user_competence.new">
          <button @click="updateCompetenceStatus(user_competence)" class="btn btn-outline-dark" style="width: 90%; margin: 1% 5% 1% 5%;">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompetenceService from "@/services/competence.service";
import StatusService from "@/services/status.service";
import UserCompetenceService from "@/services/user_competences.service";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  name: "Competence",
  data() {
    return {
      user_competence: [],
      status: [],
      competence: [],
    };
  },
  mounted() {
    CompetenceService.getCompetenceById(this.$route.params.id).then(
      (response) => {
        this.competence = response.data;
        this.setLocalUserCompetence(response.data);
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
    StatusService.getAll().then(
      (response) => {
        this.status = response.data;
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
  methods: {
    updateCompetenceStatus(userCompetence) {
      UserCompetenceService.updateStatus(userCompetence).then((response) => {
        if (response.status == 200) {
          history.back();
        }
      });
    },
    addCompetenceStatus(userCompetence) {
      UserCompetenceService.addStatus(userCompetence).then((response) => {
        if (response.status == 200) {
          history.back();
        }
      });
    },
    setLocalUserCompetence(competence) {
      var local = competence.user_competences;
      if (local.length > 0) {
        for (let i = 0; i < local.length; i++) {
          const element = local[i];
          if (element.userId == this.$store.state.auth.user.id) {
            this.user_competence = element;
          }
        }
        if (this.user_competence.length == 0) {
          this.user_competence = { userId: this.$store.state.auth.user.id, competenceId: competence.id, status: { name: "" }, new: true };
        }
      } else {
        this.user_competence = { userId: this.$store.state.auth.user.id, competenceId: competence.id, status: { name: "" }, new: true }
      }
    },
    copyToClipboard(elementId) {
      var element = document.getElementById(elementId);
      navigator.clipboard.writeText(element.value);
    }
  },
};
</script>
