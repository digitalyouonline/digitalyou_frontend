export default {
  state: {
    user: null,
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
    user: (state) => state.user,
    navigation: (state) => state.navigation,
    serviceUrls: (state) => state.serviceUrls
  },
  actions: {
    setUser: (context, user) => {
      context.state.user = user
    },
    setServiceURLs: (context, urls) => {
      context.state.serviceUrls = urls;
    },
  },
};
