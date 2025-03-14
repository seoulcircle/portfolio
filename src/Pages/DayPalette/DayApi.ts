const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const SERVICE_KEY = import.meta.env.VITE_WEATHER_API_KEY as string; // 환경 변수에서 관리

// 공통 API 요청 함수
const fetchWeatherData = async (
  endpoint: string,
  base_date: string,
  base_time?: string
) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("serviceKey", SERVICE_KEY);
  url.searchParams.append("pageNo", "1");
  url.searchParams.append("numOfRows", "1000");
  url.searchParams.append("dataType", "JSON");
  url.searchParams.append("base_date", base_date);
  url.searchParams.append("nx", "55");
  url.searchParams.append("ny", "127");

  if (base_time) {
    url.searchParams.append("base_time", base_time);
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);

    const data = await response.json();
    return data.response.body.items.item;
  } catch (error) {
    console.error(`날씨 API 호출 오류: ${endpoint}`, error);
    throw error;
  }
};

// 초단기 실황 조회 (base_date, base_time 필요)
export const getUltraShortForecast = async (
  base_date: string,
  base_time: string
) => {
  return fetchWeatherData("getUltraSrtNcst", base_date, base_time);
};

// 단기 예보 조회 (base_date만 필요)
export const getVillageForecast = async (base_date: string) => {
  return fetchWeatherData("getVilageFcst", base_date);
};
