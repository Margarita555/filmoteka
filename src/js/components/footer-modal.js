import getRefs from "../refs/get-refs";

(() => {
  const  { openFooterModalBtn, closeFooterModalBtn, footerModal, backdropRef } = getRefs();
 
 
 
 openFooterModalBtn.addEventListener('click', toggleModal);
 closeFooterModalBtn.addEventListener('click', toggleModal);

 window.onclick = function (e) {
   if (e.target == footerModal) {
    footerModal.classList.toggle('is-hidden');
   }
  }

  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') toggleModal();
  });

  function toggleModal () {
    footerModal.classList.toggle('is-hidden');
 }

})();