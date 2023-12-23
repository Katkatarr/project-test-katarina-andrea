// Fungsi untuk mengambil data dari API
const fetchData = async (pageNumber, pageSize, sortOption) => {
  const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortOption}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fungsi untuk merender data ke halaman HTML
const renderData = (data) => {
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";

  data.forEach((item) => {
    const smallImage = item.small_image[0];
    const formattedDate = formatDate(item.created_at);
    const card = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${smallImage.url}" class="card-img-top" alt="Small Image">
                    <div class="card-body">
                        <p class="card-text">${formattedDate}</p>
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                </div>
            </div>
        `;
    dataContainer.innerHTML += card;
  });
};

// Fungsi untuk menampilkan informasi jumlah data yang ditampilkan
const updateShowingInfo = (meta, pageSize) => {
  const from = meta.from;
  const to = meta.to;
  const total = meta.total;
  const showingInfo = `Showing ${from} - ${to} of ${total}`;
  //const pageSizeInfo = ` (Page Size: ${pageSize})`;
  document.getElementById("showing-info").textContent = showingInfo;
};

// Fungsi untuk mengekstrak nomor halaman dari URL
const renderPagination = (meta, pageSize, currentSortOption) => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  updateShowingInfo(meta, pageSize);

  meta.links.forEach((link) => {
    if (link.label !== "Next" && link.label !== "Previous") {
      const li = document.createElement("li");
      li.classList.add("page-item");

      const a = document.createElement("a");
      a.classList.add("page-link");
      a.href = link.url;

      a.innerHTML = link.label;

      if (link.active) {
        li.classList.add("active");
      }

      a.addEventListener("click", (event) => {
        event.preventDefault();
        const pageNumber = extractPageNumber(link.url);
        const sortOption = sortDropdown.value;
        const pageSize = pageSizeDropdown.value;
        fetchDataAndRender(pageNumber, pageSize, sortOption);
      });

      li.appendChild(a);
      paginationContainer.appendChild(li);
    }
  });
};

// Fungsi untuk mengekstrak nomor halaman dari URL
const extractPageNumber = (url) => {
  const match = url.match(/page%5Bnumber%5D=(\d+)/);
  return match ? match[1] : null;
};

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString("id-ID", options);
  return formattedDate;
};

// Fungsi untuk menyimpan opsi pengurutan saat ini ke penyimpanan lokal
const saveSortOptionToLocalStorage = (sortOption) => {
  localStorage.setItem("currentSortOption", sortOption);
};

// Fungsi untuk mengambil pengurutan saat ini dari penyimpanan lokal
const getSortOptionFromLocalStorage = () => {
  return localStorage.getItem("currentSortOption");
};

// Fungsi untuk menyimpan ukuran halaman saat ini ke penyimpanan lokal
const savePageSizeToLocalStorage = (pageSize) => {
  localStorage.setItem("currentPageSize", pageSize);
};

// Fungsi untuk mendapatkan ukuran halaman saat ini dari penyimpanan lokal
const getPageSizeFromLocalStorage = () => {
  return localStorage.getItem("currentPageSize");
};

// Fungsi untuk mengambil dan merender data untuk halaman tertentu
const fetchDataAndRender = async (pageNumber, pageSize, sortOption) => {
  if (pageNumber !== null) {
    const data = await fetchData(pageNumber, pageSize, sortOption);
    renderData(data.data);
    renderPagination(data.meta, pageSize, sortOption);
    saveSortOptionToLocalStorage(sortOption);
    savePageSizeToLocalStorage(pageSize);
  }
};

const handleSortChange = () => {
  const pageNumber = getCurrentPageFromLocalStorage() || 1;
  const sortOption = sortDropdown.value;
  const pageSize = pageSizeDropdown.value;
  fetchDataAndRender(pageNumber, pageSize, sortOption);
};

// Fungsi untuk menangani perubahan ukuran halaman
const handlePageSizeChange = () => {
  const pageNumber = 1;
  const sortOption = sortDropdown.value;
  const pageSize = pageSizeDropdown.value;
  fetchDataAndRender(pageNumber, pageSize, sortOption);
};

// Fungsi untuk mengambil ukuran halaman
const getCurrentPageFromLocalStorage = () => {
  return localStorage.getItem("currentPage");
};

// Initial data load
(async () => {
  const lastSavedSortOption = getSortOptionFromLocalStorage();
  const lastSavedPageSize = getPageSizeFromLocalStorage();
  const initialSortOption = lastSavedSortOption || "-published_at";
  const initialPageSize = lastSavedPageSize || 10;
  const initialData = await fetchData(1, initialPageSize, initialSortOption);
  renderData(initialData.data);
  renderPagination(initialData.meta, initialPageSize, initialSortOption);
})();
