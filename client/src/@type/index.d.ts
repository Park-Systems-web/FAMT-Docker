declare namespace Program {
  interface programType {
    id: number;
    session: number;
    start_time: string;
    end_time: string;
    title: string;
    speakers: string;
    description: string;
    next_id: string;
    emphasize: number;
  }

  interface programAgendaType {
    id: number;
    session_id: number;
    program_id: number;
    title: string;
    speakers: string;
    next_id: number;
  }

  interface sessionType {
    id: number;
    session_title: string;
    date: string;
  }
}

declare namespace Speaker {
  interface speakerType {
    id: number;
    name: string;
    belong: string;
    description: string;
    image_path: string;
    status: number;
    keynote?: number;
    has_abstract?: number;
  }

  interface speakerDetailType {
    id: number;
    name: string;
    title: string;
    image_path: string;
    belong: string;
    description: string;
    rawDescription?: string;
  }

  interface japanSpeakerType {
    id: number;
    name_en: string;
    name_jp: string;
    belong: string;
    image_path: string;
    homework: string;
    show: number;
  }
}

declare namespace User {
  interface userType {
    id: number;
    email: string;
    title?: string;
    role: string;
    last_name: string;
    first_name: string;
    institute: string;
    phone: string;
    department?: string;
    state?: string;
    createdAt: string;
    country: string;
  }
}

declare namespace Common {
  type showStatus = "show" | "hide";

  interface menuType {
    id: number;
    name: string;
    path: string;
    is_published: 0 | 1;
  }

  interface nationType {
    name: string;
    date: string;
    path: string;
    img: string;
  }

  interface sponsorType {
    name: string;
    img: string;
    url?: string;
    height?: string;
  }

  interface landingSection2Type {
    id: number;
    title: string;
    description: string;
  }

  interface landingSection4Type {
    title?: string;
    content: string[];
  }

  interface globalDataType {
    fullName?: string;
    fullDate?: string;
    eventLocation?: string;
    logoURL?: string;
    speakers?: string;
    programs?: string;
    lectureHall?: string;
    exhibitHall?: string;
    sponsors?: string;
    greeting?: string;
    attend?: string;
    symposium?: string;
    archive?: string;
    home?: string;
    registration?: string;
    registrationBannerDesktopURL?: string;
    registrationBannerMobileURL?: string;
    speakerBannerURL?: string;
    programBannerURL?: string;
    // button text
    signInText?: string;
    goNextText?: string;
    goPrevText?: string;
    submitBtnText?: string;
    registerBtnText?: string;

    // user 관련
    emailInputLabel?: string;
    passwordInputLabel?: string;
    forgotPasswordText?: string;
    createAccountText?: string;
    adminBtnText?: string;
    signOutBtnText?: string;
    changePasswordBtnText?: string;

    // registration 관련
    registrationStep1Label?: string;
    registrationStep2Label?: string;
    registrationStep3Label?: string;

    // common
    nations?: nationType[];
    eventLandingMainBannerURL?: string;
    fullLogoURL?: string;
    eventLandingDesc?: string;
    eventLandingBodyBackground?: string;
    teaserVideoURL?: string;
    teaserVideoEmbed?: string;
    bannerLogoURL?: string;
    sponsor1LogoURL?: string;
    sponsor2LogoURL?: string;

    // landing
    showLandingSection1?: boolean;
    showLandingSection2?: boolean;
    showLandingSection3?: boolean;
    showLandingSection4?: boolean;
    showLandingSection5?: boolean;
    showLandingSection6?: boolean;
    showLandingSection7?: boolean;
    landingSection1BackgroundURL?: string;
    landingSection1LogoURL?: string;
    landingSection1Desc?: string;
    landingSection2Title?: string;
    landingSection2Desc?: string;
    landingSection2Video?: string;
    landingSection3Title?: string;
    landingSection3Desc?: string;
    landingSection4Title?: string;
    landingSection4List?: landingSection4Type[];
    landingSection5Title?: string;
    landingSection6Title?: string;
    landingSection6ButtonLink?: string;
    landingSection6Desc?: string;
    landingSection6ButtonText?: string;
    landingSection6Videos?: string[];
    landingSection7Title?: string;
    landingSection7Sponsors?: sponsorType[];

    // resetPassword
    resetPasswordHeading?: string;
    resetPasswordCurrentLabel?: string;
    resetPasswordNewLabel?: string;
    resetPasswordNewConfirmLabel?: string;
    setPasswordHeading?: string;

    // cookie consent text
    cookieConsentText?: string;
    seePrivacyPolicyText?: string;

    comingSoonText?: string;
  }
}

declare namespace Webinar {
  interface webinarType {
    uuid: string;
    id: number;
    host_id: string;
    created_at: string;
    duration: number;
    join_url: string;
    start_time: string;
    timezone: string;
    topic: string;
    type: number;
  }
}

declare namespace Admin {
  interface menuType {
    name: string;
    clickHandler: () => void;
    disabled?: boolean;
    adminOnly?: boolean;
  }
}
