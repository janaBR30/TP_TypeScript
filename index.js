// Global variables
var totalProducts = [];
var itemsPerPage = 5;
// Handlers
var filterProducts = function (value) {
    var filteredProducts = totalProducts.filter(function (p) { return p.title.toLowerCase().includes(value.toLowerCase()) || p.description.toLowerCase().includes(value.toLowerCase()); });
    console.log('filteredProducts', filteredProducts);
};
var sortProducts = function (filter) {
    var sortedProducts = totalProducts.toSorted(function (a, b) { return a[filter] > b[filter] ? 1 : a[filter] < b[filter] ? -1 : 0; });
    console.log('sortedProducts', sortedProducts);
};
var paginateProducts = function (page) {
    var paginatedProducts = totalProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    console.log('paginatedProducts', paginatedProducts);
};
fetch('https://fakestoreapi.com/products')
    .then(function (res) { return res.json(); })
    .then(function (products) {
    // Set our global products array
    totalProducts = products;
    // Prepare table HTML
    var tableHTML = '<thead><tr><th>ID</th><th><button type="button" class="btn btn-link" onclick=sortProducts("title")>Title</button></th><th>Description</th><th>Price</th></tr></thead><tbody>';
    // Loop thru all products to generate rows of the table
    products.forEach(function (p) {
        tableHTML += "<tr><td>".concat(p.id, "</td><td>").concat(p.title, "</td><td>").concat(p.description, "</td><td>").concat(p.price, "</td></tr>");
    });
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement').innerHTML = tableHTML;
    // Hide spinner
    var spinnerElement = document.querySelector('#spinnerContainer');
    spinnerElement.style.display = 'none';
});