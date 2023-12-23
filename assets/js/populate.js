const populateSortDropdown = () => {
  const sortDropdown = document.getElementById("sortDropdown");
  sortDropdown.innerHTML = "";

  const sortOptions = ["-published_at", "published_at"];
  sortOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option === "-published_at" ? "Newest" : "Oldest";
    sortDropdown.appendChild(optionElement);
  });

  const savedSortOption = getSortOptionFromLocalStorage();
  if (savedSortOption) {
    sortDropdown.value = savedSortOption;
  }
};

// Fungsi untuk mengisi dropdown dengan opsi jumlah halaman
const populatePageSizeDropdown = () => {
  const pageSizeDropdown = document.getElementById("pageSizeDropdown");
  pageSizeDropdown.innerHTML = "";

  const pageSizeOptions = [10, 20, 50];
  pageSizeOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    pageSizeDropdown.appendChild(optionElement);
  });

  const savedPageSize = getPageSizeFromLocalStorage();
  if (savedPageSize) {
    pageSizeDropdown.value = savedPageSize;
  }
};

// Initial dropdown population
populateSortDropdown();
populatePageSizeDropdown();
