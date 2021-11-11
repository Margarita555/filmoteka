import getRefs from "../refs/get-refs";

(() => {
  const  { openFooterModalBtn, closeFooterModalBtn, footerModal, backdropRef } = getRefs();
  openFooterModalBtn.addEventListener('click', toggleModal);
  closeFooterModalBtn.addEventListener('click', toggleModal);
 // backdropRef.addEventListener('click', toggleModal);

  function toggleModal () {
      footerModal.classList.toggle('is-hidden');
  }
})();