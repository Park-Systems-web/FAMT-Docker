import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { globalData } from "utils/GlobalData";
import useSeoTitle from "hooks/useSeoTitle";
import axios from "axios";
import usePageViews from "hooks/usePageViews";
import { useAuthState, useAuthDispatch } from "context/AuthContext";
import TopCenterSnackBar from "components/TopCenterSnackBar/TopCenterSnackBar";
import { RegistrationContainer } from "pages/common/Registration/RegistrationStyles";

type TFN = 1 | 0 | -1;

const EuropeRegistration = () => {
  const [checkout, setCheckout] = useState<boolean>(false);
  const [mktoLoading, setMktoLoading] = useState<boolean>(false);
  const [registerFee, setRegisterFee] = useState<string>("20");
  const [emailValid, setEmailValid] = useState<TFN>(-1);
  const navigate = useNavigate();
  const nation = usePageViews();

  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  // alert
  const [emailNotValidAlert, setEmailNotValidAlert] = useState<boolean>(false);

  const dispatchLogin = (e: string, r: string, t: string) =>
    dispatch({
      type: "LOGIN",
      authState: {
        ...authState,
        isLogin: true,
        role: r,
        email: e,
        accessToken: t,
      },
    });

  // seo
  const { registration } = globalData.get(nation) as Common.globalDataType;
  useSeoTitle(registration as string);

  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    setMktoLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      1149,
      (form: any) => {
        document.querySelector(".mktoButton[type='submit']")?.remove();

        setMktoLoading(false);

        // validation 끼워넣기
        const validationDiv = document.createElement("div");
        validationDiv.className = "validation-msg";
        document
          .querySelector("#LblEmail")
          ?.parentElement?.appendChild(validationDiv);

        // 체크박스 layout 변경
        const check1 = document.querySelector("#LblpsmktOptin")?.parentElement;
        const check2 = document.querySelector("#LblpsOptin")?.parentElement;
        check1?.classList.add("flex-reverse");
        check2?.classList.add("flex-reverse");

        // validation & 중복체크
        document
          .querySelector("input#Email")
          ?.addEventListener("focusout", async (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (
              target.value.indexOf("@") === -1 &&
              target.value.indexOf(".") === -1
            ) {
              setEmailValid(0);
            } else {
              try {
                const res = await axios.post(
                  `${process.env.API_URL}/api/users/checkemail`,
                  {
                    email: target.value,
                    nation,
                  },
                );
                setEmailValid(!res.data.result ? 1 : 0);
              } catch (err) {
                console.log(err);
              }
            }
          });
      },
    );
  }, []);

  useEffect(() => {
    if (document.querySelector(".validation-msg") !== null) {
      const validationDOM = document.querySelector(
        ".validation-msg",
      ) as HTMLParagraphElement;
      if (emailValid === 1) {
        validationDOM.classList.add("valid");
        validationDOM.classList.remove("invalid");
        validationDOM.innerText = "Valid Email!";
      } else if (emailValid === 0) {
        validationDOM.classList.add("invalid");
        validationDOM.classList.remove("valid");
        validationDOM.innerText = "Invalid or duplicate email.";
      }
    }
  }, [emailValid]);

  return (
    <RegistrationContainer>
      <form id="mktoForm_1149" />
      {!mktoLoading && !checkout && (
        <Button
          variant="contained"
          className="mktoButton2"
          onClick={() => {
            if (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              !window.MktoForms2.allForms()[0]?.validate()
            ) {
              // 마케토 validator가 알려줌
            } else if (emailValid !== 1) {
              setEmailNotValidAlert(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              setCheckout(true);
            }
          }}
        >
          CHECKOUT
        </Button>
      )}
      {checkout && (
        <div className="paypal-container">
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ab7DDztb5dlZOIvcQER01Iw0RsBanvxQBRNiiL6ORL56nYEZhF0CuSyTNNOj5ZwyTszzAD1ht4P4lGbA",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ color: "blue" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: registerFee,
                      },
                    },
                  ],
                });
              }}
              onError={() => {
                alert("Paypal Module Error. Please try again later.");
              }}
              onApprove={async (data, actions) => {
                const result = actions?.order
                  ?.capture()
                  .then(async (details) => {
                    // snackBar?

                    const formData =
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      window.MktoForms2.allForms()[0].getValues();
                    try {
                      // user db submit
                      const regResponse = await axios.post(
                        `${process.env.API_URL}/api/users/register`,
                        {
                          title: formData.Salutation,
                          firstName: formData.FirstName,
                          lastName: formData.LastName,
                          email: formData.Email,
                          phone: formData.Phone,
                          institute: formData.Company,
                          department: formData.Department,
                          country: formData.Country,
                          state: formData.State,
                          nation,
                        },
                      );

                      // save transaction to db
                      await axios.post(
                        `${process.env.API_URL}/api/page/eu/transaction`,
                        {
                          details,
                          userId: regResponse.data.id,
                        },
                      );

                      // marketo submit
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      window.MktoForms2.allForms()[0]
                        .submit()
                        .onSuccess(() => {
                          console.log("mkto success");
                          return false;
                        });
                      try {
                        const res = await axios.post(
                          `${process.env.API_URL}/api/users/login`,
                          {
                            nation,
                            email: formData.Email,
                            password: null,
                          },
                        );
                        if (res.data.success) {
                          dispatchLogin(
                            formData.Email,
                            res.data.role,
                            res.data.accessToken,
                          );
                        }
                        navigate(`/${nation}/user/reset-password`);
                      } catch (err) {
                        console.log(err);
                        alert("login failed");
                      }
                    } catch (err) {
                      console.log(err);
                      alert("error: saving user data. Please try again.");
                    }
                    // });
                  });
                return result;
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
      <TopCenterSnackBar
        value={emailNotValidAlert}
        setValue={setEmailNotValidAlert}
        severity="warning"
        content="Email already exists or not valid."
        variant="filled"
      />
    </RegistrationContainer>
  );
};

export default EuropeRegistration;
