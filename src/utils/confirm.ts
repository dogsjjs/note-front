import Swal from 'sweetalert2';

const confirm: any = Swal.mixin({
  icon: 'question',
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '确认',
  cancelButtonText: '取消'
});

export const confirmModal = (msg = '', confirmAction: any) => {
  confirm.fire({
    title: msg
  }).then((result: { isConfirmed: any; isDenied: any; }) => {
    if (result.isConfirmed) {
      confirmAction()
    }
  });
};
