const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const SERVICE_KEY = import.meta.env.VITE_WEATHER_API_KEY as string; // 환경 변수에서 관리

// 날씨 공통 API 요청 함수
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

  base_time
    ? url.searchParams.append("base_time", base_time)
    : url.searchParams.append("base_time", "0500");
  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);
    const data = await response.json();

    return data.response.body.items.item || [];
  } catch (error) {
    console.error(`날씨 API 호출 오류: ${endpoint}`, error);
    return [];
  }
};
export interface INowWeather {
  category: string;
  value: string;
  obsrValue: string;
}
export interface ITmrWeather {
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  category: string;
}

// 초단기 실황 조회 (base_date, base_time 필요)
export const getNowWeather = async (
  base_date: string,
  base_time: string
): Promise<INowWeather[]> => {
  return fetchWeatherData("getUltraSrtNcst", base_date, base_time);
};

// 단기 예보 조회 (base_date만 필요)
export const getTmrWeather = async (
  base_date: string
): Promise<ITmrWeather[]> => {
  return fetchWeatherData("getVilageFcst", base_date);
};

// 미세먼지 API 요청 함수
const fetchDustData = async () => {
  try {
    const response = await fetch(
      `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${encodeURIComponent(
        SERVICE_KEY
      )}&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response.body.items;
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};
export interface IDustData {
  stationName: string;
  pm10Value: string;
  pm10Value24: string;
}
export const getDustData = async (): Promise<IDustData[]> => {
  return fetchDustData();
};
