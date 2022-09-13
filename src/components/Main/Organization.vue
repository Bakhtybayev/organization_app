<template>
  <div v-if="!toggleIsFetching && city.cityName">
    <div class="__organization">
      <div class="__organization_inner_items">
        <div
          v-if="isDegrees"
          class="__organization_stright_item"
          @click="changeDegrees()"
        >
          &gt;
        </div>
        <div
          v-if="!isDegrees"
          class="__organization_down_item"
          @click="changeDegreesToStright()"
        >
          &gt;
        </div>
        <span class="__organization_city_name">{{ city.cityName }}</span>
      </div>
      <p>
        {{
          city.totalCountOfAllOrganizations
            ? city.totalCountOfAllOrganizations
            : 0
        }}
      </p>
      <p>
        {{
          city.currentCountOfAllOrganizations
            ? city.currentCountOfAllOrganizations
            : 0
        }}
      </p>
      <div class="__organization_to_do">
        <img
          @click="showCentre"
          src="../../assets/Icons/blue_icon_change.webp"
          alt=""
        />
        <img
          @click="deleteItem"
          src="../../assets/Icons/blue_icon_delete.webp"
          alt=""
        />
      </div>
    </div>
    <div v-for="(value, index) of Object.entries(city)" :key="index">
      <Centre :centre="value" :cityName="city" :degrees="isDegrees" />
    </div>
  </div>
  <div v-if="isCentre" class="__organization_shadow_block">
    <div class="__organization_type_block">
      <p class="__organization_hide_icon" @click="hideCentre">&times;</p>
      <input type="text" @change="typeCentreName($event)" placeholder="Центр" />
      <input
        type="text"
        @change="typeTotalCount($event)"
        placeholder="Общее количество"
      />
      <input
        type="text"
        @change="typeCurrentCount($event)"
        placeholder="Фактическое количество"
      />
      <button class="_add_organization_city" @click="addCityCentre">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Centre from "./Centre.vue";
export default {
  name: "organization-app",
  data() {
    return {
      isDegrees: true,
      isCentre: false,
      centreName: "",
      cityName: "",
      totalCount: 0,
      currentCount: 0,
    };
  },
  props: {
    city: Object,
  },
  computed: {
    ...mapGetters(["toggleIsFetching", "getCenters"]),
  },
  methods: {
    ...mapActions(["addCity", "addCentre", "deleteCity"]),
    changeDegrees() {
      this.isDegrees = false;
    },
    changeDegreesToStright() {
      this.isDegrees = true;
    },
    showCentre() {
      this.isCentre = true;
    },
    hideCentre() {
      this.isCentre = false;
    },
    typeCentreName(event) {
      this.centreName = event.target.value;
    },
    typeTotalCount(event) {
      this.totalCount = event.target.value;
    },
    typeCurrentCount(event) {
      this.currentCount = event.target.value;
    },
    addCityCentre() {
      let centreData = {
        centreName: this.centreName,
        id: this.city.id,
        totalCount: this.totalCount,
        currentCount: this.currentCount,
        managments: [],
      };
      this.addCentre(centreData);
      this.isCentre = false;
    },
    deleteItem() {
      let deleteData = {
        id: this.city.id,
        cityName: this.city.cityName,
      };
      this.deleteCity(deleteData);
    },
  },
  components: { Centre },
};
</script>

<style scoped>
.__organization {
  width: 100%;
  padding: 10px 0;
  margin: 1px 0;
  display: flex;
  justify-content: space-between;
}
.__organization_inner_items {
  display: flex;
}
.__organization_stright_item {
  margin: -2.3px 5px 0 8px;
  font-size: 23px;
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
}
.__organization_down_item {
  margin: 1.5px 5px 0 8px;
  font-size: 23px;
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
  transition-duration: 2s;
  transform: rotate(90deg);
}
.__organization_city_name {
  width: 150px;
  font-size: 20px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.__organization_empty_item {
  text-align: center;
  margin-top: 70px;
  font-size: 35px;
  font-weight: 700;
}
p {
  margin-right: 80px;
  font-size: 20px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
img {
  cursor: pointer;
  margin: 0 6px;
  width: 25px;
  height: 25px;
}
.__organization_to_do {
  margin: 0 95px 0 0;
}

/* Not */
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
  margin: 15px 0 0 0;
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
  margin-top: 10px;
  background-color: rgba(81, 180, 164, 0.664);
}
.__organization_hide_icon {
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
