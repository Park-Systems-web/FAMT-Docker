import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Title from "components/Title/Title";
import JPSpeakerCard from "components/SpeakerCard/JPSpeakerCard";
import Link from "components/Link/LinkWithSearch";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import usePageViews from "hooks/usePageViews";
import { globalData } from "utils/GlobalData";
import { useThemeDispatch } from "context/ThemeContext";
import { JapanArchiveContainer } from "./JapanArchiveStyles";
import useWindowSize from "../../../hooks/useWindowSize";
import JapanGreetingComponent from "../JapanComponent/JapanGreetingComponent";

const JapanArchive = () => {
  const speakersState: Speaker.speakerType[] = [
    {
      id: 1,
      name: "江刺 正喜",
      belong: "国立大学法人東北大学\nマイクロシステム融合開発センター\n​博士",
      description: "「半導体微細加工を発展させたMEMSとその開発支援」",
      image_path: "upload/jpArchive/jp01.png",
      status: 1,
    },
    {
      id: 2,
      name: "福間 剛士",
      belong: "金沢大学ナノ生命科学研究所\n​所長・教授",
      description: "「革新的液中原子間力顕微鏡技術による未踏ナノ領域の可視化」",
      image_path: "upload/jpArchive/jp02.png",
      status: 1,
    },
    {
      id: 3,
      name: "嘉数 誠",
      belong: "佐賀大学大学院理工学研究科​\n教授",
      description: "「ダイヤモンド半導体の最近の進展」",
      image_path: "upload/jpArchive/jp03.png",
      status: 1,
    },
    {
      id: 4,
      name: "米田 忠弘",
      belong:
        "国立大学法人東北大学\n多元物質科学研究所\n走査プローブ計測技術研究分野​\n教授",
      description:
        "「走査型プローブ顕微鏡を用いた\n二次元層状化合物の基礎と\nデバイス応用」",
      image_path: "upload/jpArchive/jp04.png",
      status: 1,
    },
    {
      id: 5,
      name: "​井須 紀文",
      belong:
        "株式会社LIXILTechnology Innovation 本部分析・環境技術開発部​\nリーダー",
      description: "「住宅用防汚・抗菌材料と表面分析」",
      image_path: "upload/jpArchive/jp05.png",
      status: 1,
    },
    {
      id: 6,
      name: "藤本 亜由美",
      belong:
        "株式会社カネカテクノリサーチ \n分析部 大阪分析センター​第一グループ",
      description:
        "「凍結割断レプリカ法を用いた\n​メタンハイドレートの微細構造観察」",
      image_path: "upload/jpArchive/jp06.png",
      status: 1,
    },
    {
      id: 7,
      name: "近間 克己",
      belong:
        "日産化学株式会社\n物質科学研究所 物質解析研究部\n​解析研究グループ",
      description: "「積層薄膜の構造解析」",
      image_path: "upload/jpArchive/jp07.png",
      status: 1,
    },
    {
      id: 8,
      name: "高井 治",
      belong: "関東学院大学材料・表面工学研究所\n​所長",
      description: "「ナノインデンテーションによる\n​薄膜の機械的特性評価」",
      image_path: "upload/jpArchive/jp08.png",
      status: 1,
    },
  ];

  const pathname = usePageViews();
  const { archive } = globalData.get(pathname) as Common.globalDataType;
  const [imagePadding, setImagePadding] = useState<number>(25);
  const size = useWindowSize();

  const dispatch = useThemeDispatch();

  useEffect(() => {
    dispatch({ type: "LIGHTMODE" });
  }, []);

  useEffect(() => {
    if (size.width && size.width < 1250) {
      setImagePadding(5);
    } else {
      setImagePadding(25);
    }
  }, [size.width]);

  return (
    <JapanArchiveContainer>
      <img
        src="https://nss-integration.s3.us-west-1.amazonaws.com/upload/jpArchive/KakaoTalk_20220216_172105018.png"
        alt="banner"
        className="banner"
      />

      <section className="content">
        <div className="string-content">
          <h1>各講演アーカイブにて公開中！</h1>
          <h4>※動画視聴には、フォームの記入および提出が必要です。</h4>
          <h2 className="navy">ナノ科学シンポジウム2022もお楽しみに！</h2>
          <h3>日時：2022年 11月18日 場所：ハイブリッド開催</h3>

          <Button
            size="large"
            variant="contained"
            onClick={() =>
              window.open(
                "https://pages.parksystems.com/NSS-Japan-2021-Archive_NSS-Japan-2021-Archive-Registration-LP.html",
                "_blank",
              )
            }
          >
            NSS Japan 2021 アーカイブ
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() =>
              window.open("https://bit.ly/NSSJ-2021-Abstract", "_blank")
            }
          >
            NSS Japan 2021 要旨集
          </Button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video className="video-content" autoPlay muted loop>
          <source
            src="https://nss-integration.s3.us-west-1.amazonaws.com/jp/jp-archive.mp4"
            type="video/mp4"
          />
        </video>
      </section>
      <section className="greeting">
        <JapanGreetingComponent />
      </section>
      <section className="speakers">
        <Title title="SPEAKERS" fontSize={36} />
        <Box
          sx={{
            flexGrow: 1,
            px: { tablet: 25, mobile: 10 },
            pb: { tablet: 25, mobile: 10 },
            pt: 0,
          }}
        >
          <Grid
            container
            spacing={{ mobile: 4, laptop: 7 }}
            columns={{ mobile: 1, tablet: 8, laptop: 16 }}
          >
            {speakersState.map((speaker) => (
              <JPSpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </Grid>
        </Box>
      </section>

      <section className="exhibition">
        <img
          src="https://nss-integration.s3.us-west-1.amazonaws.com/upload/jpArchive/exhibition-0217.jpg"
          alt="afm"
        />
        <div className="string-section">
          <h1>Virtual Exhibition</h1>
          <h5>
            原子間力顕微鏡（AFM)の展示や NanoScientific
            Magazineの展示はこちらから！
          </h5>
          <Link to="/jp/exhibit/parksystems">
            <Button size="large" variant="contained">
              バーチャル展示会はこちらから
            </Button>
          </Link>
        </div>
      </section>
      <section className="last-year">
        <YoutubeEmbed embedId="pEqU5l3n9dI" width="853" height="480" />
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            window.open(
              "https://pages.parksystems.com/NSS-Japan-2020-Archive_NSS-Japan-2020-Archive-Registration-LP.html",
              "_blank",
            )
          }
        >
          ナノ科学シンポジウム2020 アーカイブ
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            window.open(
              "https://1drv.ms/b/s!AvTejuaCDJUVhEhrzXp_OlPqmOsl?e=lFIysP",
              "_blank",
            )
          }
        >
          {" "}
          ナノ科学シンポジウム2020 要旨集
        </Button>
      </section>
    </JapanArchiveContainer>
  );
};

export default JapanArchive;
