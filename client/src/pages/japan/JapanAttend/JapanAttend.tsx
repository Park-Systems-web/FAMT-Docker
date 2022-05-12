import Title from "components/Title/Title";
import React from "react";
import { Button } from "@mui/material";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import {
  JapanAttendContainer,
  JapanAttendMapContainer,
} from "./JapanAttendStyles";

const JapanAttend = () => {
  return (
    <JapanAttendContainer>
      <Title title="オンライン参加手順" fontSize={40} />
      <div className="button-container">
        <Button
          onClick={() =>
            window.open(
              "https://parksystems.com/images/events/symposium/Japan/NSSJ_2021_Online_Registration_Howto.pdf",
              "_blank",
            )
          }
          variant="contained"
          startIcon={<FileDownloadTwoToneIcon />}
        >
          参加手順の説明冊子ダウンロード
        </Button>
      </div>

      <img
        src="https://user-images.githubusercontent.com/69495129/153148740-921e58be-5960-4ab5-b65d-d6d32876a8be.png"
        alt="offline"
      />

      <ul className="sequence">
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
      </ul>
      <Title title="オフライン参加手順" fontSize={40} />

      <img
        src="https://user-images.githubusercontent.com/69495129/153144289-152160ac-261c-4a13-839e-74544e406eed.png"
        alt="online"
      />

      <ul className="sequence">
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
        <li>
          <h5>① 参加登録</h5>
          <span>
            参加登録ページにアクセスして、 必要事項を入力し、Registerボタンを
            クリック！
          </span>
        </li>
      </ul>

      <JapanAttendMapContainer>
        <img
          src="https://user-images.githubusercontent.com/69495129/153149800-5a2561fa-3a99-4ae4-a0e7-2e8239883e08.png"
          alt="map"
        />
        <p>
          会場：KGU関内メディアセンター <br />
          <br />
          最寄り駅：みなとみらい線 馬車道駅 5出口 (馬車道口) 徒歩4分
          <br />
          みなとみらい線 日本大通り駅 1出口(県庁口) 徒歩6分 JR 関内駅 北口 /
          横浜市営地下鉄ブルーライン 関内駅 徒歩10分
          <br />
          <br />
          住所：神奈川県横浜市中区太田町2-23
          <br />
          横浜メディア・ビジネスセンター（YMBC）8階 <br />
          <br />
          TEL：045-650-1131
        </p>
      </JapanAttendMapContainer>
    </JapanAttendContainer>
  );
};

export default JapanAttend;
