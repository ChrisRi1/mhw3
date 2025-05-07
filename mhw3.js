const menuIcon = document.getElementById('menu-icon');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('close-modal');
const imageContainer= document.querySelector('.right-side img');
const images= ['margherita.png','hamburger.png'];


menuIcon.addEventListener('click', function()  {
 
  modalOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

function closeTheModal() {
    modalOverlay.classList.add('hidden'); 
    document.body.classList.remove('modal-open'); 
}


closeModal.addEventListener('click', closeTheModal);


modalOverlay.addEventListener('click', function (e) {
  
    if (e.target === modalOverlay) {
        closeTheModal();
    }
});
  imageContainer.addEventListener('mouseenter',function(){
    imageContainer.src = images[1];
  });
  imageContainer.addEventListener('mouseleave',function() {
    imageContainer.src= images[0];
  });



  /*lang-btn */
  const languageButton = document.getElementById('languageButton');
const languageMenu = document.getElementById('languageMenu');


languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = languageMenu.style.display === 'block';
    languageMenu.style.display = isVisible ? 'none' : 'block';
});


languageMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});


document.addEventListener('click', () => {
    languageMenu.style.display = 'none';
});

