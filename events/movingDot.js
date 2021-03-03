export default function (top, left) {
  const span = document.createElement('span');
  const time = Math.random() * 1500;
  const speed = (Math.random() * 5) + 5;

  let start;

  span.style.width = '10px';
  span.style.height = '10px';
  span.style.position = 'absolute';
  span.style.left = (left + Math.random() * 100) - 50 + 'px';
  span.style.top = top + 'px';
  span.style.borderRadius = '50%';
  span.style.display = 'inline-block';
  span.style.backgroundColor = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
  document.body.appendChild(span);

  const move = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const {top} = span.getBoundingClientRect();
    span.style.top = top + speed + 'px';

    if (timestamp - start > time) {
      document.body.removeChild(span);
    }
    else {
      requestAnimationFrame(move);
    }

  };
  requestAnimationFrame(move);
};
