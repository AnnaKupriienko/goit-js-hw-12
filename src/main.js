
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search-form")
const galleryContainer = document.querySelector(".gallery")
const loadMoreBtn = document.querySelector(".load-btn")
import { searchImages } from "./js/pixabay-api.js";
import { createMarkup} from "./js/render-functions.js";
import iziToast from "izitoast";
let searchQuery = "";
let currentPage;
let totalHits;
loadMoreBtn.style.display = "none";
const lightbox = new SimpleLightbox('.gallery-link', { 
    captions: true,
    captionsData: 'alt',
    captionDelay: 200,
});

form.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
function onSubmit(event) {
    event.preventDefault();
    galleryContainer.innerHTML = "";
    currentPage = 1;
    searchQuery = form.elements.searchQuery.value.trim(),
        searchImages(searchQuery, currentPage).then(data => {
            totalHits = data.totalHits;
        const markup = createMarkup(data)
  galleryContainer.insertAdjacentHTML('beforeend', markup)
            lightbox.refresh()
            hideLoadmoreBtn(data)
     }).catch(error => console.log(error))
}
function onLoadMore(){
    currentPage++;
    searchImages(searchQuery, currentPage).then(data => {
            totalHits = data.totalHits;
        const markup = createMarkup(data)
        galleryContainer.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh()
        hideLoadmoreBtn(data)
     }).catch(error => console.log(error))
}
function hideLoadmoreBtn(data) {
    if (galleryContainer.children.length < totalHits) {
        loadMoreBtn.style.display = "block";
    } else {
        const currentHits = currentPage * 15;
        if (currentHits >= totalHits) {
            loadMoreBtn.style.display = "none";
            iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#4CAF50',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#4CAF50',
        position: 'topRight',
            })
        }
        else {
            createMarkup(data)
        }}
}
function smoothScroll() {
    const heightItem = galleryContainer.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
        top: 2 * heightItem,
        behavior: "smooth",
    });
}
galleryContainer.addEventListener('scroll', smoothScroll)