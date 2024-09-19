"use client";
import { Select } from "antd";
interface Props{
  currentLanguage?:string,
  setCurrentLanguage:(value:string)=>void;
  languageConfig:any
}

export default function LanguageSwitcher(props:Props){
  const {languageConfig,currentLanguage} = props;
  return (
    <>
        <div className="auto-country-field">
            <p>Language</p>
            <Select
            value={currentLanguage}
            onSelect={(value)=>{
              props.setCurrentLanguage(value);
            }}
            filterOption={(input, option) =>((option?.label ?? '') as String).toLowerCase().includes(input.toLowerCase())}
            options={languageConfig.languages.map((language:any) => ({
                label: language.title,
                value: language.name,
            }))}
            style={{width:"100%"}}/>
        </div>
    </>
  );
};
