import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";
import { Uploader } from "../modal/types";

export const uploaderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<ApiEnvelope<Uploader>, FormData>({
      query: (body) => ({
        url: "/file/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["File"],
    }),
    getFiles: builder.query<ApiEnvelope<Uploader[]>, void>({
      query: () => ({
        url: "/file/all",
        method: "GET",
      }),
      providesTags: ["File"],
    }),
    deleteFile: builder.mutation<ApiEnvelope<null>, string>({
      query: (id) => ({
        url: `/file/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["File"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = uploaderApi;
