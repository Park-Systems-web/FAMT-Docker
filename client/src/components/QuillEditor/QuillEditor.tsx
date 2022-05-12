import React, { useMemo, useRef, useState } from "react";
import { myBucket } from "components/S3Upload/S3Upload";
import usePageViews from "hooks/usePageViews";
import * as ReactQuill from "react-quill";
import { S3_URL } from "utils/GlobalData";
import ImageResize from "quill-image-resize";

ReactQuill.Quill.register("modules/ImageResize", ImageResize);

interface editorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = (props: editorProps) => {
  const { value, setValue } = props;
  const quillRef = useRef<ReactQuill>(); // 에디터 접근을 위한 ref
  const pathname = usePageViews();

  const imageHandler = () => {
    console.log("Hello Quill imageHandler!");
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.
    input.addEventListener("change", async () => {
      console.log("온체인지");
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append("img", file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        // const result = await axios.post("http://localhost:4050/img", formData);
        // console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);
        // const IMG_URL = result.data.url;
        // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.
        const S3_BUCKET = "nss-integration";

        const params = {
          ACL: "public-read",
          Body: file,
          Bucket: S3_BUCKET,
          Key: `upload/${pathname}/${
            window.location.pathname.split("/").slice(-1)[0]
          }/${`${file.name.split(".")[0]}_${Date.now()}.${
            file.name.split(".")[1]
          }`}`,
        };

        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt, res) => {
            // setProgress(Math.round((evt.loaded / evt.total) * 100));
            // setTimeout(() => {
            //   console.log("완료");
            //   setUploadLoading(false);
            // }, 3000);
          })
          .send((err, data) => {
            if (err) console.log(err);
            // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
            const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
            // 1. 에디터 root의 innerHTML을 수정해주기
            // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
            // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
            // editor.root.innerHTML =
            //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

            // 2. 현재 에디터 커서 위치값을 가져온다
            const range = editor.getSelection();
            // 가져온 위치에 이미지를 삽입한다
            editor.insertEmbed(range.index, "image", `${S3_URL}/${params.Key}`);
          });
      } catch (error) {
        console.log("QuillEditor: image failed");
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote"],

          [{ header: [false, 1, 2, 3] }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          ["link"],
          [{ color: [] }],
          // , { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: ReactQuill.Quill.import("parchment"),
      },
    };
  }, []);
  // 위에서 설정한 모듈들 formats을 설정한다
  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "image",
  // ];

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        // formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
