<template>
  <div class="__organization_block">
    <div class="__organization_header_block">
      <p></p>
      <div class="__organization_header_inner_block">
        <hr />
        <p>Общее количество</p>
      </div>
      <div class="__organization_header_inner_block">
        <hr />
        <p>Фактическое количество</p>
      </div>
      <div class="__organization_header_inner_block">
        <hr />
        <p>Действия</p>
      </div>
    </div>
    <div v-for="(city, index) of getCities" :key="index">
      <Organization :city="city" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Organization from "./Main/Organization.vue";
export default {
  name: "all-organizations",
  components: { Organization },
  computed: {
    ...mapGetters(["getCities"]),
  },
};
</script>

<style scoped>
.__organization_block {
  width: 100%;
  margin-top: 60px;
}
.__organization_header_block {
  position: relative;
  justify-content: space-around;
  width: 100%;
  display: flex;
  background-color: rgb(0, 0, 77);
  padding: 15px 0;
}
p {
  margin-left: 10px;
  color: rgba(171, 182, 182, 0.726);
  font-size: 22px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
hr {
  background-color: rgba(171, 182, 182, 0.726);
  bottom: 0;
  position: absolute;
  height: 95%;
}
.__organization_header_inner_block {
  display: flex;
}
</style>
