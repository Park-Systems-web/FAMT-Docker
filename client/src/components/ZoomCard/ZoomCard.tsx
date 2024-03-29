/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
// mui
import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
  Icon,
  TextField,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VideocamIcon from "@mui/icons-material/Videocam";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import LanguageIcon from "@mui/icons-material/Language";
// utils
import { dateToLocaleString, calculateDurationToString } from "utils/Date";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import CommonModal from "components/CommonModal/CommonModal";
import useInput from "hooks/useInput";
import { snakeToPrettyString } from "utils/String";
import CountrySelect from "components/Input/CountrySelect";
import { useNavigate } from "react-router";
import { editorRole } from "utils/Roles";
import CloseIcon from "@mui/icons-material/Close";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import { ZoomCardContainer } from "./ZoomCardStyles";
import { useAuthState } from "../../context/AuthContext";

interface ZoomCardProps {
  webinar: Webinar.webinarType;
  timezone: string;
  isOnAir: boolean;
  setSuccessAlert: React.Dispatch<boolean>;
  setFailedAlert: React.Dispatch<boolean>;
  // setCurrentZoomSignature: React.Dispatch<string>;
  // setCurrentZoomWebinar: React.Dispatch<string>;
}

interface QuestionType {
  value: string;
  required: boolean;
}

