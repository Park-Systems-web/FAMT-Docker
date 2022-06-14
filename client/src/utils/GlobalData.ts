export const S3_URL = "https://d3gxipca0cw0l2.cloudfront.net";

export const globalData = new Map<string, Common.globalDataType>([
  [
    "home",
    {
      signInText: "SIGN IN",
    },
  ],
  [
    "common",
    {
      nations: [
        {
          name: "NSS Asia",
          date: "Sep 26, 2022",
          path: "asia",
          img: `${S3_URL}/asia/main-page-banner.jpg`,
        },
        {
          name: "NSS Americas",
          date: "Sep 29, 2022",
          path: "americas",
          img: `${S3_URL}/us/main-page-banner.jpg`,
        },
        {
          name: "NSF Europe",
          date: "Oct 06 - 07, 2022",
          path: "eu",
          img: `${S3_URL}/eu/main-page-banner.jpg`,
        },
        {
          name: "NSS China",
          date: "Oct 27 - 28, 2022",
          path: "https://nanoscientific.com.cn",
          img: `${S3_URL}/cn/main-page-banner.jpg`,
        },
        {
          name: "NSS Japan",
          date: "Nov 18, 2022",
          path: "jp",
          img: `${S3_URL}/jp/main-page-banner.jpg`,
        },
        {
          name: "NSS Korea",
          date: "Nov 24, 2022",
          path: "kr",
          img: `${S3_URL}/kr/main-page-banner.jpg`,
        },
      ],
      logoURL: `${S3_URL}/famt/common/famt-full-logo.jpg`,
      teaserVideoURL: `${S3_URL}/common/2022NSS_Teaser_v1.0_LQ.mp4`,
      teaserVideoEmbed: "a",
      bannerLogoURL: `${S3_URL}/common/NSS_logo_white_main.svg`,
      eventLandingMainBannerURL: `${S3_URL}/common/main-landing-banner.jpg`,
      eventLandingDesc: `
      The growing importance of nanotechnology in many fields, including surface science, organic chemistry, molecular biology, semiconductor physics, and micro-manufacturing. And those who strive to acquire the technology.
      <br/>
      NanoScientific Symposium brings together industry experts, researchers, business leaders, scholars, and futurist to share the latest nanotechnology trends and various nanotechnology-based research results.
      <br/>
      An opportunity to discuss and experience firsthand what innovative research results have been derived using the latest SPM (Scanning Probe Microscopy) technology.
      <br/>
      We invite you to the NanoScientific Symposium 2022.
      <br/>
      Expand your insight through the Nanoscientific Symposium.
      `,
      sponsor1LogoURL: `${S3_URL}/common/sponsored_by_NS.svg`,
      sponsor2LogoURL: `${S3_URL}/common/Park_logo.svg`,

      registrationBannerDesktopURL: `${S3_URL}/common/registration-banner-desktop.jpg`,
      registrationBannerMobileURL: `${S3_URL}/common/registration-banner-mobile.jpg`,
      speakerBannerURL: `${S3_URL}/common/speakers-banner.jpg`,
      programBannerURL: `${S3_URL}/common/program-banner.jpg`,
    },
  ],
  [
    "famt",
    {
      fullName: "FAMT 2022",
      fullDate: "22 July, 2022",
      logoURL: `${S3_URL}/famt/common/famt-nav-logo.jpg`,
      speakers: "Speakers",
      programs: "PROGRAM",
      lectureHall: "LECTURE HALL",
      exhibitHall: "EXHIBIT HALL",
      // sponsors: "SPONSORS",
      home: "HOME",
      registration: "REGISTRATION",
      // buttonText
      signInText: "SIGN IN",
      goNextText: "NEXT",
      goPrevText: "PREV",
      submitBtnText: "SUBMIT",
      // user관련
      emailInputLabel: "Email Address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot your password?",
      createAccountText: "Create an account",
      adminBtnText: "ADMIN",
      signOutBtnText: "SIGN OUT",
      changePasswordBtnText: "Change Password",
      // landing
      showLandingSection1: true,
      showLandingSection2: true,
      showLandingSection3: false,
      showLandingSection4: true,
      showLandingSection5: true,
      showLandingSection6: true,
      showLandingSection7: true,
      // landingSection1BackgroundURL: `${S3_URL}/eu/main-page-banner.jpg`,
      landingSection1BackgroundURL: `${S3_URL}/famt/common/main-banner.jpg`,
      // landingSection1LogoURL: `${S3_URL}/eu/logo-type-1b.svg`,
      landingSection1LogoURL: `${S3_URL}/famt/common/famt-full-logo.jpg`,
      landingSection1Desc: `Join the International SPM Symposium<br/>
      the platform for Failure Analysis and Material Testing
      `,
      landingSection2Title: `International SPM Symposium<br/>
      Failure Analysis & Material Testing`,
      landingSection2Desc: `
      NSFE is a part of <strong>Nanoscientific Symposium Series</strong> taking place each year around the globe.<br/><br/>
      The European edition, NSFE is an open European AFM User Forum focusing on sharing and exchanging the cutting-edge research for both materials and life science disciplines using Atomic Force Microscopy (AFM). 
      <br/><br/>
      The research focus of the <strong>5th NSFE 2022</strong> will be laid on wide range of SPM applications and techniques that empower to transform life standards. We will talk about emerging nanomaterials for advanced technologies, functional surfaces, and hybrid materials as well as innovative methods in nanotechnology and correlative microscopy. This edition is open to global audience and will be held online.
      <br/><br/>
      <span style="color:red">For conference details and registration, please visit: <a style="font-weight: 600; padding:0;color: red" href="https://www.nanoscientificforum.com/" target="_blank">www.nanoscientificforum.com</a></span>
      `,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: ``,
      landingSection4Title: "Sessions",
      landingSection4List: [
        {
          content: [
            "Emerging Nanomaterials for Advanced Technologies",
            "Functional Surfaces",
            "Advances Techniques and Automation in SPM",
            "Correlative Microscopy",
          ],
        },
      ],
      landingSection5Title: "Featured Speakers",
      landingSection6Title: "Past Editions",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore past editions",
      landingSection6ButtonLink:
        "https://www.youtube.com/playlist?list=PLH4cAUjlEqR0MIb3RLlVuCnxrzIdJnMck",
      // landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Supported By",

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
]);
