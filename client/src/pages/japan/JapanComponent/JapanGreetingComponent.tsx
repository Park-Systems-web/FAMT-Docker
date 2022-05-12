import React from "react";
import styled from "styled-components";
import Title from "../../../components/Title/Title";

const JapanGreetingContainer = styled.div`
  .content-container {
    display: flex;
    padding: 10px 150px;
    .image-container {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        object-fit: contain;
        width: 80%;
        max-width: 100%;
        height: 235px;
      }

      .string {
        height: 100px;
      }
    }

    .desc-container {
      width: 70%;
      padding: 0 50px;

      .name {
        text-align: right;
      }
    }
  }

  @media (max-width: 900px) {
    .content-container {
      flex-direction: column;
      align-items: center;
      padding: 10px;

      .image-container {
        width: 70%;
      }
      .desc-container {
        padding: 0;
      }
    }
  }
`;

// 이 컴포넌트는 한 페이지가 아닌 할아버지가 인사하시는 일본의 인사말 한 section 컴포넌트입니다.
// greeting page 는 다른곳입니다.
const JapanGreetingComponent = () => {
  return (
    <JapanGreetingContainer>
      <Title
        title="
開催概要・ごあいさつ"
        fontSize={35}
      />
      <div className="content-container">
        <div className="image-container">
          <img
            src="https://user-images.githubusercontent.com/69495129/153128003-c685fc0b-1c4e-4cc1-bab8-88b458dfd03c.png"
            alt="takai"
          />
          <img
            className="string"
            src="https://user-images.githubusercontent.com/69495129/153128060-fb6e3088-e659-4031-a28b-40812e91ccc6.png"
            alt="desc"
          />
          <p>関東学院大学材料・表面工学研究所 高井 治 所長</p>
        </div>
        <div className="desc-container">
          <p>
            材料・表面技術は、いろいろな産業において、なくてはならない技術となっています。
            <br />
            今日、求められる表面改質・表面処理の厚さはナノメートルオーダーに達し、さらに微小化が進んでいます。{" "}
            <br />
            その表面を計測・解析する方法も各種発展しています。特に、1982年に発表された走査型トンネル顕微鏡から発展した走査型プローブ顕微鏡では、{" "}
            <br />
            原子1個1個を観察、解析し、操作することが可能になり、ナノレベルでの表面計測・解析の基礎技術としての重要性が日々増しています。{" "}
            <br />
            このような背景を踏まえ、昨年に引き続き、『ナノ科学シンポジウム2021』を開催いたしました。主催は関東学院大学材料・表面工学研究所、{" "}
            <br />
            協賛はパーク・システムズ・ジャパン株式会社、NanoScientific、ヤマトマテリアル株式会社、英和株式会社、後援は日刊工業新聞社です。{" "}
            <br />
            当材料・表面工学研究所は、材料・表面工学の分野において産学連携を強く進めています。今回、講演者には、MEMS技術、表面分析・解析技術、{" "}
            <br />
            表面技術などの第一線で活躍している8名の先生をお招きいたしました。{" "}
            COVID-19が収まらない中、この度の開催にあたり、 <br />
            8名のご講演の先生方、ご参加の皆様、ご協賛、ご後援の各社ならびにご関係の皆様に心よりお礼申し上げます。
          </p>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <p className="name">関東学院大学材料・表面工学研究所 所長 高井　治</p>
          <p style={{ textAlign: "right" }}>
            <img
              src="https://user-images.githubusercontent.com/69495129/153130688-3b454f9d-fb54-4ff7-835f-c81b61f27d48.png"
              alt="logo"
            />
          </p>
        </div>
      </div>
    </JapanGreetingContainer>
  );
};

export default JapanGreetingComponent;
