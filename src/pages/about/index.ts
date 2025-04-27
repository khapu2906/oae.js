import './style.css';
import Alpine from 'alpinejs';

Alpine.store('about', {
  showConfirmation: () => {
    alert("Thank you for learning about our mission!");
  }
});

export default {};
