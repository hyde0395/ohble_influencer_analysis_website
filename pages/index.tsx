import { useState } from "react";
import { useForm } from "react-hook-form";
import OhbleLogo from "./images/ohble_logo.png";

export default function Home() {
  // form 데이터 자료형 지정
  interface HookFormTypes {
    id: string;
    email: string;
    age: number;
    gender: string;
  }

  // 물음표 버튼 State 설정
  const [visible, setVisible] = useState(false);

  // handleSumbit : 제출시 이벤트 제어
  // watch : 입력값를 감시하는 기능
  // register : 결과 데이터의 속성을 결정하고 검증할때 쓴다.
  const {
    register,
    watch,
    handleSubmit,
    // formState 속성에서 제출중인지 상태를 체크하여서 더블클릭시 중복 제출되는것을 막는다.
    formState: { isSubmitting, errors, isDirty },
  } = useForm<HookFormTypes>();
  // 콘솔창에서 input 입력값을 실시간 감시.
  console.log(watch());
  console.log(errors);

  const onValid = async (data: HookFormTypes) => {
    console.log(data, "유효함");
    alert("제출되었습니다");
    // setSubmit(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("Mail send", res);
    });

    await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("success");
    });
  };

  return (
    <>
      <img className="logo" src={OhbleLogo.src} alt="ohbleLogo" />
      <div className="line"></div>
      <form
        acceptCharset="utf-8"
        // action="/api/post/new"
        method="POST"
        className="box"
        onSubmit={handleSubmit(onValid)}
      >
        <h1>오블 블로그 지수 분석기</h1>

        <div className="inputSection">
          <div className="settings">
            <label htmlFor="id">
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
                  자신의 블로그 주소창의 마지막 부분을 입력해주세요
                  <div className="wrapper">
                    <p className="id_example2">ex) https://blog.naver.com/ </p>
                    <p className="id_example3">ohble</p>
                  </div>
                </div>
              )}
              블로그 ID
            </label>
            <input
              aria-invalid={!isDirty ? undefined : errors.id ? "true" : "false"}
              {...register("id", {
                required: "블로그 아이디를 입력해주세요",
                pattern: {
                  value: /^[A-Za-z0-9]+$/i,
                  message: "아이디는 소문자, 대문자, 숫자로 구성되어야합니다",
                },
              })}
              type="text"
              className="id"
              placeholder="블로그 ID를 입력하세요"
            />
          </div>
          {errors.id && <small role="alert">{errors.id.message}</small>}
          <div className="settings">
            <label htmlFor="email">이메일</label>

            <input
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value:
                    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
                  message: "알맞은 이메일이 아닙니다.",
                },
              })}
              type="text"
              className="email"
              placeholder="이메일을 입력하세요"
            />
          </div>
          {errors.email && <small role="alert">{errors.email.message}</small>}
          <div className="dashed_line"></div>
          <p>* 나이와 성별은 선택사항입니다</p>
          <div className="settings">
            <label htmlFor="age">나이</label>
            <input
              {...register("age")}
              type="number"
              placeholder="나이를 입력해주세요"
            />
          </div>
          {errors.age && <small role="alert">{errors.age.message}</small>}
          <div className="settings">
            <label htmlFor="gender" style={{ marginRight: "30px" }}>
              성별
            </label>
            <div className="radio_box">
              <input
                {...register("gender")}
                type="radio"
                id="gender1"
                value="male"
              />
              <label htmlFor="gender1">남자</label>

              <input
                {...register("gender")}
                type="radio"
                id="gender2"
                value="female"
              />
              <label htmlFor="gender2">여자</label>
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="submit"
          value="제출하기"
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}
