"use client";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import TranslateIcon from "@/icons/translate";
import { Modal } from "antd";


type SwitchLanguageHandler=(lang: string) => () => void
// The following cookie name is important because it's Google-predefined for the translation engine purpose
export const COOKIE_NAME = "googtrans";

// We should know a predefined nickname of a language and provide its title (the name for displaying)
interface LanguageDescriptor {
  name: string;
  title: string;
}

interface LanguageOptionProps{
    ld: LanguageDescriptor,
    switchLanguage:SwitchLanguageHandler,
    currentLanguage?: string,
    languageConfig:any
}




// The following definition describes typings for JS-based declarations in public/assets/scripts/lang-config.js
declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

function LanguageOption(props:LanguageOptionProps){

    const {currentLanguage,switchLanguage,ld,languageConfig} = props;
    const isSelected = currentLanguage === ld.name || (currentLanguage === "auto" && languageConfig.defaultLanguage === ld)

    if(isSelected){
        return (
            <div className="w-full gap-2 bg-[#FCB800] text-center rounded-full p-2">
                <span key={`l_s_${ld}`} className="mx-3 text-black font-bold">
                    {ld.title}
                </span>
            </div>
        )
    }
    return (
        <div className="w-full gap-2 border rounded-full p-2">
            <a
                key={`l_s_${ld}`}
                onClick={switchLanguage(ld.name)}
                className="mx-3 text-blue-300 cursor-pointer hover:underline"
            >
            {ld.title}
            </a>
        </div>
    )
}

export default function LanguageSwitcher(){
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [open,setOpen] = useState(false);

  // When the component has initialized, we must activate the translation engine the following way.
  useEffect(() => {
    // 1. Read the cookie
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      // 2. If the cookie is defined, extract a language nickname from there.
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue, let's take a current language from the predefined defaultLanguage below.
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      // 4. Set the current language if we have a related decision.
      setCurrentLanguage(languageValue);
    }
    // 5. Set the language config.
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // Don't display anything if current language information is unavailable.
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  // The following function switches the current language
  const switchLanguage = (lang: string) => () => {
    // We just need to set the related cookie and reload the page
    // "/auto/" prefix is Google's definition as far as a cookie name
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload();
  };

  

  return (
    <>
    <Modal footer={null} open={open} onCancel={()=>setOpen(false)} centered title={null}>
        <div className="grid grid-cols-4 gap-2 mt-8">
             {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
                <LanguageOption
                    ld={ld}
                    languageConfig={languageConfig}
                    currentLanguage={currentLanguage}
                    switchLanguage={switchLanguage}
                />
             ))}
        </div>
    </Modal>
    <div className="fixed bottom-10 rounded-full z-[10000] bg-[#FCB800] right-10">
        <button onClick={()=>setOpen(true)} className="flex items-center justify-center h-20 w-20 gap-2 px-6 py-2">
            <TranslateIcon fillColor="#000000"/>
        </button>
    </div>
    </>
  );
};
