import { useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  return (
    <form acceptCharset="utf-8" method="get" className="box">
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
        placeholder="블로그 ID를 입력하세요"
      />
      <p>이메일을 입력하세요</p>
      <input
        type="text"
        className="inputEmail"
        placeholder="이메일을 입력하세요"
      />
      <input type="submit" className="submit" value="제출하기" />
      <div className="ending Box"></div>
    </form>
  );
}
