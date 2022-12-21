<template>
  <div style="margin: 1em; display: flex; align-items: center; flex-direction: column; min-height: 84.5vh;">
    <h1>Edit category '{{ category.name }}'</h1>
    <div class="card" style="width: 50vw;">
      <div style="margin: 1em;">
        <label class="form-label">Name</label>
        <input type="text" placeholder="Category" v-model="category.name" class="form-control" />
      </div>
      <hr />
      <div style="margin: 1em; margin-top: 0;">
        <button @click="editCategory(category)" class="btn btn-outline-dark"
          style="width: 90%; margin: 1% 5% 1% 5%;">Save</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import CategoryService from "@/services/category.service";

import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  name: "EditCategory",
  data() {
    return {
      category: {},
    };
  },
  mounted() {
    CategoryService.getById(this.$route.params.id).then(
      (response) => {
        this.category = response.data;
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
    editCategory(data) {
      try {
        CategoryService.editCategory(data).then((response) => {
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
  