import { useState } from "react";

export default function Home() {
  // 물음표 버튼 State 설정
  const [visible, setVisible] = useState(false);
  // Submit 버튼 State 설정
  const [submit, setSubmit] = useState(false);

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);
  };
  return (
    <form
      acceptCharset="utf-8"
      method="get"
      className="box"
      onSubmit={onSubmit}
    >
      <h1>오블 인플루언서 분석기</h1>
      <p>블로그의 ID를 입력하세요</p>
      <a
        className="questionMark"
        // 물음표 Hover 시 id_description 나타나기
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        ?
      </a>
      {visible && (
        <div className="id_description">
          <p className="id_example1">ex) https://blog.naver.com/ </p>
          <p className="id_example2">ohble</p>
        </div>
      )}
      <input
        type="text"
        className="inputID"
        required
        placeholder="블로그 ID를 입력하세요"
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            "네이버 아이디를 입력해주세요"
          )
        }
        // required 유효성 에러 text 바꾸기
      />
      <p>이메일을 입력하세요</p>
      <input
        type="text"
        required
        className="inputEmail"
        placeholder="이메일을 입력하세요"
      />
      <input type="submit" className="submit" value="제출하기" />
      {submit && (
        <div className="endingBox">
          <div
            className="closeBtn"
            onClick={() => {
              setSubmit(false);
            }}
          ></div>
          <h2> 정상적으로 제출되었습니다</h2>
        </div>
      )}
    </form>
  );
}
