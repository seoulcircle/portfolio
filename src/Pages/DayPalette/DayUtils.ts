function getRGBA(hour, temp, humidity, pm) {
  // 🔴 R = 기온 기반 (확장된 스케일링 적용)
  const minTemp = -10; // 최저 온도 (-10℃)
  const maxTemp = 40; // 최고 온도 (40℃)
  const R = Math.min(
    255,
    Math.max(0, ((temp - minTemp) / (maxTemp - minTemp)) * 255)
  );

  // 🟢 G = 습도 기반 (습도가 높을수록 초록색 강해짐)
  const G = Math.min(255, Math.max(0, (humidity / 100) * 255));

  // 🔵 B = 시간 기반 (밤일수록 파란색 강조)
  const B = Math.abs(255 - (hour / 24) * 255);

  // 🎚 A = 미세먼지 기반 (미세먼지 농도가 높을수록 불투명)
  const A = Math.min(1, pm / 100).toFixed(2);

  return `rgba(${Math.round(R)}, ${Math.round(G)}, ${Math.round(B)}, ${A})`;
}

console.log(getRGBA(19, 35, 62, 69));
export default getRGBA;
// 예제 실행
// 예: "rgba(229, 158, 153, 0.69)"
