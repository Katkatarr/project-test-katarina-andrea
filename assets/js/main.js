import "./header.js"; // Assuming the header styles are in a separate file

document.addEventListener("scroll", () => {
  const header = document.querySelector("#header");

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active state menu
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("#navbar ul li a");

  links.forEach((link) => {
    if (link.href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");

  // Listen for scroll events
  window.addEventListener("scroll", function () {
    // Add the transparent class when scrolling down
    if (window.scrollY > 0) {
      header.classList.add("header-transparent");
    } else {
      // Remove the transparent class when at the top
      header.classList.remove("header-transparent");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan elemen-ul (menu) dan menyimpannya ke dalam variable
  var menuItems = document.querySelectorAll("#navbar ul li a");

  // Menambahkan event listener untuk setiap item menu
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      // Menghapus kelas 'active' dari semua item menu
      menuItems.forEach(function (innerItem) {
        innerItem.classList.remove("active");
      });

      // Menambahkan kelas 'active' ke item menu yang diklik
      this.classList.add("active");
    });
  });
});
