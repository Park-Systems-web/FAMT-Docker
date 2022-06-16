import React, { useState, useEffect, useRef } from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import { globalData, S3_URL } from "utils/GlobalData";
import LandingTitle from "components/Title/LandingTitle";
import LandingSection from "components/Section/LandingSection";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpeakerCard from "components/SpeakerCard/SpeakerCard";
import CookieConsent, { Cookies } from "react-cookie-consent";
import YoutubeEmbed from "components/YoutubeEmbed/YoutubeEmbed";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import { LiveChatWidget } from "@livechat/widget-react";
import {
  subHeadingFontSize,
  mainFontSize,
  smallFontSize,
  headingFontSize,
} from "utils/FontSize";
import { editorRole } from "utils/Roles";
import { useAuthState } from "context/AuthContext";
import LandingTextEditor from "components/LandingTextEditor/LandingTextEditor";
import SponsorForm from "pages/admin/Forms/SponsorForm";
import useLoadingStore from "store/LoadingStore";
import useAdminStore from "store/AdminStore";
import LandingSection4Form from "pages/admin/Forms/LandingSection4Form";
import { SpeakersContainer } from "../Speakers/SpeakersStyles";
import { LandingContainer } from "./LandingStyles";

const Landing = () => {
  const pathname = usePageViews();
  const theme = useTheme();
  const authState = useAuthState();
  const isEditor = editorRole.includes(authState.role);
  const {
    home,
    registration,
    fullDate,
    eventLocation,
    showLandingSection2,
    showLandingSection3,
    showLandingSection4,
    showLandingSection5,
    showLandingSection6,
    showLandingSection7,
    landingSection1Desc,
    landingSection1LogoURL,
    landingSection1BackgroundURL,
    landingSection2Video,
    landingSection3Title,
    landingSection3Desc,
    landingSection4Title,
    landingSection5Title,
    landingSection6Title,
    landingSection6Desc,
    landingSection6ButtonText,
    landingSection6ButtonLink,
    landingSection6Videos,
    landingSection7Title,
    landingSection7Sponsors,
    cookieConsentText,
    seePrivacyPolicyText,
  } = globalData.get(pathname) as Common.globalDataType;

  const navigate = useNavigate();

  const [keynoteSpeakers, setKeynoteSpeakers] = useState<Speaker.speakerType[]>(
    [],
  );

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  // loading
  const { landingLoading, setLandingLoading } = useLoadingStore();

  // landing section
  const [landingSection2Content, setLandingSection2Content] =
    useState<Common.landingSection2Type>(null);
  const [landing2Title, setLanding2Title] = useState<string>("");
  const [landing2TitleEdit, setLanding2TitleEdit] = useState<boolean>(false);
  const [landing2TitlePreviewContent, setLanding2TitlePreviewContent] =
    useState<string>("");
  const [landing2TitlePreview, setLanding2TitlePreview] =
    useState<boolean>(false);
  const [landing2Desc, setLanding2Desc] = useState<string>("");
  const [landing2DescEdit, setLanding2DescEdit] = useState<boolean>(false);
  const [landing2DescPreviewContent, setLanding2DescPreviewContent] =
    useState<string>("");
  const [landing2DescPreview, setLanding2DescPreview] =
    useState<boolean>(false);
  const [landingSection4List, setLandingSection4List] =
    useState<Common.landingSection4Type[]>(null);
  // landing4 modal
  const [openSection4Modal, setOpenSection4Modal] = useState<boolean>(false);
  const [editSection4, setEditSection4] = useState<boolean>(false);
  // landing4 state
  const [selectedSection4, setSelectedSection4] =
    useState<Common.landingSection4Type>();

  // sponsor modal
  const [openSponsorModal, setOpenSponsorModal] = useState<boolean>(false);
  const [editSponsor, setEditSponsor] = useState<boolean>(false);
  // sponsor state
  const [sponsorList, setSponsorList] = useState<Common.sponsorType[]>([]);
  const [previewSponsorList, setPreviewSponsorList] = useState<
    Common.sponsorType[]
  >([]);
  const [selectedSponsor, setSelectedSponsor] = useState<Common.sponsorType>();
  const { isSponsorPreview, setIsSponsorPreview } = useAdminStore();
  const sponsorModalRef = useRef<HTMLDivElement>(null);

  // API
  const getLanding2Content = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(
        `${process.env.API_URL}/api/page/common/landing/2?nation=${pathname}`,
      );
      setLandingSection2Content(result.data.result[0]);
      setLanding2Title(result.data.result[0].title);
      setLanding2Desc(result.data.result[0].description);
    } catch (err) {
      alert(err);
    } finally {
      setLandingLoading(false);
    }
  };
  const getLanding4Content = async () => {
    setLandingLoading(true);
    try {
      const result = await axios.get(
        `${process.env.API_URL}/api/page/common/landing/4?nation=${pathname}`,
      );
      setLandingSection4List(result.data.result);
    } catch (err) {
      alert(err);
    } finally {
      setLandingLoading(false);
    }
  };

  const getSponsor = async () => {
    try {
      const result = await axios.get(
        `${process.env.API_URL}/api/page/common/sponsor?nation=${pathname}`,
      );
      setSponsorList(result.data.result);
    } catch (err) {
      alert(err);
    }
  };

  //
  const applyLanding2Content = async () => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm("Are you sure?")) {
      const result = await axios.post(
        `${process.env.API_URL}/api/page/common/landing/2`,
        { nation: pathname, title: landing2Title, description: landing2Desc },
      );
      setLanding2Title(landing2Title);
      setLanding2Desc(landing2Desc);
      navigate(0);
    }
  };
  // landing4 modal handler
  const handleAddSection4 = () => {
    setSelectedSection4(null);
    setEditSection4(false);
    setOpenSection4Modal(true);
  };
  const handleEditSection4 = (section: Common.landingSection4Type) => {
    setSelectedSection4(section);
    setEditSection4(true);
    setOpenSection4Modal(true);
  };
  // sponsor handler
  const addSponsorHandler = () => {
    setSelectedSponsor(null);
    setEditSponsor(false);
    setOpenSponsorModal(true);
  };
  const editSponsorHandler = (sponsor: Common.sponsorType) => {
    setSelectedSponsor(sponsor);
    setEditSponsor(true);
    setOpenSponsorModal(true);
  };
  const handleReturnSponsor = () => {
    setIsSponsorPreview(false);
    setOpenSponsorModal(true);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.API_URL}/api/page/common/speakers/keynote?nation=${pathname}`,
      )
      .then((res) => {
        setKeynoteSpeakers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getLanding2Content();
    getLanding4Content();
    getSponsor();
  }, []);

  if (landingLoading) {
    return (
      <LandingContainer>
        <Loading />
      </LandingContainer>
    );
  }

  return (
    <LandingContainer>
      <LandingSection
        fullWidth
        maxWidth="1920px"
        background={landingSection1BackgroundURL}
        className="section1"
      >
        <div className="overlay secondary z0" />
        <Stack
          className="layout"
          direction="column"
          alignItems="center"
          spacing={5}
          sx={{ padding: { laptop: "135px 50px !important" } }}
        >
          <img
            className="z1"
            src={landingSection1LogoURL}
            alt="logo"
            style={{
              maxWidth: "600px",
              width: "100%",
              minWidth: "200px",
              marginBottom: "50px",
            }}
          />
          <Stack
            sx={{
              flexDirection: {
                mobile: "column",
                laptop: "row",
              },
              backgroundColor: theme.palette.common.white,
              padding: "0 10px",
            }}
            style={{ marginTop: 0 }}
            alignItems="center"
          >
            {eventLocation !== undefined && (
              <>
                <Typography fontSize={headingFontSize} fontWeight={700}>
                  {eventLocation}
                </Typography>
                <Typography
                  sx={{
                    display: { mobile: "none", laptop: "inline-block" },
                    margin: "0 8px",
                  }}
                  fontWeight={700}
                  fontSize={subHeadingFontSize}
                >
                  |
                </Typography>
              </>
            )}
            <Typography fontSize={headingFontSize} fontWeight={700}>
              {fullDate}
            </Typography>
          </Stack>
          {registration && (
            <NSSButton
              className="z1"
              variant="gradient"
              style={{ padding: "5px 20px" }}
              fontSize={mainFontSize}
              fontWeight={theme.typography.fontWeightBold}
              letterSpacing="1.2px"
              onClick={() => {
                navigate(`/registration`);
              }}
            >
              {registration}
            </NSSButton>
          )}
          <Typography
            className="z1"
            textAlign="center"
            color={theme.palette.common.white}
            fontWeight={theme.typography.fontWeightMedium}
            fontSize={headingFontSize}
          >
            {landingSection1Desc && <InnerHTML html={landingSection1Desc} />}
          </Typography>
        </Stack>
      </LandingSection>
      {showLandingSection2 && landingSection2Content && (
        <LandingSection fullWidth>
          <Stack
            className="layout"
            flexDirection={{
              mobile: "column-reverse",
              tablet: "row",
            }}
            maxWidth="1920px"
            alignItems="center"
            justifyContent="space-between"
            spacing={{ mobile: 5, tablet: 0 }}
          >
            <Stack
              flexDirection="column"
              width="100%"
              height="100%"
              sx={{
                mr: {
                  mobile: 0,
                  tablet: 5,
                },
              }}
            >
              <LandingTextEditor
                initialValue={landingSection2Content.title}
                value={landing2Title}
                setValue={setLanding2Title}
                edit={landing2TitleEdit}
                setEdit={setLanding2TitleEdit}
                preview={landing2TitlePreview}
                setPreview={setLanding2TitlePreview}
                previewContent={landing2TitlePreviewContent}
                setPreviewContent={setLanding2TitlePreviewContent}
                applyHandler={applyLanding2Content}
                sx={{
                  mb: 3,
                  fontSize: headingFontSize,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {landingSection2Content.title || ""}
              </LandingTextEditor>
              <LandingTextEditor
                initialValue={landingSection2Content.description}
                value={landing2Desc}
                setValue={setLanding2Desc}
                edit={landing2DescEdit}
                setEdit={setLanding2DescEdit}
                preview={landing2DescPreview}
                setPreview={setLanding2DescPreview}
                previewContent={landing2DescPreviewContent}
                setPreviewContent={setLanding2DescPreviewContent}
                applyHandler={applyLanding2Content}
                sx={{
                  fontSize: smallFontSize,
                }}
              >
                {landingSection2Content.description || ""}
              </LandingTextEditor>
            </Stack>
          </Stack>
        </LandingSection>
      )}
      {showLandingSection3 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Box className="layout">
            {landingSection3Title && (
              <LandingTitle title={landingSection3Title} />
            )}
            {landingSection3Desc && (
              <Typography fontSize={mainFontSize}>
                <InnerHTML html={landingSection3Desc} />
              </Typography>
            )}
          </Box>
        </LandingSection>
      )}
      {showLandingSection4 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Stack className="layout" direction="column">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {landingSection4Title && (
                <LandingTitle title={landingSection4Title} />
              )}
              {isEditor && (
                <IconButton onClick={handleAddSection4}>
                  <AddCircleOutlineIcon color="primary" />
                </IconButton>
              )}
            </Stack>
            <Stack
              direction={{ mobile: "column", laptop: "row" }}
              flexWrap="wrap"
              justifyContent="space-between"
              sx={{
                color: theme.palette.common.white,
              }}
            >
              {landingSection4List?.map((item) => (
                <Box
                  component={isEditor ? "button" : "div"}
                  className="gradient-box"
                  sx={{
                    width: {
                      laptop:
                        landingSection4List.length > 3
                          ? "30%"
                          : `calc(90% / ${landingSection4List.length})`,
                      mobile: "100%",
                    },
                    textAlign: "inherit",
                    textIndent: "inherit",
                    p: 3,
                    mb: { mobile: 5, laptop: 0 },
                    li: {
                      ml: 2,
                    },
                  }}
                  key={`box-${item.id}`}
                  onClick={() => {
                    if (isEditor) {
                      setSelectedSection4(item);
                      setEditSection4(true);
                      setOpenSection4Modal(true);
                    }
                  }}
                >
                  {item.title && (
                    <Typography fontWeight={600} sx={{ mb: 2 }}>
                      {item.title}
                    </Typography>
                  )}
                  <Typography fontSize={smallFontSize}>
                    <InnerHTML html={item.description} />
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </LandingSection>
      )}
      {/* Form */}
      {openSection4Modal && (
        <LandingSection4Form
          open={openSection4Modal}
          setOpen={setOpenSection4Modal}
          edit={editSection4}
          selectedSection={selectedSection4}
        />
      )}
      {/* </BackgroundVectorColored> */}

      {/* <BackgroundVectorColoredReversed maxWidth="1920px"> */}
      {/* section5 */}
      {showLandingSection5 && (
        <LandingSection fullWidth maxWidth="1920px">
          <SpeakersContainer className="layout">
            <Stack direction="column">
              {landingSection5Title && (
                <LandingTitle title={landingSection5Title} />
              )}
              <Stack direction="row" flexWrap="wrap">
                {keynoteSpeakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </Stack>
            </Stack>
          </SpeakersContainer>
        </LandingSection>
      )}

      {/* section6 */}
      {showLandingSection6 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Stack className="layout">
            <LandingTitle
              title={
                landingSection6Title ||
                "The times of the NanoScientific Symposium past journey"
              }
            />
            {landingSection6ButtonText && landingSection6ButtonLink && (
              <Stack
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  margin: "-15px 0 20px 0",
                  flexDirection: {
                    laptop: "row",
                  },
                }}
              >
                <Box sx={{ width: { laptop: "50%" } }}>
                  <Typography
                    fontSize={mainFontSize}
                    fontWeight={theme.typography.fontWeightMedium}
                  >
                    {landingSection6Desc || ""}
                  </Typography>
                </Box>

                <Box
                  sx={{ m: "15px", width: { mobile: "70%", laptop: "30%" } }}
                >
                  <NSSButton
                    variant="gradient"
                    style={{ margin: "0 auto" }}
                    onClick={() => {
                      openLink(landingSection6ButtonLink);
                    }}
                    fontSize={smallFontSize}
                    fontWeight={theme.typography.fontWeightBold}
                  >
                    {landingSection6ButtonText}
                  </NSSButton>
                </Box>
              </Stack>
            )}
          </Stack>
        </LandingSection>
      )}

      {showLandingSection7 && (
        <LandingSection fullWidth maxWidth="1920px">
          <Stack className="layout">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <LandingTitle title={landingSection7Title || "Sponsored By"} />
              {isSponsorPreview && (
                <Button variant="outlined" onClick={handleReturnSponsor}>
                  Return to editor
                </Button>
              )}
            </Stack>
            <Stack
              flexWrap="wrap"
              alignItems="center"
              sx={{
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                },
              }}
            >
              {isSponsorPreview &&
                previewSponsorList.map((sponsor) => (
                  <Box>
                    <a
                      className="hover-zoom"
                      href={sponsor.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        pointerEvents: sponsor.url ? "inherit" : "none",
                        position: "relative",
                      }}
                    >
                      <img
                        src={`${S3_URL}/${sponsor.image_path}`}
                        alt={sponsor.name}
                        style={{
                          maxHeight: sponsor.height ? sponsor.height : "80px",
                          width: "100%",
                        }}
                      />
                    </a>
                    {isEditor && !isSponsorPreview && (
                      <IconButton
                        component="span"
                        className="sponsor-edit-btn"
                        size="small"
                        onClick={() => {
                          editSponsorHandler(sponsor);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              {!isSponsorPreview &&
                sponsorList.map((sponsor) => (
                  <Box>
                    <a
                      className="hover-zoom"
                      href={sponsor.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        pointerEvents: sponsor.url ? "inherit" : "none",
                        position: "relative",
                      }}
                    >
                      <img
                        src={`${S3_URL}/${sponsor.image_path}`}
                        alt={sponsor.name}
                        style={{
                          maxHeight: sponsor.height ? sponsor.height : "80px",
                          width: "100%",
                        }}
                      />
                    </a>
                    {isEditor && !isSponsorPreview && (
                      <IconButton
                        component="span"
                        className="sponsor-edit-btn"
                        size="small"
                        onClick={() => {
                          editSponsorHandler(sponsor);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              {isEditor && !isSponsorPreview && (
                <Stack
                  sx={{
                    width: "110px",
                    height: "80px",
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton onClick={addSponsorHandler}>
                    <AddCircleOutlineIcon color="primary" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Stack>
        </LandingSection>
      )}
      {(openSponsorModal || isSponsorPreview) && (
        <SponsorForm
          open={openSponsorModal}
          setOpen={setOpenSponsorModal}
          edit={editSponsor}
          selectedSponsor={selectedSponsor as Common.sponsorType}
          className={isSponsorPreview ? "hide" : ""}
          sponsorList={sponsorList}
          setPreviewSponsorList={setPreviewSponsorList}
        />
      )}
      {/* <CookieConsent
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#EDF4FC",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          flex: "none",
          color: theme.palette.common.black,
        }}
        buttonText="ACCEPT"
        buttonClasses="hover-zoom"
        buttonStyle={{
          color: theme.palette.common.white,
          fontWeight: "500",
          background: theme.palette.primary.gradation,
          border: `2px solid ${theme.palette.common.white}`,
          borderRadius: "15px",
          padding: "2px 15px",
        }}
      >
        {cookieConsentText && <InnerHTML html={cookieConsentText} />}
        <a href="/" target="_blank" style={{ padding: 0, width: "20%" }}>
          {seePrivacyPolicyText || ""}
        </a>
      </CookieConsent> */}

      {/* <LiveChatWidget license="13874505" group="0" /> */}
    </LandingContainer>
  );
};

export default Landing;
