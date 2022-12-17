<template>
  <div style="display: flex; justify-content: center;">
    <div class="card bg-dark text-light" style="width: 35vw; height: 65vh; margin: 5.59vw; border-radius: 10%;">
      <div class="card-body" style="text-align: center;">
        <img src="../assets/logo.png" style="width: 10vw;" class="d-inline-block align-text-top">
        <hr />
        <h1 class="card-title">Sign Up</h1>
        <Form @submit="handleRegister" :validation-schema="schema">
          <div style="margin: 1vw;">
            <Field name="email" type="text" class="form-control" placeholder="Email" />
            <ErrorMessage name="email" />
          </div>
          <div style="margin: 1vw;">
            <Field name="password" type="password" class="form-control" placeholder="Password" />
            <ErrorMessage name="password" />
          </div>
          <div>
            <button :disabled="loading" class="btn btn-outline-light">
              <span v-show="loading"></span>
              <span>Sign Up</span>
            </button>
          </div>
          <div>
            <div v-if="message" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
        <hr />
        <router-link to="/login" class="text-light" style="text-decoration: none;">
          Already have an account? Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
