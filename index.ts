
type Rating = {
  count: number;
  rate: number;
};
type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};


// Global variables
let totalProducts: Product[] = [];
const itemsPerPage = 5;

// Handlers
const filterProducts = (value: string) => {
  const filteredProducts: Product[] = totalProducts.filter((p: Product) => p.title.toLowerCase().includes(value.toLowerCase()) || p.description.toLowerCase().includes(value.toLowerCase()));
  console.log('filteredProducts', filteredProducts);
};
const sortProducts = (filter: string) => {
  const sortedProducts: Product[] = totalProducts.toSorted((a: Product, b: Product) => a[filter] > b[filter] ? 1 : a[filter] < b[filter] ? -1 : 0);
  console.log('sortedProducts', sortedProducts);
};
const paginateProducts = (page: number) => {
  const paginatedProducts: Product[] = totalProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  console.log('paginatedProducts', paginatedProducts);
};


fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then((products: Product[]) => {
    // Set our global products array
    totalProducts = products;
    // Prepare table HTML
    let tableHTML: string = '<thead><tr><th>ID</th><th><button type="button" class="btn btn-link" onclick=sortProducts("title")>Title</button></th><th>Description</th><th>Price</th></tr></thead><tbody>';
    // Loop thru all products to generate rows of the table
    products.forEach((p: Product) => {
      tableHTML += `<tr><td>${p.id}</td><td>${p.title}</td><td>${p.description}</td><td>${p.price}</td></tr>`;
    });
    // Close table body
    tableHTML += '</tbody>';
    // Grab table element to set its inner HTML
    document.querySelector('#tableElement')!.innerHTML = tableHTML;
    // Hide spinner
    const spinnerElement: HTMLElement = document.querySelector('#spinnerContainer')!;
    spinnerElement.style.display = 'none';
  });
