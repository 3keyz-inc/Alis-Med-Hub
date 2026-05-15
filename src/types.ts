export interface RepoFileTree {
  path: string;
  type: 'blob' | 'tree';
}

export interface Citation {
  uri: string;
  title: string;
}

export interface D3Node {
  id: string;
  label: string;
  group: number;
}

export interface D3Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: D3Node[];
  links: D3Link[];
}

export interface DevStudioState {
  repoName: string;
  fileTree: RepoFileTree[];
  graphData: GraphData;
}

export enum ViewMode {
  REPO_ANALYZER = 'RepoAnalyzer',
  DEV_STUDIO = 'DevStudio'
}
