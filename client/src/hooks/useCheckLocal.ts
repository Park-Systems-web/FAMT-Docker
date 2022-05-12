// 현재가 로컬상태라면 true 를 반환합니다.

const useCheckLocal = (): boolean => {
  return window.location.host.includes("3000");
};

export default useCheckLocal;
