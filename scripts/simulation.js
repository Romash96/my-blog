const canvas = document.getElementById('orbit-simulation');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Солнце
const sun = { radius: 30, color: 'yellow' };

// Планеты: name, radius, distance от Солнца, скорость вращения
const planets = [
  { name: 'Меркурий', radius: 6, distance: 50, angle: 0, speed: 0.04, color: 'gray' },
  { name: 'Венера', radius: 10, distance: 80, angle: 0, speed: 0.03, color: 'orange' },
  { name: 'Земля', radius: 12, distance: 110, angle: 0, speed: 0.02, color: 'blue' },
  { name: 'Марс', radius: 9, distance: 150, angle: 0, speed: 0.015, color: 'red' },
  { name: 'Юпитер', radius: 20, distance: 200, angle: 0, speed: 0.01, color: 'brown' },
  { name: 'Сатурн', radius: 18, distance: 260, angle: 0, speed: 0.008, color: 'gold' },
  { name: 'Уран', radius: 14, distance: 320, angle: 0, speed: 0.006, color: 'lightblue' },
  { name: 'Нептун', radius: 14, distance: 380, angle: 0, speed: 0.005, color: 'darkblue' }
];

function drawSun() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = sun.color;
  ctx.fill();
}

function drawPlanets() {
  planets.forEach(planet => {
    const x = centerX + planet.distance * Math.cos(planet.angle);
    const y = centerY + planet.distance * Math.sin(planet.angle);

    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();

    // Подпись планеты
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(planet.name, x - planet.radius, y - planet.radius - 5);

    // Обновляем угол для движения
    planet.angle += planet.speed;
  });
}

function drawOrbitLines() {
  planets.forEach(planet => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawOrbitLines();
  drawSun();
  drawPlanets();
  requestAnimationFrame(animate);
}

// Запускаем анимацию
animate();
