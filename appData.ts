const data = {
  metadata: {
    title: "Jakub Korytko",
    description:
      "Portfolio of Jakub Korytko, Software Engineer specializing in JavaScript, TypeScript, and React.",
  },
  aboutMe: [
    "Hello! My name is **Jakub Korytko**, and I live in **Krakow, Poland**. " +
      "I am a Software Engineer who specializes in **JavaScript** and **TypeScript**.",
    "I like dinosaurs, video games, and caffeine. Also programming sometimes. Scroll down if you are interested.",
  ],
  icons: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jakub-korytko/",
      icon: "/icons/linkedin.svg",
    },
    {
      name: "GitHub",
      url: "https://github.com/JakubKorytko",
      icon: "/icons/github.svg",
    },
    {
      name: "Email",
      url: "mailto:jakub@korytko.me",
      icon: "/icons/envelope.svg",
      increaseSizeValue: 6,
    },
  ],
  githubSearchURLs: {
    mergedPRs:
      "https://api.github.com/search/issues?q=type:pr+author:JakubKorytko+is:merged+is:public+-user:JakubKorytko",
    totalCommits: "https://api.github.com/search/commits?q=author:JakubKorytko",
  },
  firstJobDate: new Date("2024-03-01"),
  firstDevJobDate: new Date("2025-02-01"),
  adoptedCats: 5,
  stats: {
    headers: {
      mergedPRs: "Open Source PR's merged",
      totalCommits: "Commits pushed",
      commercialExperience: "Commercial experience",
      adoptedCats: "Adopted cats",
    },
  },
  baseIconSize: 25,
  baseMobileIconSize: 40,
};

export default data;
