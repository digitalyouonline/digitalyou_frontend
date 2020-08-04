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
    serviceUrls: null,
  },
  getters: {
    navigation: (state) => state.navigation,
    serviceUrls: (state) => state.serviceUrls
  },
  actions: {
    setServiceURLs: (context, urls) => {
      context.state.serviceUrls = urls;
    },
  },
};
