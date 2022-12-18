<template>
  <div>
    <div><label>Name</label></div>
    <div>
      <p>{{ competence.name }}</p>
    </div>

    <div><label>Description</label></div>
    <div>
      <p>{{ competence.description }}</p>
    </div>

    <div><label>Category</label></div>
    <div v-if="competence.category">
      <p>{{ competence.category.name }}</p>
    </div>

    <div><label>Difficulty</label></div>
    <div v-if="competence.difficulty">
      <p>{{ competence.difficulty.name }}</p>
    </div>

    <div><label>Ressources</label></div>
    <div v-for="resource in competence.resources" :key="resource.id">
      <a :href="resource.url">{{ resource.url }}</a>
    </div>

    <div><label>Status</label></div>
    <div v-if="competence">
                  <v-select
            :options="status"
            label="name"
            v-model="user_competence.status"
          ></v-select>
          <div v-if="user_competence.new">
            <button @click="addCompetenceStatus(user_competence)">Add</button>
          </div>
          <div v-if="!user_competence.new">
            <button @click="updateCompetenceStatus(user_competence)">Save</button>
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
  name: "EditCompetence",
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
    updateCompetenceStatus(userCompetence){
      UserCompetenceService.updateStatus(userCompetence).then((response) => {
        if (response.status == 200) {
            history.back();
          }
      });
    },
    addCompetenceStatus(userCompetence){
      UserCompetenceService.addStatus(userCompetence).then((response) => {
        if (response.status == 200) {
            history.back();
          }
      });
    },
    setLocalUserCompetence(competence){
      var local = competence.user_competences;
      if(local.length > 0){
        for (let i = 0; i < local.length; i++) {
          const element = local[i];
          if(element.userId == this.$store.state.auth.user.id){
            this.user_competence = element;
          }
        }
      }else{
        this.user_competence = {userId: this.$store.state.auth.user.id, competenceId: competence.id, status: {name: ""}, new: true}
      }
    }
  },
};
</script>