const ZoomCard = ({
  webinar,
  timezone,
  isOnAir,
  setSuccessAlert,
  setFailedAlert,
}: // setCurrentZoomSignature,
// setCurrentZoomWebinar,
ZoomCardProps) => {
  const authState = useAuthState();
  const pathname = usePageViews();
  const theme = useTheme();
  const navigate = useNavigate();
  const isEditor = editorRole.includes(authState.role);

  // input
  const email1 = useInput(authState.email);
  const email2 = useInput("");
  const firstName = useInput("");

  // modal state
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  // questions state
  const [questions, setQuestions] = useState<any>();
  // registrants
  const [registrantList, setRegistrantList] =
    useState<Webinar.registrantType[]>(null);
  // register 여부
  const [isWebinarRegistered, setIsWebinarRegistered] =
    useState<boolean>(false);
  // 유저 별 join link
  const [joinLink, setJoinLink] = useState<string>("");
  const [webJoinLink, setWebJoinLink] = useState<string>("");
  // loading
  const [getQuestionsLoading, setGetQuestionsLoading] =
    useState<boolean>(false);
  const [addRegistrantLoading, setAddRegistrantLoading] =
    useState<boolean>(false);
  const [getRegistrantLinkLoading, setGetRegistrantLinkLoading] =
    useState<boolean>(true);

  // zoom signature
  const [currentZoomSignature, setCurrentZoomSignature] = useState<string>("");

  // form validation
  const isEmail1Empty = email1.value === "";
  const isEmail2Empty = email2.value === "";
  const isFirstNameEmpty = firstName.value === "";
  const isEmailConfirmed = email1.value === email2.value;

  // 국가 구분 태그를 떼어내는 메서드
  const removeTagFromTopic = (topic: string) => {
    return topic.split("]")[1];
  };

  // 질문 받아오기 handler
  const getQuestionsHandler = () => {
    setGetQuestionsLoading(true);
    axios
      .get(
        `${process.env.API_URL}/api/zoom/webinar/registrant/questions/${webinar.id}`,
      )
      .then((res) => {
        const resultArray = [...res.data.result.questions];
        const toBeUpdated = {} as any;
        resultArray.forEach((e) => {
          toBeUpdated[e.field_name] = {
            value: "",
            required: e.required,
          };
        });
        setQuestions(toBeUpdated);

        setOpenRegisterModal(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetQuestionsLoading(false);
      });
  };

  // 웨비나 등록 handler
  const webinarRegisterHandler = () => {
    const questionsCpy = { ...questions };
    questionsCpy.email = { value: email1.value, required: true };
    questionsCpy.first_name = { value: firstName.value, required: true };
    setAddRegistrantLoading(true);
    axios
      .post(
        `${process.env.API_URL}/api/zoom/webinar/registrants/${webinar.id}`,
        {
          questions: questionsCpy,
          nation: pathname,
        },
      )
      .then(() => {
        setSuccessAlert(true);
        setOpenRegisterModal(false);
        navigate(0);
      })
      .catch(() => {
        setFailedAlert(true);
      })
      .finally(() => {
        setAddRegistrantLoading(false);
      });
  };

  // get registrant list handler
  const getRegistrantLink = async () => {
    setGetRegistrantLinkLoading(true);
    try {
      const res = await axios.get(
        `${process.env.API_URL}/api/zoom/webinar/registrants/${webinar.id}?email=${authState.email}&nation=${pathname}`,
      );
      setIsWebinarRegistered(!!res.data.result);
      if (res.data.result) {
        setJoinLink(res.data.result);
        setWebJoinLink(res.data.result.replace("/w/", "/wc/join/"));
      }
    } catch (error) {
      alert(error);
    } finally {
      setGetRegistrantLinkLoading(false);
    }
  };

  // 카드 삭제 handler
  const handleRemove = async () => {
    if (confirm("Are you sure?")) {
      try {
        await axios.delete(
          `${process.env.API_URL}/api/zoom/webinar/${webinar.id}?nation=${pathname}`,
        );
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 제출 가능 여부 check
  const checkSubmittable = () => {
    let result =
      !isEmail1Empty && !isEmail2Empty && isEmailConfirmed && !isFirstNameEmpty;

    const requiredArray = [] as QuestionType[];
    if (questions) {
      const questionKeys = Object.keys(questions);
      questionKeys.forEach((key) => {
        if (questions[key].required) {
          requiredArray.push(questions[key]);
        }
      });
    }

    requiredArray.forEach((q) => {
      result = result && q.value !== "";
    });

    return result;
  };
  // zoom signature
  const getSignature = async () => {
    const sigResult = await axios.post(
      `${process.env.API_URL}/api/zoom/signature`,
      {
        meetingNumber: webinar.id,
        role: 0,
      },
    );
    setCurrentZoomSignature(sigResult.data.signature);
  };

  useEffect(() => {
    getRegistrantLink();
  }, []);

  return (
    <ZoomCardContainer>
      {!getRegistrantLinkLoading && (
        <>
          <Card
            sx={{
              display: "flex",
              minHeight: "220px",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            raised
          >
            <CardHeader
              avatar={
                <VideocamIcon
                  sx={{
                    color: isOnAir
                      ? "#e60000"
                      : theme.palette.whitescale.alpha50,
                  }}
                  fontSize="medium"
                />
              }
              title={webinar.topic}
              subheader={`${dateToLocaleString(
                webinar.start_time,
                timezone,
              )} - ${calculateDurationToString(
                webinar.start_time,
                webinar.duration,
                timezone,
              )}`}
              titleTypographyProps={{
                color: theme.palette.primary.contrastText,
                // textOverflow: "ellipsis",
                // whiteSpace: "nowrap",
                // overflow: "hidden",
                fontSize: theme.typography.h6.fontSize,
              }}
              subheaderTypographyProps={{
                color: theme.palette.primary.contrastTextAlpha,
              }}
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: "100%",
              }}
            />

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  mobile: "column",
                  desktop: "row",
                },
              }}
              disableSpacing
            >
              {isWebinarRegistered ? (
                <>
                  <Button
                    onClick={() => {
                      window.open(webJoinLink, "_blank");
                    }}
                    variant="outlined"
                    sx={{ marginBottom: { mobile: "5px", desktop: "0" } }}
                    startIcon={<LanguageIcon />}
                  >
                    Join via Browser
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(joinLink, "_blank");
                    }}
                    variant="outlined"
                    endIcon={<MeetingRoomIcon />}
                  >
                    JOIN via Zoom App
                  </Button>
                </>
              ) : (
                <LoadingButton
                  onClick={getQuestionsHandler}
                  variant="outlined"
                  startIcon={<ContactPageRoundedIcon />}
                  loading={getQuestionsLoading}
                >
                  Register
                </LoadingButton>
              )}
              {isEditor && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "0px",
                    left: "100%",
                    transform: "translateX(-100%)",
                  }}
                  onClick={handleRemove}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </CardActions>
          </Card>
          <CommonModal
            open={openRegisterModal}
            setOpen={setOpenRegisterModal}
            title="Webinar Registration"
            submitText="Register"
            onSubmit={webinarRegisterHandler}
            submitDisabled={!checkSubmittable()}
            loading={addRegistrantLoading}
          >
            <Stack
              flexWrap="wrap"
              sx={{
                flexDirection: {
                  mobile: "column",
                  laptop: "row",
                },
                ".field-wrap": {
                  width: {
                    mobile: "100%",
                    laptop: "48%",
                  },
                  mr: {
                    mobile: 0,
                    laptop: 2,
                  },
                  mb: 1,
                },
              }}
            >
              <TextField
                className="field-wrap"
                label="Email"
                required
                variant="filled"
                error={isEmail1Empty}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                {...email1}
              />
              <TextField
                className="field-wrap"
                label="Email Confirmation"
                required
                error={isEmail2Empty || !isEmailConfirmed}
                variant="filled"
                size="small"
                {...email2}
              />
              <TextField
                className="field-wrap"
                label="First Name"
                required
                error={isFirstNameEmpty}
                variant="filled"
                size="small"
                {...firstName}
              />
              {openRegisterModal &&
                Object.entries(questions).map((question: [string, any]) => {
                  const questionTitle = question[0];
                  const questionValue = question[1];
                  if (questionTitle === "country") {
                    return (
                      <div className="field-wrap">
                        <CountrySelect
                          required={questionValue.required}
                          question={question}
                          questions={questions}
                          setQuestions={setQuestions}
                        />
                      </div>
                    );
                  }
                  return (
                    <TextField
                      className="field-wrap"
                      key={questionTitle}
                      label={snakeToPrettyString(questionTitle)}
                      required={questionValue.required}
                      error={
                        questionValue.required &&
                        questions[questionTitle].value === ""
                      }
                      variant="filled"
                      size="small"
                      value={questions[questionTitle].value}
                      sx={{ width: "50%" }}
                      onChange={(
                        event: FormEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) => {
                        const {
                          currentTarget: { value },
                        } = event;
                        const questionsInputCpy = { ...questions };
                        questionsInputCpy[questionTitle].value = value;
                        setQuestions(questionsInputCpy);
                      }}
                    />
                  );
                })}
            </Stack>
          </CommonModal>
        </>
      )}
      {getRegistrantLinkLoading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={15} />
        </Box>
      )}
    </ZoomCardContainer>
  );
};

export default ZoomCard;
