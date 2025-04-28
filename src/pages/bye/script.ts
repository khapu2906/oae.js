import './style.css';
import Alpine from 'alpinejs';

Alpine.store('bye', {
  redirectToHello: () => {
    window.location.href = '/hello.html';
  }
});

export default {};
