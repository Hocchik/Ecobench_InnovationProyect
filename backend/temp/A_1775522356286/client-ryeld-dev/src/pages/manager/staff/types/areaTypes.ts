// Area types - matches backend AreaResponse
export interface Area {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateAreaRequest {
  name: string;
  description?: string;
}

export interface UpdateAreaRequest {
  name: string;
  description?: string;
}

export interface AreaTableRow {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
