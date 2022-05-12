const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/register",
      "/user",
      "/user/unsf",
      "/user/current",
      "/roles",
      "/roles/user",
      "/news",
      "/user/news",
      "/wishlist",
      "/wishlist/user",
      "/featuredgames",
      "/featuredgames/games",
      "/wishlist/games",
      "/game",
      "/need",
      "/to",
      "/proxy",
    ],
    target: "http://localhost:5000",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
