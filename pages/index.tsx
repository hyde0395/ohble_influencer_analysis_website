import { useState } from "react";
import { appendErrors, useForm } from "react-hook-form";

export default function Home() {
  interface HookFormTypes {
    id: string;
    email: string;
  }

  // 물음표 버튼 State 설정
  const [visible, setVisible] = useState(false);
  // Submit 버튼 State 설정
  const [submit, setSubmit] = useState(false);

  // handleSumbit
  // watch는 입력값를 감시하는 기능
  // register 결과 데이터의 속성을 결정하고 검증할때 쓴다.
  const {
    register,
    watch,
    handleSubmit,
    // formState 속성에서 제출중인지 상태를 체크하여서 더블클릭시 중복 제출되는것을 막는다.
    formState: { isSubmitting, errors, isDirty },
  } = useForm<HookFormTypes>();
  // 콘솔창에서 input 입력값을 실시간 감시.
  // console.log(watch());
  console.log(errors);

  const onValid = (data: HookFormTypes) => {
    console.log(data, "onvaild");
    setSubmit(true);
  };

  // const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
  //   // 제출해도 페이지 새로고침 안되도록 하는 함수.
  //   event.preventDefault();
  // };
  return (
    <form
      acceptCharset="utf-8"
      method="get"
      className="box"
      onSubmit={handleSubmit(onValid)}
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
      {errors.id && <small role="alert">{errors.id.message}</small>}
      <p>이메일을 입력하세요</p>
      <input
        {...register("email", {
          required: "이메일을 입력하세요.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "@과 .이 포함되지 않았습니다.",
          },
        })}
        type="text"
        className="email"
        placeholder="이메일을 입력하세요"
      />
      {errors.email && <small role="alert">{errors.email.message}</small>}
      <input
        type="submit"
        className="submit"
        value="제출하기"
        disabled={isSubmitting}
      />

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
