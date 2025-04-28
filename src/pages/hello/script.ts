import './style.css';
import Alpine from 'alpinejs';

Alpine.store('hello', {
  openAlert: () => {
    alert("Learn more about our amazing product!");
  }
});

export default {};
