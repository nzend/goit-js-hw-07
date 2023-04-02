import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGalleryItem(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

// Рендер HTML галереї
function createGalleryItem(itemsArray) {
  const markup = itemsArray
    .map(({ preview, original, description }) => {
      return ` 
     <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `;
    })
    .join("");
  return markup;
}

// Додавання слухача подій та повернення url великого зображення
galleryList.addEventListener("click", onGalleryListClick);

function onGalleryListClick(evt) {
  evt.preventDefault();
  let imgUrl = "";
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  imgUrl = evt.target.dataset.source;
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <img
      class="gallery__image"
      src="${imgUrl.source}"
      width="720"
      height="720";
    />
        
        <a>Close</a>
    </div>
`,
    {
      onShow: (instance) => {
        instance.element().querySelector("a").onclick = instance.close;
        document.onkeydown = function (evt) {
          evt = evt || window.event;
          let isEscape = false;
          if ("key" in evt) {
            isEscape = evt.key === "Escape" || evt.key === "Esc";
          } else {
            isEscape = evt.keyCode === 27;
          }
          if (isEscape) {
            instance.close();
          }
        };
      },
    }
  );
  instance.show();
}
