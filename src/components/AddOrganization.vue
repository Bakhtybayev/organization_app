<template>
  <div :class="isOrganization ? `__add_organization` : `__odd_organization`">
    <div class="_add_organization_block">
      <button class="_add_organization_button" @click="showOrganization">
        <span>+</span> Добавить
      </button>
    </div>
    <div v-if="isOrganization" class="__organization_shadow_block">
      <div class="__organization_type_block">
        <p @click="hideOrganization">&times;</p>
        <input
          type="text"
          @change="typeCityName($event)"
          placeholder="Имя города"
        />
        <button class="_add_organization_city" @click="addOrganizationCity">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "add-organization",
  data() {
    return {
      isOrganization: false,
      cityNameIs: "",
    };
  },
  computed: {
    ...mapGetters(["toggleIsFetching"]),
  },
  methods: {
    ...mapActions(["addCity"]),
    showOrganization() {
      this.isOrganization = true;
    },
    hideOrganization() {
      this.isOrganization = false;
    },
    typeCityName(event) {
      this.cityNameIs = event.target.value;
    },
    addOrganizationCity() {
      this.addCity(this.cityNameIs);
      console.log(this.cityNameIs);
      this.isOrganization = false;
    },
  },
};
</script>

<style scoped>
.__add_organization {
  top: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}
.__odd_organization {
  top: 0;
  z-index: 1;
  position: absolute;
}
._add_organization_block {
  width: 100%;
  margin: 82px 0;
}
span {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 22px;
  color: rgba(128, 138, 138, 0.795);
  margin-right: 10px;
}
._add_organization_button {
  color: rgba(128, 138, 138, 0.795);
  cursor: pointer;
  width: 120px;
  border: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-radius: 10px;
  font-size: 18px;
  margin-left: 1rem;
  padding: 8px;
  background-color: rgba(209, 219, 219, 0.664);
}
.__organization_shadow_block {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(53, 56, 56, 0.637);
}
.__organization_type_block {
  position: relative;
  text-align: center;
  border-radius: 10px;
  width: 400px;
  margin: 150px auto;
  padding: 20px 15px;
  background-color: rgba(255, 255, 255, 0.733);
}
input {
  border: none;
  border-radius: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 99%;
  padding: 8px 0 8px 3px;
  margin: 15px 0 10px;
}
._add_organization_city {
  color: rgba(124, 120, 120, 0.795);
  cursor: pointer;
  width: 100px;
  border: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-radius: 10px;
  font-size: 16px;
  padding: 8px;
  background-color: rgba(81, 180, 164, 0.664);
}
p {
  top: 3px;
  right: 0;
  position: absolute;
  cursor: pointer;
  font-size: 28px;
  font-weight: 500;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  color: rgba(26, 31, 31, 0.795);
  margin-right: 10px;
}
</style>
