let mes = `Итоговая оценка: 70/60.
1. Вёрстка +10
  - на странице есть несколько фото и строка поиска +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2. При загрузке приложения на странице отображаются полученные от API изображения +10

3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10

4. Поиск +30
  - при открытии приложения курсор находится в поле ввода +5
  - есть placeholder +5
  - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  - поисковый запрос можно отправить нажатием клавиши Enter +5
  - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. Дополнительный функционал +10
  - высокое качество оформления +2
  - если не находит изображений по запросу, то выводится надпись "Error 404. Unfortunately we didn't find anything" +2
  - изображения сохраняют свои пропорции +2
  - при нажатии на картинку можно уидеть ее в отдельном окне, где есть кнопка чтобы открыть картинку в отдельной вкладке +4
`;
console.log(mes);

const galleryContainer = document.querySelector('.gallery-container');
const imgClose = document.querySelector(".imgClose");
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-input');
const imageViewLink = document.getElementById("imageViewLink");
const modalBody = document.getElementById("modalBody");




API_KEY = "9uvv2cNu0LB_67w4ZzQj6MkgGAc9KkX8vNI5F1T1vr4";
let currentQuery = 'California';
const url = `https://api.unsplash.com/search/photos?query=${currentQuery}&per_page=21&orientation=landscape&client_id=${API_KEY}`;

function viewData(data) {

    if (data.length) {
        data.forEach(element => {
            const img = `<img class="gallery" onclick="displayFullImage(this.src)" src=${element.urls.regular} alt="image">`;
            galleryContainer.insertAdjacentHTML('beforeend', img);
        });
    }
    else {
        const p = `<div class="container-error404"> <p>Error 404.</p><p class="error404">Unfortunately we didn't find anything.</p> <p>Please refresh the page</p></div>`;
        galleryContainer.insertAdjacentHTML('afterbegin', p);
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    viewData(data.results);
}
fetchData(url);

function deleteData() {
    const error = document.querySelector('.error404');
    if (error) {
        galleryContainer.removeChild(error);
    }
    const imgs = galleryContainer.querySelectorAll('.gallery');
    imgs.forEach(element => galleryContainer.removeChild(element));
}

imgClose.addEventListener('click', function() {
    searchKey.value = '';
});

function displayFullImage(src) {

    let image = document.createElement('img');
    image.src = src;
    image.className="mt-3";
    image.setAttribute("width", "100%");

    modalBody.innerHTML = "";
    modalBody.appendChild(image);

    imageViewLink.href = src;

    let myModal = new bootstrap.Modal(document.getElementById('modal'), {});
    myModal.show();

    
}

function search(event) {
    event.preventDefault();
    const currentQuery = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?query=${currentQuery}&per_page=21&orientation=landscape&client_id=${API_KEY}`;
    deleteData();
    fetchData(url);
}
window.addEventListener('load', () => searchInput.focus());
searchForm.addEventListener('submit', search);
