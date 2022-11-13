import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(formRef);
  const { delay, step, amount } = Object.fromEntries(formData);

  for (let i = 0; i < amount; i++) {
    const delayTimer = +delay + +step * i;
    setTimeout(() => {
      createPromise(i + 1, delayTimer)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }, delayTimer);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

formRef.addEventListener('submit', handleFormSubmit);