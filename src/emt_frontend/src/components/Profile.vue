<template>
  <div style="margin: 5vh; height: 77.9vh;">
    <h1>Your profile</h1>
    <hr />
    <table>
      <tr>
        <td style="width: 10vw;">
          <h4>email:</h4>
        </td>
        <td style="width: 10vw;">
          <h4>{{ currentUser.email }}</h4>
        </td>
      </tr>
      <tr>
        <td>
          <h4>your role(s):</h4>
        </td>
        <td v-for="role in currentUser.roles" :key="role">
          <h4>{{ role }}</h4>
        </td>
      </tr>
    </table>
    <hr/>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
