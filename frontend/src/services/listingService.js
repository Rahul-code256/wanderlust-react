import { apiRequest } from "./api";

export async function getListings() {
  return apiRequest("/listings");
}

export async function getListing(id) {
  return apiRequest(`/listings/${id}`);
}
