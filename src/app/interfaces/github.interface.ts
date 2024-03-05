export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

export interface GithubUserSearchResult {
  incomplete_results: boolean;
  items: GithubUser[];
  total_count: number;
}
