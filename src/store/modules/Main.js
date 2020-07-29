export default {
  state: {
    navigation: [
      {
        name: "Browser",
        icon: "fas fa-globe-europe",
        view: "browser",
      },
      {
        name: "Meetings",
        icon: "fas fa-comments",
        view: "meetings",
      },
      {
        name: "Filebrowser",
        icon: "fas fa-file",
        view: "filebrowser",
      },
    ],
  },
  getters: {
    navigation: state => state.navigation
  }
}
