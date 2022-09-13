<template>
  <div v-if="toggleIsManagments && !degrees" class="__organization">
    <div
      class="__organization_top"
      v-for="(value, index) of managment"
      :key="index"
    >
      <div class="__organization_top" v-if="value.centreName !== ''">
        <div
          class="__organization_top"
          v-for="(val, inde) of value.managments"
          :key="inde"
        >
          <div class="__organization_inner_inner" v-if="val.managmentName">
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
              <span class="__organization_city_name">
                {{ val.managmentName }}
              </span>
            </div>
            <p class="__p1">{{ val.totalCount ? val.totalCount : 0 }}</p>
            <p class="__p2">{{ val.currentCount ? val.currentCount : 0 }}</p>
            <div class="__organization_to_do">
              <img
                @click="showCentre"
                src="../../assets/Icons/blue_icon_change.webp"
                alt=""
              />
              <img
                @click="deleteItem(val.managmentName, val.id)"
                src="../../assets/Icons/blue_icon_delete.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-for="(value, index) of managment" :key="index">
    <PartOfMan
      :part="value"
      :city="city"
      :degrees="degrees"
      :mainDegrees="mainDegrees"
      :managmentDegrees="isDegrees"
    />
  </div>
  <div v-if="isCentre" class="__organization_shadow_block">
    <div class="__organization_type_block">
      <p class="__organization_hide_icon" @click="hideCentre">&times;</p>
      <input
        type="text"
        @change="typePartName($event)"
        placeholder="Отделение"
      />
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
      <button class="_add_organization_city" @click="addCityManagment">
        Добавить
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import PartOfMan from "./PartOfMan.vue";
export default {
  name: "managment-app",
  data() {
    return {
      isDegrees: true,
      isCentre: false,
      partName: "",
      totalCount: 0,
      currentCount: 0,
    };
  },
  props: {
    managment: Object,
    degrees: Boolean,
    mainDegrees: Boolean,
    city: Object,
  },
  computed: {
    ...mapGetters(["toggleIsManagments", "toggleDeleteCityItems"]),
  },
  methods: {
    ...mapActions(["addPart", "deleteManagment"]),
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
    typePartName(event) {
      this.partName = event.target.value;
    },
    typeTotalCount(event) {
      this.totalCount = event.target.value;
    },
    typeCurrentCount(event) {
      this.currentCount = event.target.value;
    },
    addCityManagment() {
      let partData = {
        partName: this.partName,
        id: this.managment[0].id,
        totalCount: this.totalCount,
        currentCount: this.currentCount,
      };
      this.addPart(partData);
      this.isCentre = false;
    },
    deleteItem(name, id) {
      let deleteData = {
        id: id,
        managmentName: name,
        cityName: this.city.cityName,
      };
      this.deleteManagment(deleteData);
    },
  },
  components: { PartOfMan },
};
</script>

<style scoped>
.__organization {
  width: 100%;
  background-color: rgba(110, 110, 187, 0.322);
}
.__organization_inner_items {
  display: flex;
}
.__organization_inner_inner {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  margin: 2px 0 1px 65px;
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
.__p1 {
  margin-right: 145px;
  font-size: 20px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.__p2 {
  margin-right: 144px;
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
