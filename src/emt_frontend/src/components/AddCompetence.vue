<template>
  <div>
    <p>{{ competence }}</p>

    <div><label>Name</label></div>
    <div>
      <input type="text" placeholder="Name" v-model="competence.name" />
    </div>

    <div><label>Description</label></div>
    <div>
      <input
        type="text"
        placeholder="Description"
        v-model="competence.description"
      />
    </div>

    <div><label>Category</label></div>
    <div>
      <v-select
        :options="categories"
        label="name"
        v-model="competence.category"
        :clearable="false"
      ></v-select>
    </div>

    <div><label>Difficulty</label></div>
    <div>
      <v-select
        :options="difficulties"
        label="name"
        v-model="competence.difficulty"
        :clearable="false"
      ></v-select>
    </div>

    <div>
      <button @click="addCompetence(competence)">Add</button>
    </div>
  </div>
</template>

<script>
import CompetenceService from "@/services/competence.service";
import CategoryService from "@/services/category.service";
import DifficultyService from "@/services/difficulty.service";
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
  },
};
</script>
