class UserCredentials {
  constructor(login, password, email, agreement) {
    this.login = login;
    this.password = password;
    this.email = email;
    this.agreement = agreement;
  }

  print() {
    console.group('%c=== Данные формы ===', 'font-weight: bold; color: #8b2e2e;');
    console.log(`Логин:     ${this.login}`);
    console.log(`Пароль:    ${'*'.repeat(this.password.length)}`);
    console.log(`Email:     ${this.email || '—'}`);
    console.log(`Согласие:  ${this.agreement ? 'да' : 'нет'}`);
    console.groupEnd();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const message = document.getElementById('form-message');
  const modal = document.getElementById('login-modal');
  
  // Кнопки управления модальным окном
  const btnOpen = document.getElementById('open-login');
  const btnClose = document.getElementById('close-modal-btn');
  const overlay = document.getElementById('close-modal-overlay');

  // Функции открытия/закрытия
  const openModal = () => modal.classList.add('modal--open');
  const closeModal = () => {
    modal.classList.remove('modal--open');
    form.reset();
    message.textContent = '';
  };

  // Обработчики событий для модалки
  if (btnOpen) btnOpen.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  
  // Закрытие по нажатию на клавишу Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeModal();
    }
  });

  // Обработка отправки формы (ваш код из пункта 6)
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const login = document.getElementById('login').value.trim();
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value.trim();
      const agreement = document.getElementById('agreement').checked;

      message.className = 'form__message';
      message.textContent = '';

      if (!login) {
        message.classList.add('form__message--error');
        message.textContent = 'Введите логин.';
        return;
      }
      if (!password) {
        message.classList.add('form__message--error');
        message.textContent = 'Введите пароль.';
        return;
      }
      if (!agreement) {
        message.classList.add('form__message--error');
        message.textContent = 'Необходимо согласие на обработку данных.';
        return;
      }

      const credentials = new UserCredentials(login, password, email, agreement);
      credentials.print();

      message.classList.add('form__message--success');
      
      closeModal(); 
      
    });
  }
});