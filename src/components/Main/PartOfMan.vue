<template>
  <div
    v-if="toggleIsParts && !degrees && !managmentDegrees"
    class="organization"
  >
    <div v-for="(value, index) of part.managments" :key="index">
      <div>
        <div v-for="(val, inde) of value.parts" :key="inde">
          <div class="__organization_inner_inner" v-if="val.partName">
            <div class="__organization_inner_items">
              <span class="__organization_city_name">{{ val.partName }}</span>
            </div>
            <p class="__p1">{{ val.totalCount ? val.totalCount : 0 }}</p>
            <p class="__p2">{{ val.currentCount ? val.currentCount : 0 }}</p>
            <div class="__organization_to_do">
              <img
                @click="deleteItem(val.partName, val.id)"
                src="../../assets/Icons/blue_icon_delete.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "part-of-man-app",
  data() {
    return {
      isDegrees: true,
      isCentre: false,
    };
  },
  props: {
    part: Object,
    degrees: Boolean,
    city: Object,
    managmentDegrees: Boolean,
  },
  computed: {
    ...mapGetters(["toggleIsParts", "toggleDeleteCityItems"]),
    newPart() {
      return this.part.managments.forEach((elem) => {
        const partNames = elem.parts.map((o) => o.partName);
        const filtered = elem.parts.filter(
          ({ partName }, index) => !partNames.includes(partName, index + 1)
        );
        return filtered;
      });
    },
  },
  methods: {
    ...mapActions(["deletePart"]),
    hideCentre() {
      this.isCentre = false;
    },
    deleteItem(name, id) {
      let deleteData = {
        id: id,
        partName: name,
        cityName: this.city.cityName,
      };
      this.deletePart(deleteData);
    },
  },
};
</script>

<style scoped>
.organization {
  width: 100%;
  background-color: rgba(64, 64, 230, 0.445);
}
.__organization_inner_items {
  display: flex;
}
.__organization_inner_inner {
  padding: 11px 0;
  display: flex;
  justify-content: space-between;
  margin: -1px 0 1px 122px;
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
  margin-left: -171px;
  font-size: 20px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.__p2 {
  margin-right: 38px;
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
