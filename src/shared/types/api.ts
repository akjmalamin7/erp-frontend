export interface ApiEnvelope<T> {
  status: "success" | "failed";
  message?: string;
  data: T;
}

export interface ListEnvelope<T> {
  status: "success" | "failed";
  message?: string;
  data: T[];
  total?: number;
  page?: number;
  pages?: number;
}
