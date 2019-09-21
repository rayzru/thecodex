export default (response) => ({
  page: response.page,
  perPage: response.results_per_page,
  totalPages: response.total_pages,
  size: response.results_size,
  totalSize: response.total_results_size,
});
