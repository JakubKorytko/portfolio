import appData from "@/appData.ts";
import { useEffect, useState } from "react";

const fetchGitHubStats = async () => {
  try {
    const [mergedPRsResponse, totalCommitsResponse] = await Promise.all([
      fetch(appData.githubSearchURLs.mergedPRs),
      fetch(appData.githubSearchURLs.totalCommits),
    ]);

    if (!mergedPRsResponse.ok || !totalCommitsResponse.ok) {
      throw new Error("Failed to fetch GitHub stats");
    }

    const mergedPRsData = await mergedPRsResponse.json();
    const totalCommitsData = await totalCommitsResponse.json();

    return {
      mergedPRs: mergedPRsData.total_count,
      totalCommits: totalCommitsData.total_count,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { mergedPRs: 0, totalCommits: 0 };
  }
};

const useGitHubStats = () => {
  const [gitHubStats, setGitHubStats] = useState({
    mergedPRs: 0,
    totalCommits: 0,
  });

  useEffect(() => {
    fetchGitHubStats()
      .then((stats) => setGitHubStats(stats))
      .catch((error) => console.error("Error fetching GitHub stats:", error));
  }, []);

  return gitHubStats;
};

export default useGitHubStats;
