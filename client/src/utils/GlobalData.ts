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
      logoURL: `${S3_URL}/common/NSS_logo_Type3.svg`,
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
    "asia",
    {
      fullName: "2022 NanoScientific Symposium Asia",
      fullDate: "September 26, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/asia/menu-bar-logo.svg?v=0.03`,
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
      registerBtnText: "REGISTER",
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
      showLandingSection3: true,
      showLandingSection4: false,
      showLandingSection5: true,
      showLandingSection6: true,
      showLandingSection7: true,
      landingSection1BackgroundURL: `${S3_URL}/asia/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/asia/logo-type-1b.svg`,
      landingSection1Desc:
        "Join us for the 4th edition of the NanoScientific Symposium Asia 2022 to be held on September 22, 2022.",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `
      NanoScientific Symposium Asia (NSSA) is a platform where industry professionals, nanoscience researchers, and scientists join together to share knowledge and gain insights on the future direction and latest studies using Scanning Probe Microscopy.
      <br/><br/>
      NSSA 2022 will feature state-of-the-art presentations on materials, electrical and electronics, manufacturing, life sciences, and other nanotechnology applications.  NSSA 2022 will be a great opportunity to share research on the latest advanced metrology research and trends in nanotechnology with peers and attendees from both industry and academia.
      <br/><br/>
      This year's event will be live streamed across Asia and Oceania countries, such as but not limited to Singapore, Malaysia, Indonesia, Thailand, Vietnam, Philippines, Australia, India, Pakistan, Saudi Arabia, Bangladesh, Sri Lanka, and more.
      `,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `NSSA 2022, will be a 1-day event, showcasing scientific talks and open discussion for diverse research and industry applications. This hybrid event will bring together a leading group of experts and will be a great networking opportunity.`,
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Featured Speakers",
      // landingSection6Title: "Submit All Year long",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/playlist?list=PLH4cAUjlEqR0I1ahoDjwod-DTlhkmZ-zA",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Sponsored By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: `${S3_URL}/common/Park_logo.svg`,
          url: "https://parksystems.com",
        },
      ],

      // resetPassword
      resetPasswordHeading: "Change a Password",
      resetPasswordCurrentLabel: "Current Password",
      resetPasswordNewLabel: "New Password",
      resetPasswordNewConfirmLabel: "New Password Confirm",

      // registration

      // cookie
      cookieConsentText:
        "We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our sevice. By clicking on accept, you agree to our use of such technologies for marketing and analytics.",
      seePrivacyPolicyText: "See privacy policy",
    },
  ],
  [
    "kr",
    {
      fullName: "2022 NanoScientific Symposium Korea",
      fullDate: "November 24, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/kr/menu-bar-logo.svg?v=0.03`,
      speakers: "초청연사",
      symposium: "심포지엄 안내",
      programs: "프로그램",
      lectureHall: "온라인 강연장",
      exhibitHall: "전시부스 ",
      // sponsors: "협찬사",
      home: "홈",

      // sign in 관련
      signInText: "로그인",
      registration: "등록",
      goNextText: "다음",
      goPrevText: "이전",
      // user관련
      emailInputLabel: "이메일 주소",
      passwordInputLabel: "비밀번호",
      forgotPasswordText: "비밀번호 찾기",
      createAccountText: "계정 등록",
      // landing
      showLandingSection1: true,
      showLandingSection2: true,
      showLandingSection3: false,
      showLandingSection4: false,
      showLandingSection5: true,
      showLandingSection6: true,
      showLandingSection7: true,
      landingSection1BackgroundURL: `${S3_URL}/kr/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/kr/logo-type-1b.svg`,
      landingSection1Desc: `
        NanoScientific Symposium Korea 등록하기
        <br/><br/>
        국내 원자현미경 전문 심포지엄 NanoScientific Symposium Korea 등록을 위해 '등록(registration)' 을 클릭해주세요.
        `,
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `국내 원자현미경 전문 심포지엄 나노사이언티픽 코리아 2022에 여러분을 초대합니다!
      <br/> <br/>
      나노사이언티픽 코리아는 국내 나노기술 및 원자현미경 관련 전문가들이 모여 다양한 응용기술의 최신 동향을 확인하고 새로운 연구결과들을 공유하는 심포지엄으로, 원자현미경 분야의 육성을 위한 연구자들 간의 소통의 장이 되고 있습니다. 
      최근 인공지능, 자율주행 등 4차 산업혁명이 가속화됨에 따라 핵심 기술인 나노기술의 중요성이 높아지고 있으며, 나노기술을 열어가는 중요한 도구인 원자현미경에 대한 관심도 더욱 증가하고 있습니다. 
      <br/><br/>
      나노사이언티픽 코리아에서는 국내 저명한 연사들을 초청하여 혁신적인 나노과학기술과 이와 연관된 연구결과들을 소개하고 다양한 원자현미경 어플리케이션 정보를 제공합니다.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `나노사이언티픽 코리아 2022는 나노기술을 비롯하여 원자현미경과 관련한 모든 분야를 아우르는 국내 원자현미경 전문 심포지엄입니다. 다양한 분야에서 이루어지고 있는 최신 연구를 살피고 나노과학기술에 대해 깊이 있게 교류할 수 있는 커뮤니티로 여러분을 초대합니다.`,
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Featured Speakers",
      // landingSection6Title: "Submit All Year long",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/playlist?list=PLH4cAUjlEqR3cx9W7SmvkxoR0lAAHMqrb",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Sponsored By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: `${S3_URL}/common/Park_logo.svg`,
          url: "https://parksystems.com",
        },
      ],
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
  [
    "jp",
    {
      fullName: "2022 NanoScientific Symposium Japan",
      fullDate: "2022年11月18日金曜日",
      logoURL: `${S3_URL}/jp/menu-bar-logo.svg?v=0.03`,
      speakers: "講演者",
      programs: "プログラム",
      lectureHall: "Web講演会",
      exhibitHall: "展示会",
      // sponsors: "スポンサー",
      home: "ホーム",
      greeting: "ごあいさつ",
      attend: "参加手順",
      archive: "アーカイブ",

      signInText: "ログイン",
      registration: "登録",
      goNextText: "NEXT",
      goPrevText: "PREV",
      // user관련
      emailInputLabel: "Email address",
      passwordInputLabel: "Password",
      forgotPasswordText: "Forgot Password?",
      createAccountText: "登録",
      // landing
      showLandingSection1: true,
      showLandingSection2: true,
      showLandingSection3: false,
      showLandingSection4: false,
      showLandingSection5: true,
      showLandingSection6: false,
      showLandingSection7: true,
      landingSection1BackgroundURL: `${S3_URL}/jp/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/jp/logo-type-1b.svg`,
      landingSection1Desc: `
        参加登録はこちらから
        <br/>
        ナノテクノロジーとSPMに特化したナノ科学シンポジウム 2022 参加登録受付中！
        `,
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `科学技術の革新によりナノ科学では材料、表面を計測・解析する方法も各種発展しています。特に、走査型プローブ顕微鏡（SPM）の登場により、 ナノレベルでの表面計測・解析の基礎技術としての重要性が日々増しています。
      ナノ科学シンポジウムは、走査型プローブ顕微鏡を用いた 材料科学、半導体およびライフサイエンス分野の最先端の研究情報を共有・交換するSPMユーザーシンポジウムです。
      NSSJ 2022では、科学に変革をもたらすSPMの幅広い応用と技術に焦点を当て、先端技術のための新しいナノ材料、機能性表面、さらにナノテクノロジーやSPMを使った応用技術についてもお話します。`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Event Orgaziner Greeting",
      landingSection3Desc: ``,
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Featured Speakers",
      // landingSection6Title: "Submit All Year long",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/watch?v=8K__qXUK6pQ&list=PLH4cAUjlEqR22kq2fJ7v1raLfZHx6HVQn",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Sponsored By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: `${S3_URL}/common/Park_logo.svg`,
          url: "https://parksystems.com",
        },
      ],
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
  [
    "americas",
    {
      fullName: "2022 NanoScientific Symposium Americas",
      fullDate: "September 29, 2022",
      // eventLocation: "TBD",
      logoURL: `${S3_URL}/us/menu-bar-logo.svg?v=0.03`,
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
      showLandingSection3: true,
      showLandingSection4: false,
      showLandingSection5: true,
      showLandingSection6: true,
      showLandingSection7: true,
      landingSection1BackgroundURL: `${S3_URL}/us/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/us/logo-type-1b.svg`,
      landingSection1Desc:
        "Join the 2022 NanoScientific Symposium Americas - Connecting the Nanomaterials Community.",
      landingSection2Title: "NanoScientific Symposium",
      landingSection2Desc: `The NanoScientific Symposium Americas 2022 - Connecting the Nanomaterials Community, will be a 1-day virtual event that features experts in the nanomaterials community.
      NanoScientific Symposium focuses on sharing, exchanging, and exploring new advances in nanomaterials applications. This event also emphasizes the growing importance of nanotechnology in many fields, including surface science, organic chemistry, molecular biology, semiconductor physics, and micro-manufacturing.
      <br /><br />Expand your insight through the NanoScientific Symposium.`,
      landingSection2Video: "5aqzJQgN9X0",
      landingSection3Title: "Why Attend NanoScientific Symposium?",
      landingSection3Desc: `NanoScientific Symposium presents insights on the rapidly evolving R&D and innovations in nanotechnology. This conference provides a wonderful opportunity for you to enhance your knowledge of the newest interdisciplinary approaches in Nanomaterials, Chemical R&D, and 2D materials. 
      <br /><br />A great place to learn about nanoscientific studies and build connection with experts.`,
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Featured Speakers",
      // landingSection6Title: "Submit All Year long",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/watch?v=BR-FOCgEyu8&list=PLH4cAUjlEqR3YXP4T_XufZ_IZVbe8cIBs",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Sponsored By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: `${S3_URL}/common/Park_logo.svg`,
          url: "https://parksystems.com",
        },
      ],
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
  [
    "famt",
    {
      fullName: "FAMT 2022",
      fullDate: "22 July, 2022",
      logoURL: `${S3_URL}/eu/menu-bar-logo.svg?v=0.03`,
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
      showLandingSection4: false,
      showLandingSection5: true,
      showLandingSection6: true,
      showLandingSection7: true,
      landingSection1BackgroundURL: `${S3_URL}/eu/main-page-banner.jpg`,
      landingSection1LogoURL: `${S3_URL}/eu/logo-type-1b.svg`,
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
      landingSection4Title: "Conference Details",
      landingSection4List1Title: "Topic",
      landingSection4List1: [
        "Emerging Nanomaterials for Advanced Technologies",
        "Functional Surfaces",
        "Advances Techniques and Automation in SPM",
        "Correlative Microscopy",
      ],
      landingSection4List2Title: "SPM Methods",
      landingSection4List2: [
        "Nanomechanical and Electrical Characterization",
        "Characterization of soft materials in liquid environment",
        "Advanced Imaging",
        "High resolution imaging",
        "Automation in AFM",
        "Correlative Microscopy",
      ],
      landingSection4List3Title: "Scientific Committee",
      landingSection4List3: [
        "Prof. Dr. Lucas Eng.<br/> Technical University Dresden",
        "Dr. Baan Baizer<br/> University Freiburg",
        "Dr. Tobias Cramer<br/> University of Bologna",
        "Dr. Ilka Hermes<br/> Leibniz Institute of Polymer Research Dresden",
        "Dr.-Ing. Lisa Ditscherlein<br/> TU Bergakademie Freiberg",
        "Prof. Brian Rodriguez<br/>Universty College Dublin",
      ],
      landingSection5Title: "Featured Speakers",
      landingSection6Title: "Watch previous editions",
      // landingSection6Desc:
      //   "Learn and be inspired at any time with more then 200 sessions on demand",
      landingSection6ButtonText: "Explore all on-demand sessions",
      landingSection6ButtonLink:
        "https://www.youtube.com/playlist?list=PLH4cAUjlEqR1e5d8pUozjWfp0bkUZjLdj",
      landingSection6Videos: ["8K__qXUK6pQ", "LxzYo74X044"],
      landingSection7Title: "Supported By",
      landingSection7Sponsors: [
        {
          name: "Park Systems",
          img: `${S3_URL}/common/Park_logo.svg`,
          url: "https://parksystems.com",
        },
        {
          name: "Imaging & Microscopy",
          img: `${S3_URL}/eu/sponsors/imaging_microscopy_logo.png`,
          url: "https://analyticalscience.wiley.com/do/10.1002/was.0004000235",
        },
        {
          name: "NuNano",
          img: `${S3_URL}/eu/sponsors/nunano_logo.png`,
          url: "https://www.nunano.com/",
        },
        {
          name: "NANOscientific",
          img: `${S3_URL}/eu/sponsors/nanoscientific_logo.png`,
          url: "https://nanoscientific.org/",
          height: "40px",
        },
      ],
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
