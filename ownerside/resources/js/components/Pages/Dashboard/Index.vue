<template>
    <div>
        <div class="relative">
            I am in dashboard page.
        </div>
    </div>
</template>

<script>
export default {

  beforeRouteEnter(to, from, next) {
      if (!window.Laravel.isLoggedin) {
          window.location.href = "/login";
      }
      next();
  }
}
</script>