<template>
  <div class="task">{{ taskData.description }}</div>
</template>
<script>
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>