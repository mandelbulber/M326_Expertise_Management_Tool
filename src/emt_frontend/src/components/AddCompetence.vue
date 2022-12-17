<template>
  <div style="margin: 1em; display: flex; align-items: center; flex-direction: column; min-height: 84.5vh;;">
    <h1>Add new competence</h1>
    <div class="card" style="width: 50vw;">
      <div style="margin: 1em;">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="competence.name" />
      </div>
      <div style="margin: 1em">
        <label class="form-label">Description</label>
        <input type="text" placeholder="Description" v-model="competence.description" class="form-control" />
      </div>
      <div style="margin: 1em; display: flex; justify-content: space-between;">
        <div style="width: 47%">
          <label class="form-label">Category</label>
          <v-select :options="categories" label="name" v-model="competence.category" :clearable="false"></v-select>
        </div>
        <hr />
        <div style="width: 47%">
          <label class="form-label">Difficulty</label>
          <v-select :options="difficulties" label="name" v-model="competence.difficulty" :clearable="false"></v-select>
        </div>
      </div>
      <hr />
      <div style="margin: 1em; margin-top: 0;">
        <div style="display: flex; justify-content: space-between;">
          <label class="form-label">Ressources</label>
          <button @click="addResource(competence.id)" class="btn btn-outline-dark">Add Resource</button>
        </div>
        <div v-for="resource in competence.resources" :key="resource.id" style="display: flex; justify-content: space-between; margin: 0.5em 0 0.5em 0.5em">
          <input type="url" placeholder="url" v-model="resource.url" class="form-control" style="width: 90%;"/>
          <button @click="deleteResource(resource)" class="btn btn-outline-danger">Delete</button>
        </div>
        <button @click="addCompetence(competence)" class="btn btn-outline-dark" style="width: 90%; margin: 1% 5% 1% 5%;">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import CompetenceService from "@/services/competence.service";
import CategoryService from "@/services/category.service";
import DifficultyService from "@/services/difficulty.service";
import ResourceService from "@/services/resource.service";

import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  name: "AddCompetence",
  data() {
    return {
      difficulties: [],
      categories: [],
      competence: {},
    };
  },
  mounted() {
    CategoryService.getAll().then(
      (response) => {
        this.categories = response.data;
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
    DifficultyService.getAll().then(
      (response) => {
        this.difficulties = response.data;
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
    addCompetence(data) {
      try {
        CompetenceService.addCompetence(data).then((response) => {
          if (response.status == 200) {
            history.back();
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    addResource(id) {
      if(!this.competence.resources){
        this.competence.resources = [];
      }
      this.competence.resources.push({ url: "", competenceId: id });
    },
    deleteResource(resource) {
      if (resource.id) {
        ResourceService.deleteById(resource.id).then((res) => {
          console.log(res);
          if (this.competence.resources.indexOf(resource) > -1) {
            this.competence.resources.splice(this.competence.resources.indexOf(resource),1);
          }
        });
      } else {
        const index = this.competence.resources.indexOf(resource);
        if (index > -1) {
          this.competence.resources.splice(index, 1);
        }
      }
    },
  },
};
</script>
