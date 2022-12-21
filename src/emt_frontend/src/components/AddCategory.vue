<template>
  <div style="margin: 1em; display: flex; align-items: center; flex-direction: column; min-height: 84.5vh;">
    <h1>Create category</h1>
    <div class="card" style="width: 50vw;">
      <div style="margin: 1em;">
        <label class="form-label">Name</label>
        <input type="text" placeholder="Category name" v-model="category" class="form-control" />
      </div>
      <hr />
      <div style="margin: 1em; margin-top: 0;">
        <button @click="addCategory(category)" class="btn btn-outline-dark"
          style="width: 90%; margin: 1% 5% 1% 5%;">Save</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import CategoryService from "@/services/category.service";

export default {
  name: "AddCategory",
  data() {
    return {
      category: "",
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
    addCategory(data) {
      try {
        CategoryService.addCategory(data).then((response) => {
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
  