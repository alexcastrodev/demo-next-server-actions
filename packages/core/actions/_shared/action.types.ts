export interface ActionByIdParams {
  id: number;
}

export interface PaginationParams {
  page?: number;
}

export interface PerPageParams {
  per_page?: number;
}

export interface SortParams {
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

export interface DeviceFilterParams {
  device_id?: string;
}

export interface DeviceByIdParams {
  deviceId: string;
}

export interface GraphqlPaginationParams {
  page?: number;
  perPage?: number;
}
