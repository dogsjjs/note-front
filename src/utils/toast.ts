import Swal from 'sweetalert2';

const toast: any = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  padding: '2em',
  customClass: 'sweet-alerts',
});

export const showMessage = (msg = '', type = 'success') => {
  toast.fire({
    icon: type,
    title: msg,
    padding: '2em',
    customClass: 'sweet-alerts',
  });
};
