import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "42651463-7e9bc4d6a898bed570bd4622e";
const BaseUrl = "https://pixabay.com/api/";
const loader = document.querySelector('.loader');

let perPage = 15;
export async function searchImages(searchQuery, currentPage) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: currentPage,
        per_page: perPage,
    })
    loader.style.display = 'block';


    try {
        const response = await axios.get(`${BaseUrl}?${params}`);
        if (!response === 200) {
            throw new Error('Network response was not OK');
        }
        const data = response.data;
        loader.style.display = 'none';
        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                fontSize: 'large',
                close: false,
                position: 'topRight',
                messageColor: 'white',
                timeout: 2000,
                backgroundColor: 'red',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        }
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
