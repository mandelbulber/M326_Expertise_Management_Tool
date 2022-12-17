<template>
  <div style="display: flex; justify-content: center;">
    <div class="card bg-dark text-light" style="width: 35%; margin: 2%; border-radius: 10%;">
      <div class="card-body" style="text-align: center;">
        <img src="../assets/logo.png" style="width: 50%;" class="d-inline-block align-text-top">
        <hr />
        <h1 class="card-title">Sign in</h1>
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class=" m-3">
            <Field name="email" type="text" class="form-control" placeholder="Email" />
            <ErrorMessage name="email" />
          </div>
          <div class=" m-3">
            <Field name="password" type="password" class="form-control" placeholder="Password" />
            <ErrorMessage name="password" />
          </div>
          <div>
            <button :disabled="loading" class="btn btn-outline-light">
              <span v-show="loading"></span>
              <span>Sign in</span>
            </button>
          </div>
          <div>
            <div v-if="message" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
        <hr />
        <router-link to="/register" class="text-light" style="text-decoration: none;">
          Don't have an account? Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
</style>
