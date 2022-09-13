export default {
	actions: {
		addCity({commit, state},city) {
			let cityObjectModel = {
				cityName: city,
				id: state.id,
				totalCountOfAllOrganizations: 0,
				currentCountOfAllOrganizations: 0,
				centre: []
			}
			commit("updateCity", cityObjectModel);
			commit("updateIdNumber", 1);
			commit("updateFetching", false)
		},
		deleteCity({state},city) {
			state.cities.forEach((item) => {
				if(item.cityName === city.cityName && item.centre) {
					item.cityName = "";
					item.centre.length = 0;
				}
			})
		},
		// Mini Components
		// Centers
		addCentre({commit, state},centre) {
			state?.cities?.forEach(element => {
				if(element?.id === centre?.id) {
					element?.centre?.push(centre)
					let newAllOrganizationsTotalCount = JSON.parse(element.totalCountOfAllOrganizations);
					let newAllOrganizationsCurrentCount = JSON.parse(element.currentCountOfAllOrganizations);
					let centreTotalCount = JSON.parse(centre.totalCount);
					let centreCurrentCount = JSON.parse(centre.currentCount);
					element.totalCountOfAllOrganizations = newAllOrganizationsTotalCount + centreTotalCount;
					element.currentCountOfAllOrganizations = newAllOrganizationsCurrentCount + centreCurrentCount;
				}
			});
			commit("updateIsCentre", true)
		},
		deleteCentre({state}, centre) {
			state.cities?.forEach((item) => {
				if(item.cityName === centre.cityName) {
					item?.centre?.forEach((e) => {
						if(e?.centreName === centre.centreName && e?.managments) {
								e.centreName = "";
								e.managments.length = 0;
					}
					})
				}
			})
		},
		// Managments
		addManagment({commit, state}, managment) {
			state?.cities?.forEach(element => {
				element?.centre?.forEach(item => {
						if(item?.managments && item?.id === managment?.id) {
							item?.managments?.push(managment);
							let newAllOrganizationsTotalCount = JSON.parse(element.totalCountOfAllOrganizations);
							let newAllOrganizationsCurrentCount = JSON.parse(element.currentCountOfAllOrganizations);
							let managmentTotalCount = JSON.parse(managment.totalCount);
							let managmentCurrentCount = JSON.parse(managment.currentCount);
							element.totalCountOfAllOrganizations = newAllOrganizationsTotalCount + managmentTotalCount;
							element.currentCountOfAllOrganizations = newAllOrganizationsCurrentCount + managmentCurrentCount;
						}
				})
			});
			commit("updateIsManagment", true);
		},
		deleteManagment({state}, managment) {
			state.cities?.forEach((item) => {
				if(item.cityName === managment.cityName) {
					item?.centre?.forEach((e) => {
						e?.managments?.forEach((m) => {
							if(m?.managmentName === managment.managmentName && m?.parts) {
								m.managmentName = "";
								m.parts.length = 0;
					}
						})
					})
				}
			})
		},
		// Parts
		addPart({commit, state}, part) {
			state?.cities?.forEach(element => {
				element?.centre?.forEach(item => {
					item?.managments?.forEach(e => {
						if(e?.parts && e?.id === part?.id) {
							e?.parts?.push(part);
									let newAllOrganizationsTotalCount = JSON.parse(element.totalCountOfAllOrganizations);
									let newAllOrganizationsCurrentCount = JSON.parse(element.currentCountOfAllOrganizations);
									let partTotalCount = JSON.parse(part.totalCount);
									let partCurrentCount = JSON.parse(part.currentCount);
									element.totalCountOfAllOrganizations = newAllOrganizationsTotalCount + partTotalCount;
									element.currentCountOfAllOrganizations = newAllOrganizationsCurrentCount + partCurrentCount;
						}
					})
				})
			});

			state?.cities?.forEach(element => {
				element?.centre?.forEach(item => {
					item?.managments?.forEach(e => {
						let ids = e.parts.map(o => o.id)
						e.parts.filter(({id}, index) => !ids.includes(id, index + 1))
					})
				})
			});
			console.log('STA', state.cities)
			commit("updateIsPart", true);
		},
		deletePart({state}, part) {
			state.cities?.forEach((item) => {
				if(item.cityName === part.cityName) {
					item?.centre?.forEach((e) => {
						e?.managments?.forEach((m) => {
							m?.parts.forEach((p) => {
								if(p?.partName === part.partName) {
									p.partName = "";
						}
							})
						})
					})
				}
			})
		}
	},
	mutations: {
		updateCity(state, payload) {
			state.cities.push(payload);
		},
		updateIdNumber(state, payload) {
			state.id += payload;
		},
		updateFetching(state, payload) {
			state.isFetching = payload;
		},
		// Mini Components
		// Centres
		updateIsCentre(state, payload) {
			state.isCenters = payload;
		},
		// Managments
		updateIsManagment(state, payload) {
			state.isManagment = payload;
		},
		// Parts
		updateIsPart(state, payload) {
			state.isParts = payload;
		}
	},
	state: {
		id: 0,
		isFetching: true,
		isCenters: false,
		isManagment: false,
		isParts: false,
		deleteCityItems: false,
		cities: [],
	},
	getters: {
		getCities(state) {
			return state.cities
		},
		toggleDeleteCityItems(state) {
			return state.deleteCityItems
		},
		toggleIsFetching(state) {
			return state.isFetching
		},
		// Mini Components
		// Centres
		toggleIsCenters(state) {
			return state.isCenters
		},
		// Managments
		toggleIsManagments(state) {
			return state.isManagment
		},
		// Parts
		toggleIsParts(state) {
			return state.isParts
		},
	}
}