export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
export interface AutocompleteOption {
  id: number;
  label: string;
}

export type LogStatus = 'create' | 'edit' | 'delete';
